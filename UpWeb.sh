#!/bin/bash
# 激活 conda 环境以及文件目录
source $HOME/miniconda3/etc/profile.d/conda.sh
conda activate base
cd $HOME/Documents/WebPage
mv ./content/.obsidian ./.obsidian
#rm -rf ./output

# 压缩文件以及生成静态页面
./Images.sh
pelican content -s ./pelicanconf.py -t Flex

# 移动文件
mv ./.obsidian ./content/.obsidian
cp ./BingSiteAuth.xml ./output/BingSiteAuth.xml
cp ./google3940d9bcd31ab1cc.html ./output/google3940d9bcd31ab1cc.html
cp ./sitemap.xml ./output/sitemap.xml
cp ./404.html ./output/404.html

python ./Only_One_h1.py
# 上传文件
rsync -rvzi --times --delete ./output/ root@Ali_hk:/var/www/menghuan/

echo "Done!"
