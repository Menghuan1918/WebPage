---
title: Configuring DOSBox and its window size
date: 2024-04-28
categories: Linux
tags:
  - Windows
  - Linux
  - Software
  - Arch
  - Ubuntu
copyright: CC BY-NC-ND 4.0
---

By default, DOSBox's window size is specified in pixels, which is a little bit too small for modern screens. It is not possible to drag and drop the window to resize it, although it is possible to use `alt + Enter` to switch it to full-screen mode, but for efficiency reasons it is better to resize the window.

<!-- more -->

## Install DOSBox
Use the Package Manager to install more **easily and quickly** on each system! Just open your Terminal/PowerShell and enter the command to install.

In particular, for Windows, its own package manager `winget` should be supported on Windows 10 1709 and above. If the `winget` command is not found, you can see [Microsoft's instructions for installing winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/) or go directly to the [DOSBox website](https://www.dosbox.com/download.php?main=1) to download DOSBox and install it manually. 

::: code-tabs#install
@tab Windows

```powershell
winget install DOSBox
```
@tab Arch Linux

```bash
sudo pacman -S dosbox
```

@tab Ubuntu

```bash
sudo apt install dosbox
```
:::

![After install](../../images/10/Win_Ubuntu_install.png)

## Configure window size

![The file path on Windows and Arch Linux](../../images/10/conf_file.png)

Note the directory of conf files loaded on the command line after startup (as shown above) and open it using a file editor.

### For Windows
Find about 30 lines where the change is made:

```conf
windowresolution=1280x1000
output=overlay
```

Where `windowresolution` is followed by the value of the window size you want to set. output You can fill in one of `overlay, opengl, openglnb, ddraw`.

### For Linux
Find about 30 lines where the change is made:

```conf
windowresolution=1920x1080
output=opengl
```

Where `windowresolution` is followed by the value of the window size you want to set.

Subsequent restart of DOSBox window size is mostly better.

![Like this](../../images/10/Big_windows.png)