---
title: 折腾杂谈:部署Alist并整合/服务器优化
date: 2024-04-10
updated: 2024-04-10
categories: Website
tags:
  - Linux
  - Docker
  - nginx
  - Software
copyright: CC BY-NC-ND 4.0
---

本文内容：
- 部署Alist网盘服务到二级网址
- 优化网站生成流程
- 使用tailscale加快SSH速度

## 部署Alist

不出意外地是用Docker部署(貌似也不准确，因为实际上是docker compose部署)，按照其[手册](https://alist.nn.ci/guide/install/docker.html)设置docker-compose.yml：

```yml
version: '3.3'
services:
    alist:
        image: 'xhofe/alist:latest'
        container_name: alist
        volumes:
            - '/etc/alist:/opt/alist/data'
        ports:
            - '5244:5244'
        environment:
            - PUID=0
            - PGID=0
            - UMASK=022
        restart: unless-stopped
```

随后`docker-compose up -d`运行，这时候访问`服务器ip:5244`(记得设置防火墙)就能查看到登录界面了。随后进行密码的设置：

```bash
docker exec -it alist ./alist admin set PASSWORD
```

随后就能进入Alist网页，在下方点击`管理`按钮进行响应的设置了。

### 设置Nginx转发为二级网址

为了将Alist部署到二级页面(也就是[/AlistStore 上](https://blog.menghuan1918.com/AlistStore/))，还需要手动设置`site_url`的值。

根据[手册](https://alist.nn.ci/zh/config/configuration.html)可以看到配置文件目录为`Docker：进入 Docker 容器内data/config.json`，考虑到前文的docker-compose.yml中，`volumes`的设置是`- '/etc/alist:/opt/alist/data'`，也就是说这个配置文件也可以在实体机上的`/etc/alist/config.json`中找到。

修改其`site_url`为`"https://blog.menghuan1918.com/AlistStore"`,随后重启容器。

其中Nginx需要遵从其[手册](https://alist.nn.ci/zh/faq/howto.html)添加：

```conf
location /alist/ {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Range $http_range;
	  proxy_set_header If-Range $http_if_range;
    proxy_redirect off;
    proxy_pass http://127.0.0.1:5244/alist/;
    client_max_body_size 20000m;
}
```

随后访问[https://blog.menghuan1918.com/AlistStore/](https://blog.menghuan1918.com/AlistStore/)就能看到了。

## 一些关于服务器的优化

### 优化部署流程

虽然整体而言就是 编译为静态网页 -> 压缩图片 -> 同步到服务器。将后两步操作写为一个[Shell脚本](https://github.com/Menghuan1918/WebPage/blob/main/UpWeb.sh)，随后修改`package.json`：

```json
"docs:build": "vuepress-vite build src && sh ./UpWeb.sh",
```

这样就能一键走完这一套了~

### 使用tailscale加快SSH速度

由于某些因素的影响 (~~狗屎校园网~~)，SSH连接服务器的速度可谓是难以忍受(试想按下回车后居然没反应，等几秒果然是网卡了)。不过使用tailscale建立虚拟局域网就没那么多事情了......按照其[安装文档](https://tailscale.com/download/linux)安装即可。

不过在阿里云上有一个暗坑，tailscale的 魔法DNS (MagicDNS) 会把阿里云的内网更新地址给挤掉。为了加快更新速度 ~~节省服务器流量~~ ，最简单的方法是关掉这个功能。

```bash
tailscale down
tailscale up --accept-dns=false --netfilter-mode=off
```

这样就好了，将SSH的ip地址更换为tailscale中的局域网地址，明显流畅丝滑多了。