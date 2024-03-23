import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as c,c as l,b as n,d as s,e as a,a as t}from"./app-BBpkQuNs.js";const i="/assets/rustdesk-C4Xihi5A.png",r={},u=n("h2",{id:"在服务器上使用docker部署rustdesk中续",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#在服务器上使用docker部署rustdesk中续"},[n("span",null,"在服务器上使用Docker部署RustDesk中续")])],-1),d={href:"https://blog.menghuan1918.com/intro.html",target:"_blank",rel:"noopener noreferrer"},k=t(`<h3 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装Docker</span></a></h3><p>虽然可以选择官方源进行安装.....但是当时用了阿里云镜像进行安装docker(埋坑了):</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg <span class="token operator">|</span> apt-key <span class="token function">add</span> -
add-apt-repository <span class="token string">&quot;deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable&quot;</span>
<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io <span class="token function">docker-compose</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),m={href:"https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-oss/install/",target:"_blank",rel:"noopener noreferrer"},v=t(`<div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">rustdesk-net</span><span class="token punctuation">:</span>
    <span class="token key atrule">external</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">hbbs</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> hbbs
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 21115<span class="token punctuation">:</span><span class="token number">21115</span>
      <span class="token punctuation">-</span> 21116<span class="token punctuation">:</span><span class="token number">21116</span>
      <span class="token punctuation">-</span> 21116<span class="token punctuation">:</span>21116/udp
    <span class="token key atrule">image</span><span class="token punctuation">:</span> rustdesk/rustdesk<span class="token punctuation">-</span>server<span class="token punctuation">:</span>latest
    <span class="token key atrule">command</span><span class="token punctuation">:</span> hbbs <span class="token punctuation">-</span>r &lt;Your IP<span class="token punctuation">&gt;</span><span class="token punctuation">:</span>21117 <span class="token punctuation">-</span>k _
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/root
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rustdesk<span class="token punctuation">-</span>net
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> hbbr
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">limits</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 64M

  <span class="token key atrule">hbbr</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> hbbr
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 21117<span class="token punctuation">:</span><span class="token number">21117</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> rustdesk/rustdesk<span class="token punctuation">-</span>server<span class="token punctuation">:</span>latest
    <span class="token key atrule">command</span><span class="token punctuation">:</span> hbbr <span class="token punctuation">-</span>k _
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data<span class="token punctuation">:</span>/root
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rustdesk<span class="token punctuation">-</span>net
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">limits</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 64M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>此处我添加了<code>-k _</code>以阻止没加密key的用户进行连接</p></blockquote><p>随后cd到响应的地方，<code>docker-compose up -d</code>就可以用了....?</p><h3 id="解决依赖问题" tabindex="-1"><a class="header-anchor" href="#解决依赖问题"><span>解决依赖问题</span></a></h3><p>随后立即就得到一堆报错，其中最为关键的几处报错为:</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>TypeError<span class="token punctuation">:</span> request<span class="token punctuation">(</span><span class="token punctuation">)</span> got an unexpected keyword argument <span class="token string">&#39;chunked&#39;</span>
docker<span class="token punctuation">.</span>errors<span class="token punctuation">.</span>DockerException<span class="token punctuation">:</span> Error <span class="token keyword">while</span> fetching server API version<span class="token punctuation">:</span> request<span class="token punctuation">(</span><span class="token punctuation">)</span> got an unexpected keyword argument <span class="token string">&#39;chunked&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),h={href:"https://github.com/docker/docker-py/issues/3113?utm_source=pocket_saves",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"requests",-1),g=n("s",null,"是不是有点过于旧了",-1),y=n("code",null,"requests",-1),_=t(`<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> requests<span class="token operator">&lt;</span><span class="token number">2.2</span>.29
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>随后再重新启动，这次一切正常了。在RustDesk中填入中续服务器的ip以及<code>id_ed25519.pub</code>作为密匙就好了。</p><figure><img src="`+i+'" alt="rustdesk连接上中续服务器的样子" tabindex="0" loading="lazy"><figcaption>rustdesk连接上中续服务器的样子</figcaption></figure><h2 id="将网页从pelican切换为vuepress" tabindex="-1"><a class="header-anchor" href="#将网页从pelican切换为vuepress"><span>将网页从pelican切换为vuepress</span></a></h2><p>考虑到前者对markdown的支持实在是有点过于折腾，花了两个多小时切换到了vuepress。效果相当的好!由于两者都是以Markdown为基础，所以迁移过程无非就是改了改配置文件就完了。</p><blockquote><p>除了首页的图标<code>heroImage</code>貌似只能读取svg文件以外...最开始尝试的png图片，老是报错还以为是路径。</p></blockquote><h3 id="改进的更新脚本" tabindex="-1"><a class="header-anchor" href="#改进的更新脚本"><span>改进的更新脚本</span></a></h3>',7),f={href:"https://github.com/Menghuan1918/WebPage/blob/main/Images.sh",target:"_blank",rel:"noopener noreferrer"},D=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[n("pre",{class:"language-bash"},[n("code",null,`./Images.sh
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),x=n("p",null,"对这个文件夹中所有文件进行遍历，如有.done结尾的标示文件则代表已经被压缩，如没有则压缩并标记。",-1);function w(R,T){const e=p("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[s("由于我有"),n("a",d,[s("两台电脑"),a(e)]),s("，虽然日常都是通过tailscale穿透后ssh连接，但是总还是偶有需要远程操控的地方。很显然RustDesk提供的服务器就亚洲而言延迟有点高了，因此自己动手部署一个中续服务器。依然在是前文提到的阿里云香港轻量应用服务器，Ubuntu 22.04上部署。")]),k,n("p",null,[s("由于我直接用的root用户登录所以并没加sudo。随后找一个你喜欢的地方创建RustDesk的docker-compose.yml文件吧，此处文件参照"),n("a",m,[s("官方文档"),a(e)]),s(":")]),v,n("p",null,[s("随后搜索定位到为"),n("a",h,[s("这个issue中提到过"),a(e)]),s("，原因为pip包"),b,s("更新导致的接口变化，后续版本有修复。查看服务器上的docker-compose版本为1.29.2-1.....("),g,s(")，考虑别的地方暂时也没使用"),y,s("，将其降级草草解决问题:")]),_,n("p",null,[s("随着写的文章多起来了(指加上这篇水文也才4篇)，开始有往文章里面插入图片的需求了。于是在原先的更新脚本中插入了一个"),n("a",f,[s("对特定文件夹图片进行压缩"),a(e)]),s("的脚本。")]),D,x])}const M=o(r,[["render",w],["__file","Something_new_1.html.vue"]]),N=JSON.parse(`{"path":"/posts/Something_new_1.html","title":"折腾杂谈:Docker部署Rustdesk/切换网站框架","lang":"zh-CN","frontmatter":{"title":"折腾杂谈:Docker部署Rustdesk/切换网站框架","date":"2024-03-23T00:00:00.000Z","updated":"2024-03-23T00:00:00.000Z","categories":"Software","tags":["Arch","Linux","Docker","Software"],"copyright":"CC BY-NC-ND 4.0","description":"在服务器上使用Docker部署RustDesk中续 由于我有两台电脑，虽然日常都是通过tailscale穿透后ssh连接，但是总还是偶有需要远程操控的地方。很显然RustDesk提供的服务器就亚洲而言延迟有点高了，因此自己动手部署一个中续服务器。依然在是前文提到的阿里云香港轻量应用服务器，Ubuntu 22.04上部署。 安装Docker 虽然可以选择...","head":[["meta",{"property":"og:url","content":"https://blog.menghuan1918.com/posts/Something_new_1.html"}],["meta",{"property":"og:site_name","content":"Menghuan1918's Blog"}],["meta",{"property":"og:title","content":"折腾杂谈:Docker部署Rustdesk/切换网站框架"}],["meta",{"property":"og:description","content":"在服务器上使用Docker部署RustDesk中续 由于我有两台电脑，虽然日常都是通过tailscale穿透后ssh连接，但是总还是偶有需要远程操控的地方。很显然RustDesk提供的服务器就亚洲而言延迟有点高了，因此自己动手部署一个中续服务器。依然在是前文提到的阿里云香港轻量应用服务器，Ubuntu 22.04上部署。 安装Docker 虽然可以选择..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-23T16:00:27.000Z"}],["meta",{"property":"article:author","content":"Menghuan1918"}],["meta",{"property":"article:tag","content":"Arch"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"Software"}],["meta",{"property":"article:published_time","content":"2024-03-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-23T16:00:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"折腾杂谈:Docker部署Rustdesk/切换网站框架\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-23T16:00:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Menghuan1918\\",\\"url\\":\\"https://blog.menghuan1918.com\\"}]}"]]},"headers":[{"level":2,"title":"在服务器上使用Docker部署RustDesk中续","slug":"在服务器上使用docker部署rustdesk中续","link":"#在服务器上使用docker部署rustdesk中续","children":[{"level":3,"title":"安装Docker","slug":"安装docker","link":"#安装docker","children":[]},{"level":3,"title":"解决依赖问题","slug":"解决依赖问题","link":"#解决依赖问题","children":[]}]},{"level":2,"title":"将网页从pelican切换为vuepress","slug":"将网页从pelican切换为vuepress","link":"#将网页从pelican切换为vuepress","children":[{"level":3,"title":"改进的更新脚本","slug":"改进的更新脚本","link":"#改进的更新脚本","children":[]}]}],"git":{"createdTime":1711209627000,"updatedTime":1711209627000,"contributors":[{"name":"Menghuan","email":"Menghuan2003@outlook.com","commits":1}]},"readingTime":{"minutes":2.75,"words":824},"filePathRelative":"posts/Something_new_1.md","localizedDate":"2024年3月23日","excerpt":"<h2>在服务器上使用Docker部署RustDesk中续</h2>\\n<p>由于我有<a href=\\"https://blog.menghuan1918.com/intro.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">两台电脑</a>，虽然日常都是通过tailscale穿透后ssh连接，但是总还是偶有需要远程操控的地方。很显然RustDesk提供的服务器就亚洲而言延迟有点高了，因此自己动手部署一个中续服务器。依然在是前文提到的阿里云香港轻量应用服务器，Ubuntu 22.04上部署。</p>\\n<h3>安装Docker</h3>\\n<p>虽然可以选择官方源进行安装.....但是当时用了阿里云镜像进行安装docker(埋坑了):</p>","autoDesc":true}`);export{M as comp,N as data};
