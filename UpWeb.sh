#!/bin/bash
source $HOME/miniconda3/etc/profile.d/conda.sh
conda activate base
cd $HOME/Documents/Web
mv ./content/.obsidian ./.obsidian
rm -rf ./output

pelican content -s ./pelicanconf.py -t Flex

mv ./.obsidian ./content/.obsidian

cp ./BingSiteAuth.xml ./output/BingSiteAuth.xml
cp ./google3940d9bcd31ab1cc.html ./output/google3940d9bcd31ab1cc.html
cp ./sitemap.xml ./output/sitemap.xml

rsync -avzi --delete ./output/ root@Ali_hk:/var/www/menghuan/

echo "Done!"
