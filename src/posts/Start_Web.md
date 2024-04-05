---
lang: zh-CN
title: 使用pelican以及nginx建立个人博客
date: 2024-02-29
category: Website
tag:
  - nginx
---

## 环境

在本地pelican生成静态网页使用的环境是Arch Linux，python的版本为3.11.4(在miniconda创建的虚拟环境中)。


云端是阿里云香港的轻量应用服务器，Ubuntu 22.04，由于是静态网页云端直接使用nginx部署了。

## Pelican生成静态网页

首先创建一个新的conda虚拟环境(这里偷懒直接用的base环境， ~~反正平时也不用~~ )，再安装相应的包：

`python -m pip install "pelican[markdown]"`

随后使用`pelican-quickstart`生成一个配置文件。

~~默认的主题有点丑~~ ，在这儿我选择使用[Flex](https://github.com/alexandrevicenzi/Flex)主题进行美化了。

使用`pelican content -s pelicanconf.py -t Flex`生成静态网页，生成完后你就可以使用`pelican --listen`在本地预览结果了。没有问题的话就可以将生成的文件传到云端去了。

> 注意，如果你使用火狐(Firefox)进行预览，你可能需要输入`http://localhost:8000`进行预览，否则某些图标不能正常加载。

## 配置Nginx

首先创建一个新的配置文件(当然你得先安装好了对吧)：

`toucch /etc/nginx/sites-available/menghuan.conf`

并将其链接到sites-enabled目录之下(假设你已经删除了sites-enabled下的默认文件)：

`ln -s /etc/nginx/sites-available/menghuan.conf /etc/nginx/sites-enabled/`

在配置好之后使用`nginx -t`检查语法错误后使用`systemctl`重载nginx即可。在这儿我设置的配置文件为：

```conf
server {
    listen 443 ssl;
    server_name blog.menghuan1918.com;

    ssl_certificate /etc/ssl/menghuan1918.pem;
    ssl_certificate_key /etc/ssl/menghuan1918.key;

    root /var/www/menghuan;

    error_page 404 /404.html;

    location / {
        index index.html;
    }
}
```

~~这里使用的证书是从Cloudflare白嫖的~~，这里还踩了个坑，我使用的是apt安装nginx，其默认用户为“www-data”，没注意证书不能被其读取，~~改了权限就好了。~~

## 其他

### 写个Bash脚本方便更新

```bash
#!/bin/bash
source /home/menghuan/miniconda3/etc/profile.d/conda.sh
conda activate base
cd /home/menghuan/Documents/Web
pelican content -s pelicanconf.py -t Flex
rsync -avz --delete ./output/ root@Ali_hk:/var/www/menghuan/
echo "Done!"
```
默认情况下conda指令不能直接在bash脚本中执行，需要先导入。

### 处理~~删除线~~无法显示的问题

在配置文件pelicanconf.py中重新配置了Markdown扩展
```python
MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'pymdownx.tilde': {},
    },
    'output_format': 'html5',
}
```

## 杂谈

第一篇文章不出意外地是记录怎么建立这个站点的文档🤣

不过怎么说也在2.29号这个四年一遇的日子(~~虽然并不准确！~~)配置好了发出来了´͈ ᵕ \`͈

