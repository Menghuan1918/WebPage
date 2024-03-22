#!/bin/bash

cd $HOME/Documents/WebPage

# 压缩文件以及生成静态页面
./Images.sh

# 上传文件
rsync -rvzi --times --delete ./src/.vuepress/dist/ root@Ali_hk:/var/www/menghuan/

echo "Done!"
