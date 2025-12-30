#!/usr/bin/env python3
"""
迁移脚本：将博客中的图片和视频从旧存储迁移到新的S3兼容服务
- 旧MinIO: https://minio.menghuan1918.com:443/markdown
- 旧Alist: https://blog.menghuan1918.com/AlistStore/
- 新S3: https://rustfs.menghuan1918.com/markdown
"""

import re
import subprocess
import tempfile
import hashlib
from pathlib import Path
from urllib.parse import unquote, urlparse
from typing import NamedTuple

class UrlMapping(NamedTuple):
    """URL映射记录"""
    old_url: str
    new_url: str
    file_path: str  # md文件路径
    download_url: str  # 实际下载用的URL
    s3_key: str  # S3中的key


# 配置
OLD_MINIO_BASE = "https://minio.menghuan1918.com:443/markdown"
OLD_ALIST_BASE = "https://blog.menghuan1918.com/AlistStore"
NEW_S3_BASE = "https://rustfs.menghuan1918.com/markdown"
MC_ALIAS = "rustfs"
MC_BUCKET = "markdown"
MCLI = "mcli"

# 扫描目录
SCAN_DIRS = ["src/posts", "src/en/posts"]

# 正则表达式
MINIO_PATTERN = re.compile(
    r'https://minio\.menghuan1918\.com:443/markdown/[^\s\)"\'<>]+'
)
ALIST_PATTERN = re.compile(
    r'https://blog\.menghuan1918\.com/AlistStore/[^\s\)"\'<>]+'
)


def get_project_root() -> Path:
    """获取项目根目录"""
    return Path(__file__).parent


def extract_urls_from_file(file_path: Path) -> list[tuple[str, str]]:
    """从markdown文件中提取需要迁移的URL

    Returns:
        list of (url, url_type) where url_type is 'minio' or 'alist'
    """
    urls = []
    content = file_path.read_text(encoding="utf-8")

    # 查找MinIO URLs
    for match in MINIO_PATTERN.finditer(content):
        urls.append((match.group(0), "minio"))

    # 查找Alist URLs
    for match in ALIST_PATTERN.finditer(content):
        urls.append((match.group(0), "alist"))

    return urls


def normalize_alist_url(url: str) -> tuple[str, str]:
    """规范化Alist URL，返回 (下载URL, 新的S3路径)

    Alist URL有多种格式：
    1. https://blog.menghuan1918.com/AlistStore/xxx
    2. https://blog.menghuan1918.com/AlistStore/d/opt/alist/data/store/opt/alist/data/store/xxx?sign=...
    """
    parsed = urlparse(url)
    path = unquote(parsed.path)

    # 去掉签名参数用于生成新路径
    clean_path = path

    # 处理带/d/的路径 - 这是Alist的下载路径格式
    if "/AlistStore/d/" in path:
        # 提取实际文件路径：/opt/alist/data/store/opt/alist/data/store/xxx -> xxx
        # 路径格式: /AlistStore/d/opt/alist/data/store/opt/alist/data/store/实际路径
        match = re.search(r'/AlistStore/d/opt/alist/data/store/opt/alist/data/store/(.+)$', path)
        if match:
            actual_path = match.group(1)
            clean_path = f"/AlistStore/{actual_path}"

    # 生成S3 key：去掉 /AlistStore 前缀，放到 alist 子目录
    s3_path = clean_path.replace("/AlistStore/", "alist/")

    # 下载URL：对于带签名的保留签名，否则使用原URL
    download_url = url

    return download_url, s3_path


def normalize_minio_url(url: str) -> tuple[str, str]:
    """规范化MinIO URL，返回 (下载URL, 新的S3路径)"""
    parsed = urlparse(url)
    path = unquote(parsed.path)

    # 移除 /markdown 前缀
    s3_path = path.replace("/markdown/", "", 1)

    return url, s3_path


def generate_new_url(s3_path: str) -> str:
    """生成新的URL"""
    return f"{NEW_S3_BASE}/{s3_path}"


def download_file(url: str, dest_path: Path) -> bool:
    """下载文件"""
    print(f"  下载: {url[:80]}...")
    try:
        result = subprocess.run(
            ["curl", "-fsSL", "-o", str(dest_path), url],
            capture_output=True,
            text=True,
            timeout=120
        )
        if result.returncode != 0:
            print(f"  ❌ 下载失败: {result.stderr}")
            return False
        return True
    except subprocess.TimeoutExpired:
        print("  ❌ 下载超时")
        return False
    except Exception as e:
        print(f"  ❌ 下载异常: {e}")
        return False


def upload_to_s3(local_path: Path, s3_key: str) -> bool:
    """使用mc上传到S3"""
    dest = f"{MC_ALIAS}/{MC_BUCKET}/{s3_key}"
    print(f"  上传: {dest}")
    try:
        result = subprocess.run(
            [MCLI, "cp", str(local_path), dest],
            capture_output=True,
            text=True,
            timeout=120
        )
        if result.returncode != 0:
            print(f"  ❌ 上传失败: {result.stderr}")
            return False
        return True
    except subprocess.TimeoutExpired:
        print("  ❌ 上传超时")
        return False
    except Exception as e:
        print(f"  ❌ 上传异常: {e}")
        return False


def update_markdown_file(file_path: Path, old_url: str, new_url: str) -> bool:
    """更新markdown文件中的URL"""
    try:
        content = file_path.read_text(encoding="utf-8")
        # 使用 re.escape 确保URL中的特殊字符被正确转义
        new_content = content.replace(old_url, new_url)
        if content != new_content:
            file_path.write_text(new_content, encoding="utf-8")
            return True
        return False
    except Exception as e:
        print(f"  ❌ 更新文件失败: {e}")
        return False


def collect_all_urls() -> dict[str, list[UrlMapping]]:
    """收集所有需要迁移的URL

    Returns:
        dict: {download_url: [UrlMapping, ...]} 用于去重
    """
    root = get_project_root()
    url_mappings: dict[str, list[UrlMapping]] = {}

    for scan_dir in SCAN_DIRS:
        dir_path = root / scan_dir
        if not dir_path.exists():
            print(f"⚠️  目录不存在: {scan_dir}")
            continue

        for md_file in dir_path.glob("*.md"):
            urls = extract_urls_from_file(md_file)
            for url, url_type in urls:
                if url_type == "minio":
                    download_url, s3_key = normalize_minio_url(url)
                else:
                    download_url, s3_key = normalize_alist_url(url)

                new_url = generate_new_url(s3_key)
                mapping = UrlMapping(
                    old_url=url,
                    new_url=new_url,
                    file_path=str(md_file),
                    download_url=download_url,
                    s3_key=s3_key
                )

                # 使用下载URL作为key进行去重（同一文件可能在多篇文章中引用）
                if download_url not in url_mappings:
                    url_mappings[download_url] = []
                url_mappings[download_url].append(mapping)

    return url_mappings


def main():
    print("=" * 60)
    print("博客资源迁移脚本")
    print(f"从: {OLD_MINIO_BASE}")
    print(f"    {OLD_ALIST_BASE}")
    print(f"到: {NEW_S3_BASE}")
    print("=" * 60)

    # 收集所有URL
    print("\n📋 正在扫描markdown文件...")
    url_mappings = collect_all_urls()

    if not url_mappings:
        print("✅ 没有找到需要迁移的资源")
        return

    # 统计
    total_files = len(url_mappings)
    total_refs = sum(len(mappings) for mappings in url_mappings.values())
    print(f"\n📊 找到 {total_files} 个唯一资源文件，共 {total_refs} 个引用")

    # 显示预览
    print("\n📝 预览 (前10个):")
    for i, (download_url, mappings) in enumerate(url_mappings.items()):
        if i >= 10:
            print(f"   ... 还有 {len(url_mappings) - 10} 个文件")
            break
        m = mappings[0]
        print(f"   {m.s3_key}")
        print(f"      引用: {len(mappings)} 处")

    # 确认
    print("\n" + "=" * 60)
    confirm = input("是否开始迁移？[y/N]: ").strip().lower()
    if confirm != 'y':
        print("已取消")
        return

    # 开始迁移
    success_count = 0
    fail_count = 0

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)

        for download_url, mappings in url_mappings.items():
            m = mappings[0]
            print(f"\n🔄 处理: {m.s3_key}")

            # 下载文件
            # 生成临时文件名
            ext = Path(m.s3_key).suffix or ".bin"
            temp_file = temp_path / f"{hashlib.md5(download_url.encode()).hexdigest()}{ext}"

            if not download_file(m.download_url, temp_file):
                fail_count += 1
                continue

            # 上传到S3
            if not upload_to_s3(temp_file, m.s3_key):
                fail_count += 1
                continue

            # 更新所有引用该资源的markdown文件
            for mapping in mappings:
                file_path = Path(mapping.file_path)
                if update_markdown_file(file_path, mapping.old_url, mapping.new_url):
                    print(f"  ✏️  更新: {file_path.name}")

            success_count += 1

            # 清理临时文件
            temp_file.unlink(missing_ok=True)

    # 总结
    print("\n" + "=" * 60)
    print("✅ 迁移完成!")
    print(f"   成功: {success_count}")
    print(f"   失败: {fail_count}")
    print("=" * 60)


if __name__ == "__main__":
    main()
