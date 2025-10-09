---
title: My Arch Linux - 外观与字体
date: 2024-12-08
category: Linux
tags:
  - KDE
  - Software
  - Arch
license: CC BY-NC-ND 4.0
isOriginal: true
---

本文旨在Arch Linux中配置完善的字体，同时在最小化安装外部包，不影响性能，同时尽可能简化配置的情况下美化KDE的外观。

最终效果在不影响视觉的情况下尽可能添加透明效果，同时混合Windows和MacOS的操作逻辑，最大化显示区域的同时保证了操作效率。

<!-- more -->

## 字体

### 安装

Linux中，字体问题实际上主要是补全需要的所有字体。为了使用完善的中文字体，可以安装以下包：

```bash
sudo pacman -S adobe-source-han-serif-cn-fonts adobe-source-han-sans-cn-fonts adobe-source-code-pro-fonts noto-fonts-cjk
```

一般而言已经足以覆盖所有常用的字体了。此外还可以从[此处](https://developer.huawei.com/consumer/en/doc/design-guides-V1/font-0000001157868583-V1)下载HarmonyOS Sans安装使用。

当然，一些情况下还是需要Windows字体的，例如某些Latex文件的编译，其指定需要使用Simsun(宋体)，因此你还需要安装这些字体。当然你也可以直接从Windows复制字体过来安装。

```bash
sudo usermod -aG disk $USER # 用户权限解压需要
paru -S ttf-ms-win11-auto-zh_cn
```

### 字体回退设置

当然...要是你按照上面所属安装了这些Windows字体后，会发现显示会变得很奇怪。就像如下这样，显示的中文全变成宋体了：

![衬线字体拿来显示果然很丑陋](https://minio.menghuan1918.com:443/markdown/2024/12/08/network-asset-屏幕截图_20241205_191036-20241207235022-fvhvmsa_repeat_1733631260364__839464-20241208121506-6wz0qy3_repeat_1733631383295__855351.webp)

虽然Windows上很多软件默认的回退字体就是宋体，~~但是我认为显示为衬线字体相当的丑~~，通过自定义字体配置将其指定为非衬线字体：

创建文件`/home/menghuan/.config/fontconfig/fonts.conf`，输入(**记得更改为你想使用的字体名!** )：<sup>[参考 1]</sup>

```conf
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
        <alias>
                <family>serif</family>
                <prefer>
                        <family>Noto Serif CJK SC</family>
                        <family>Source Han Serif SC</family>
                        <family>Source Han Serif</family>
                </prefer>
        </alias>
        <alias>
                <family>sans-serif</family>
                <prefer>
                        <family>Noto Sans CJK SC</family>
                        <family>Source Han Sans</family>
                        <family>Droid Sans Fallback</family>
                </prefer>
        </alias>
        <alias>
                <family>monospace</family>
                <prefer>
                        <family>Meslo</family>
                        <family>Droid Sans Fallback</family>
                        <family>Source Han Sans HW SC</family>
                        <family>Noto Sans Mono CJK SC</family>
                </prefer>
        </alias>
</fontconfig>
```

随后运行

```bash
fc-cache -fv
```

刷新字形缓存，其显示就恢复正常了~

![正常了](https://minio.menghuan1918.com:443/markdown/2024/12/08/network-asset-屏幕截图_20241205_191710-20241207235836-r098mdt_repeat_1733631254241__500451-20241208121506-fx9b5ud_repeat_1733631389233__584718.webp)

> 题外话，某些网页会指定优先使用宋体，这就很令人难受了，好在这类网站不多。解决方法也有，火狐可以在字体设置中强制所有网站使用指定的字体，而不是使用网站指定的。

## 外观

### 效果图

#### 外观

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/network-asset-屏幕截图_20241207_214558-20241207230903-v40nvkm_repeat_1733631266552__037675-20241208121506-6pd0usa_repeat_1733631394893__962703.webp)

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/network-asset-屏幕截图_20241207_214729-20241207230915-hwm4iuv_repeat_1733631269036__340634-20241208121506-dt8ghzf_repeat_1733631400450__128944.webp)

#### 桌面平铺显示(设置快捷键触发)

![当前桌面平铺](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241207231438-qccth8x_repeat_1733631404523__949139.webp)

![所有桌面平铺](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241207231434-973cubu_repeat_1733631408697__311008.webp)

#### 全局菜单功能

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241207231646-jljdz2c_repeat_1733631412246__029312.webp)

### 基本配置

在上方添加一个面板，往上添加全局菜单，系统托盘，下方添加一个悬浮面板，往其中添加图标任务管理器。相对而言还是挺简单的(至少不需要别的东西)。

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241208113139-1trddq1_repeat_1733631416830__366156.webp)

### 图标

使用的是[Papirus](https://store.kde.org/p/1166289)，是一个适配相当广泛的图标库。直接在`设置-颜色与主题-图标-获取新图标(右上角)`中搜索安装即可。

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241207225414-q587xtl_repeat_1733631419801__562289.webp)

### Kwin特效

仅添加了一个特效`Geometry Change`，用于在窗口移动(Meta+方向键)时会有一个动画。不需要有什么额外的配置，直接在`设置-窗口管理-桌面特征-获取新效果`中下载使用即可。

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/network-asset-image-20241207225248-m3r8ueq_repeat_1733631165107__433077-20241208121507-mv9zap0_repeat_1733631433516__704655.webp)

效果展示：

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/output_repeat_1733648461102__254312.gif)

### 颜色主题

[Fluent color scheme](https://store.kde.org/p/1499840)，直接在`设置-颜色与主题-颜色-获取新颜色(右上角)`中搜索安装即可。

### Firefox

使用的是[Firefox GNOME theme](https://github.com/rafaelmardojai/firefox-gnome-theme)，直接使用flathub安装相应的添加软件：`flatpak install flathub dev.qwery.AddWater`，随后运行开启即可。

### 应用外观

使用lightly qt主题，随后在应用程序外观中设置透明度。

```bash
paru -S lightly-qt6
```

> 如果你还在使用X11，记得同时调整Breeze微风的菜单透明度

### 小细节

#### (类)毛玻璃效果

在窗口背景虚化中调整设置：

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241208120105-0jgs5g6_repeat_1733631444506__986034.webp)

其效果如下：

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241208120155-0eaz8u6_repeat_1733631447808__416493.webp)

#### 任务栏细节

在图标任务管理器中设置中键关闭任务，以及点击分组任务时显示窗口预览：‸

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241208115247-p2n0z1w_repeat_1733631450829__460944.webp)

例如我打开了2个火狐窗口，点击火狐图标：

![忽略！](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241208115420-q87pch9_repeat_1733631453713__406431.webp)

![展开！](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241208115403-rv6i7fb_repeat_1733631457477__979325.webp)

#### 快捷窗口置顶

在`颜色和主题-窗口装饰元素`中，选择配置标题栏按钮，将保持在其他窗口之上拖拽进去。例如下图中的设置窗口就是一个全局置顶的窗口。

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241208120412-86ppykb_repeat_1733631461075__269343.webp)

对于一些没有标题栏的应用(例如思源笔记)，你也可以在应用内按下`Alt+F3`调出：

![](https://minio.menghuan1918.com:443/markdown/2024/12/08/image-20241208120630-e7r2nht_repeat_1733631463594__111368.webp)

#### 虚拟桌面

在设置中可以设置行数。有一说一，虚拟桌面是个好功能，用过就回不去了。

![Windows下的虚拟桌面点一下卡半天](https://minio.menghuan1918.com:443/markdown/2024/12/08/network-asset-image-20241208120749-muilz8h_repeat_1733631142888__242875-20241208121509-t9f54pg_repeat_1733631479529__582026.webp)

## 参考

参考 1: 参考自 oldherl 在 https://gist.github.com/oldherl/7cace8ec8d266890417d648a925a8221 中的配置文件