---
title: 使用Docker(MinIO)和Caddy创建图床服务
date: 2024-11-23
category: Software
tags:
  - Linux
  - Software
  - Docker
license: CC BY-NC-ND 4.0
isOriginal: true
---

以往博客都是直接将文件粘贴到文件夹，但是其不是很方便，并且也不方便转移(到其他平台上)。最后综合几个选择，选择自建 MinIO 当作图床，同时也实验一下 MinIO 的文件压缩功能。

<!-- more -->

## 配置 MinIO

首先你需要[配置 docker](https://blog.menghuan1918.com/posts/Something_new_1.html)，随后找到一个你心仪的位置，创建如下`docker-compose.yml`，记得更改账户密码为强密码：

```yml
services:
  minio_web:
    image: minio/minio:RELEASE.2024-10-13T13-34-11Z
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - ./minio_data:/data
    environment:
      MINIO_ROOT_USER: xxx114514
      MINIO_ROOT_PASSWORD: abcdefg
      MINIO_COMPRESSION_ENABLE: "on"
      MINIO_COMPRESSION_EXTENSIONS: "*"
      MINIO_COMPRESSION_MIME_TYPES: "*"
    command: server /data --console-address ":9001"
    restart: always
    deploy:
      resources:
        limits:
          memory: 512M
```

其中我使用`MINIO_COMPRESSION_ENABLE`环境变量使其开启透明压缩，同时指定压缩对象为所有类型的文件(虽然其对于图片是否起效存疑)。使用`docker compose up -d`启动后访问`9001`上的 WEB 界面。

随后创建一个访问密匙：

![](https://minio.menghuan1918.com:443/markdown/2024/11/24/network-asset-network-asset-image-20241123215407-0s7h5j8_repeat_1732373319344__610746-20241123233209-vozqp2f_repeat_1732375998367__622388-20241124000714-gi26sf9_repeat_1732414494928__804502-20241124101941-aw5wk3o_repeat_1732416496319__264828.png)

再创建一个桶(随便取什么名字)，默认情况下桶的权限是公开不可读的，我们添加一个匿名用户的只读权限(千万别学某些教程里直接设置为 pubic)：

![](https://minio.menghuan1918.com:443/markdown/2024/11/24/network-asset-network-asset-image-20241123215557-843y87l_repeat_1732373318755__447826-20241123233225-2b9yh7z_repeat_1732376002457__226152-20241124000714-fgj9y59_repeat_1732378096500__154544-20241124101941-nv2cyw8_repeat_1732415497846__781564.png)

最后使用 Caddy 进行反代：

```caddy
minio.menghuan1918.com {
        reverse_proxy 127.0.0.1:9000
        tls /etc/ssl/menghuan1918.pem /etc/ssl/menghuan1918.key
}
```

其中`tls`指定的我的证书，如果没有可以不填(Caddy 会自动申请的)。**注意此处反代的是 9000 的 API 端口不是 9001 的 WEB 端口。**

最后就可以拿着之前的访问密匙去填写图床上传工具啦~比如我是使用的思源笔记 + PicGo 插件完成的。

> 实际上从这篇开始，所有的图片就已经是图床上的啦
