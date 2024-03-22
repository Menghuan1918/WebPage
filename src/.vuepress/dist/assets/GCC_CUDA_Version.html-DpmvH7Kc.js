import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as c,o as r,c as i,a as e,b as a,d as s,e as l}from"./app-kGFKkwLK.js";const o="/assets/1-B_8TrDtk.png",p={},d={href:"https://jyywiki.cn/OS/2024/",target:"_blank",rel:"noopener noreferrer"},u=e("s",null,"虽然第一个实验“打印进程树”就卡了好久",-1),b=e("code",null,"编写可移植的代码",-1),g=e("h1",{id:"安装相应的包",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装相应的包"},[e("span",null,"安装相应的包")])],-1),m={href:"https://wiki.archlinuxcn.org/wiki/%E5%AE%98%E6%96%B9%E4%BB%93%E5%BA%93#%E5%90%AF%E7%94%A8multilib",target:"_blank",rel:"noopener noreferrer"},h=l(`<p>随后更新软件包列表并安装相应的GCC32位库：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> pacman <span class="token parameter variable">-Syu</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> lib32-gcc-libs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>随后就可以愉快地使用</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-m32</span> pstree.c <span class="token parameter variable">-o</span> pstree-32
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译32位软件了。</p><p>当然这儿应该直接使用<code>Makefile</code>进行编译，不过问题这时候就来了，居然得到了报错如下:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-m32</span> <span class="token parameter variable">-O1</span> <span class="token parameter variable">-std</span><span class="token operator">=</span>gnu11 <span class="token parameter variable">-ggdb</span> <span class="token parameter variable">-Wall</span> <span class="token parameter variable">-Werror</span> -Wno-unused-result -Wno-unused-value -Wno-unused-variable ./pstree.c <span class="token parameter variable">-o</span> pstree-32 
/usr/bin/ld: 当搜索用于 /usr/lib/gcc/x86_64-pc-linux-gnu/12.3.0/libgcc.a 时跳过不兼容的 <span class="token parameter variable">-lgcc</span> 
/usr/bin/ld: 找不到 -lgcc: 没有那个文件或目录 
/usr/bin/ld: 当搜索用于 /usr/lib/gcc/x86_64-pc-linux-gnu/12.3.0/libgcc_s.so.1 时跳过不兼容的 libgcc_s.so.1 
/usr/bin/ld: 当搜索用于 /usr/lib/gcc/x86_64-pc-linux-gnu/12.3.0/libgcc_s.so.1 时跳过不兼容的 libgcc_s.so.1 
/usr/bin/ld: 当搜索用于 /usr/lib/gcc/x86_64-pc-linux-gnu/12.3.0/libgcc.a 时跳过不兼容的 <span class="token parameter variable">-lgcc</span> 
/usr/bin/ld: 找不到 -lgcc: 没有那个文件或目录 
collect2: 错误：ld 返回 <span class="token number">1</span> 
make: *** <span class="token punctuation">[</span><span class="token punctuation">..</span>/Makefile:20：pstree-32<span class="token punctuation">]</span> 错误 <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而使用<code>pacman -Qs gcc</code>查看得到<code>local/gcc 13.2.1-5</code>，本地的gcc版本明明是13.2.1，上文报错中搜寻的是12.3.0的库。</p><p>但是在终端中使用<code>gcc -v</code>，得到的版本号也是12.3.0。</p><h1 id="解决问题" tabindex="-1"><a class="header-anchor" href="#解决问题"><span>解决问题</span></a></h1><p>使用<code>which gcc</code>查看得到<code>/opt/cuda/bin/gcc</code>，再进一步查看发现这个文件链接到了<code>/usr/bin/gcc-12</code>。</p><p>再使用<code>pacman -Qi gcc12</code>查看gcc12的关系，果然看到cuda依赖于这个包，所以上文的报错是因为cuda还没支持gcc13，但是arch官方库中的gcc已经是13.x版本了。</p><p>因此解决方案也很简单，将Makefile中的所有<code>gcc</code>关键词换为<code>/bin/gcc</code>，就会使用(没安装cuda包下)默认的gcc版本了：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ /bin/gcc <span class="token parameter variable">-v</span>
使用内建 specs。
<span class="token assign-left variable">COLLECT_GCC</span><span class="token operator">=</span>/bin/gcc
<span class="token assign-left variable">COLLECT_LTO_WRAPPER</span><span class="token operator">=</span>/usr/lib/gcc/x86_64-pc-linux-gnu/13.2.1/lto-wrapper
目标：x86_64-pc-linux-gnu
配置为：/build/gcc/src/gcc/configure --enable-languages<span class="token operator">=</span>ada,c,c++,d,fortran,go,lto,m2,objc,obj-c++ --enable-bootstrap <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr <span class="token parameter variable">--libdir</span><span class="token operator">=</span>/usr/lib <span class="token parameter variable">--libexecdir</span><span class="token operator">=</span>/usr/lib <span class="token parameter variable">--mandir</span><span class="token operator">=</span>/usr/share/man <span class="token parameter variable">--infodir</span><span class="token operator">=</span>/usr/share/info --with-bugurl<span class="token operator">=</span>https://bugs.archlinux.org/ --with-build-config<span class="token operator">=</span>bootstrap-lto --with-linker-hash-style<span class="token operator">=</span>gnu --with-system-zlib --enable-__cxa_atexit --enable-cet<span class="token operator">=</span>auto --enable-checking<span class="token operator">=</span>release --enable-clocale<span class="token operator">=</span>gnu --enable-default-pie --enable-default-ssp --enable-gnu-indirect-function --enable-gnu-unique-object --enable-libstdcxx-backtrace --enable-link-serialization<span class="token operator">=</span><span class="token number">1</span> --enable-linker-build-id --enable-lto --enable-multilib --enable-plugin --enable-shared --enable-threads<span class="token operator">=</span>posix --disable-libssp --disable-libstdcxx-pch --disable-werror
线程模型：posix
支持的 LTO 压缩算法：zlib zstd
gcc 版本 <span class="token number">13.2</span>.1 <span class="token number">20230801</span> <span class="token punctuation">(</span>GCC<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><s>你也可以直接删除<code>cuda</code>包，重启后gcc也会变回gcc13了</s>，当然，如果你没有安装<code>cuda</code>包也不会出现这个问题了(或者cuda支持gcc13也不会有这个问题了)。</p><h1 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h1><p>然后直接使用make编译就能正常使用了～</p><figure><img src="`+o+'" alt="make编译后并运行的样子" tabindex="0" loading="lazy"><figcaption>make编译后并运行的样子</figcaption></figure>',18);function v(k,_){const n=c("ExternalLinkIcon");return r(),i("div",null,[e("p",null,[a("最近在跟着学习南京大学蒋老师的"),e("a",d,[a("操作系统课程"),s(n)]),a("，"),u,a("，实验要求"),b,a("，这儿就是同时编译32-bit 和 64-bit 的版本，因此开始愉快地安装库->编译。")]),g,e("p",null,[a("默认情况下Arch是不启用Multilib仓库(内含32位软件和连接库)的，如果你还没有启用首先当然是"),e("a",m,[a("启用Multilib仓库"),s(n)]),a("。")]),h])}const C=t(p,[["render",v],["__file","GCC_CUDA_Version.html.vue"]]),A=JSON.parse(`{"path":"/posts/GCC_CUDA_Version.html","title":"在Arch Linux下编译32位C程序出错","lang":"zh-CN","frontmatter":{"title":"在Arch Linux下编译32位C程序出错","date":"2024-03-10T00:00:00.000Z","updated":"2024-03-10T00:00:00.000Z","categories":"Linux","tags":["Arch","Linux","Bugs"],"copyright":"CC BY-NC-ND 4.0","description":"最近在跟着学习南京大学蒋老师的操作系统课程，，实验要求编写可移植的代码，这儿就是同时编译32-bit 和 64-bit 的版本，因此开始愉快地安装库->编译。 安装相应的包 默认情况下Arch是不启用Multilib仓库(内含32位软件和连接库)的，如果你还没有启用首先当然是启用Multilib仓库。 随后更新软件包列表并安装相应的GCC32位库： 随...","head":[["meta",{"property":"og:url","content":"https://blog.menghuan1918.com/posts/GCC_CUDA_Version.html"}],["meta",{"property":"og:site_name","content":"Menghuan1918's Blog"}],["meta",{"property":"og:title","content":"在Arch Linux下编译32位C程序出错"}],["meta",{"property":"og:description","content":"最近在跟着学习南京大学蒋老师的操作系统课程，，实验要求编写可移植的代码，这儿就是同时编译32-bit 和 64-bit 的版本，因此开始愉快地安装库->编译。 安装相应的包 默认情况下Arch是不启用Multilib仓库(内含32位软件和连接库)的，如果你还没有启用首先当然是启用Multilib仓库。 随后更新软件包列表并安装相应的GCC32位库： 随..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"Menghuan1918"}],["meta",{"property":"article:tag","content":"Arch"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"Bugs"}],["meta",{"property":"article:published_time","content":"2024-03-10T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Arch Linux下编译32位C程序出错\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-10T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Menghuan1918\\",\\"url\\":\\"https://blog.menghuan1918.com\\"}]}"]]},"headers":[],"git":{},"readingTime":{"minutes":2.71,"words":814},"filePathRelative":"posts/GCC_CUDA_Version.md","localizedDate":"2024年3月10日","excerpt":"<p>最近在跟着学习南京大学蒋老师的<a href=\\"https://jyywiki.cn/OS/2024/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">操作系统课程</a>，<s>虽然第一个实验“打印进程树”就卡了好久</s>，实验要求<code>编写可移植的代码</code>，这儿就是同时编译32-bit 和 64-bit 的版本，因此开始愉快地安装库-&gt;编译。</p>\\n<h1>安装相应的包</h1>\\n<p>默认情况下Arch是不启用Multilib仓库(内含32位软件和连接库)的，如果你还没有启用首先当然是<a href=\\"https://wiki.archlinuxcn.org/wiki/%E5%AE%98%E6%96%B9%E4%BB%93%E5%BA%93#%E5%90%AF%E7%94%A8multilib\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">启用Multilib仓库</a>。</p>","autoDesc":true}`);export{C as comp,A as data};
