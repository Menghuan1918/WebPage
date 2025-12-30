#!/bin/bash

cd $HOME/Documents/WebPage

# 压缩文件，由于已经换成自部署S3储存文件，所以这个不需要了)
# ./Images.sh

# 上传文件
rsync -rvzi --times --delete ./src/.vuepress/dist/ ubuntu@tc_sg:/var/www/menghuan/

echo "Done!"