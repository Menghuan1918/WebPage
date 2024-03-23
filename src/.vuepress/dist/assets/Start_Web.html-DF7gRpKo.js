import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as c,c as l,b as e,d as n,e as o,a}from"./app-BBpkQuNs.js";const p={},r=a('<h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境"><span>环境</span></a></h2><p>在本地pelican生成静态网页使用的环境是Arch Linux，python的版本为3.11.4(在miniconda创建的虚拟环境中)。</p><p>云端是阿里云香港的轻量应用服务器，Ubuntu 22.04，由于是静态网页云端直接使用nginx部署了。</p><h2 id="pelican生成静态网页" tabindex="-1"><a class="header-anchor" href="#pelican生成静态网页"><span>Pelican生成静态网页</span></a></h2><p>首先创建一个新的conda虚拟环境(这里偷懒直接用的base环境， <s>反正平时也不用</s> )，再安装相应的包：</p><p><code>python -m pip install &quot;pelican[markdown]&quot;</code></p><p>随后使用<code>pelican-quickstart</code>生成一个配置文件。</p>',7),d=e("s",null,"默认的主题有点丑",-1),u={href:"https://github.com/alexandrevicenzi/Flex",target:"_blank",rel:"noopener noreferrer"},h=a(`<p>使用<code>pelican content -s pelicanconf.py -t Flex</code>生成静态网页，生成完后你就可以使用<code>pelican --listen</code>在本地预览结果了。没有问题的话就可以将生成的文件传到云端去了。</p><blockquote><p>注意，如果你使用火狐(Firefox)进行预览，你可能需要输入<code>http://localhost:8000</code>进行预览，否则某些图标不能正常加载。</p></blockquote><h2 id="配置nginx" tabindex="-1"><a class="header-anchor" href="#配置nginx"><span>配置Nginx</span></a></h2><p>首先创建一个新的配置文件(当然你得先安装好了对吧)：</p><p><code>toucch /etc/nginx/sites-available/menghuan.conf</code></p><p>并将其链接到sites-enabled目录之下(假设你已经删除了sites-enabled下的默认文件)：</p><p><code>ln -s /etc/nginx/sites-available/menghuan.conf /etc/nginx/sites-enabled/</code></p><p>在配置好之后使用<code>nginx -t</code>检查语法错误后使用<code>systemctl</code>重载nginx即可。在这儿我设置的配置文件为：</p><div class="language-conf line-numbers-mode" data-ext="conf" data-title="conf"><pre class="language-conf"><code>server {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><s>这里使用的证书是从Cloudflare白嫖的</s>，这里还踩了个坑，我使用的是apt安装nginx，其默认用户为“www-data”，没注意证书不能被其读取，<s>改了权限就好了。</s></p><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><h3 id="写个bash脚本方便更新" tabindex="-1"><a class="header-anchor" href="#写个bash脚本方便更新"><span>写个Bash脚本方便更新</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">source</span> /home/menghuan/miniconda3/etc/profile.d/conda.sh
conda activate base
<span class="token builtin class-name">cd</span> /home/menghuan/Documents/Web
pelican content <span class="token parameter variable">-s</span> pelicanconf.py <span class="token parameter variable">-t</span> Flex
<span class="token function">rsync</span> <span class="token parameter variable">-avz</span> <span class="token parameter variable">--delete</span> ./output/ root@Ali_hk:/var/www/menghuan/
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Done!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下conda指令不能直接在bash脚本中执行，需要先导入。</p><h3 id="处理删除线无法显示的问题" tabindex="-1"><a class="header-anchor" href="#处理删除线无法显示的问题"><span>处理<s>删除线</s>无法显示的问题</span></a></h3><p>在配置文件pelicanconf.py中重新配置了Markdown扩展</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>MARKDOWN <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;extension_configs&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;markdown.extensions.codehilite&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&#39;css_class&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;highlight&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string">&#39;markdown.extensions.extra&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string">&#39;markdown.extensions.meta&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string">&#39;pymdownx.tilde&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">&#39;output_format&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;html5&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="杂谈" tabindex="-1"><a class="header-anchor" href="#杂谈"><span>杂谈</span></a></h2><p>第一篇文章不出意外地是记录怎么建立这个站点的文档🤣</p><p>不过怎么说也在2.29号这个四年一遇的日子(<s>虽然并不准确！</s>)配置好了发出来了´͈ ᵕ \`͈</p>`,20);function m(v,g){const s=i("ExternalLinkIcon");return c(),l("div",null,[r,e("p",null,[d,n(" ，在这儿我选择使用"),e("a",u,[n("Flex"),o(s)]),n("主题进行美化了。")]),h])}const x=t(p,[["render",m],["__file","Start_Web.html.vue"]]),_=JSON.parse(`{"path":"/posts/Start_Web.html","title":"使用pelican以及nginx建立个人博客","lang":"zh-CN","frontmatter":{"lang":"zh-CN","title":"使用pelican以及nginx建立个人博客","date":"2024-02-29T00:00:00.000Z","category":["Website"],"tag":["nginx"],"description":"环境 在本地pelican生成静态网页使用的环境是Arch Linux，python的版本为3.11.4(在miniconda创建的虚拟环境中)。 云端是阿里云香港的轻量应用服务器，Ubuntu 22.04，由于是静态网页云端直接使用nginx部署了。 Pelican生成静态网页 首先创建一个新的conda虚拟环境(这里偷懒直接用的base环境， )，...","head":[["meta",{"property":"og:url","content":"https://blog.menghuan1918.com/posts/Start_Web.html"}],["meta",{"property":"og:site_name","content":"Menghuan1918's Blog"}],["meta",{"property":"og:title","content":"使用pelican以及nginx建立个人博客"}],["meta",{"property":"og:description","content":"环境 在本地pelican生成静态网页使用的环境是Arch Linux，python的版本为3.11.4(在miniconda创建的虚拟环境中)。 云端是阿里云香港的轻量应用服务器，Ubuntu 22.04，由于是静态网页云端直接使用nginx部署了。 Pelican生成静态网页 首先创建一个新的conda虚拟环境(这里偷懒直接用的base环境， )，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-23T16:00:27.000Z"}],["meta",{"property":"article:author","content":"Menghuan1918"}],["meta",{"property":"article:tag","content":"nginx"}],["meta",{"property":"article:published_time","content":"2024-02-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-23T16:00:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用pelican以及nginx建立个人博客\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-23T16:00:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Menghuan1918\\",\\"url\\":\\"https://blog.menghuan1918.com\\"}]}"]]},"headers":[{"level":2,"title":"环境","slug":"环境","link":"#环境","children":[]},{"level":2,"title":"Pelican生成静态网页","slug":"pelican生成静态网页","link":"#pelican生成静态网页","children":[]},{"level":2,"title":"配置Nginx","slug":"配置nginx","link":"#配置nginx","children":[]},{"level":2,"title":"其他","slug":"其他","link":"#其他","children":[{"level":3,"title":"写个Bash脚本方便更新","slug":"写个bash脚本方便更新","link":"#写个bash脚本方便更新","children":[]},{"level":3,"title":"处理删除线无法显示的问题","slug":"处理删除线无法显示的问题","link":"#处理删除线无法显示的问题","children":[]}]},{"level":2,"title":"杂谈","slug":"杂谈","link":"#杂谈","children":[]}],"git":{"createdTime":1711122912000,"updatedTime":1711209627000,"contributors":[{"name":"Menghuan","email":"Menghuan2003@outlook.com","commits":2}]},"readingTime":{"minutes":2.03,"words":610},"filePathRelative":"posts/Start_Web.md","localizedDate":"2024年2月29日","excerpt":"<h2>环境</h2>\\n<p>在本地pelican生成静态网页使用的环境是Arch Linux，python的版本为3.11.4(在miniconda创建的虚拟环境中)。</p>\\n<p>云端是阿里云香港的轻量应用服务器，Ubuntu 22.04，由于是静态网页云端直接使用nginx部署了。</p>\\n<h2>Pelican生成静态网页</h2>\\n<p>首先创建一个新的conda虚拟环境(这里偷懒直接用的base环境， <s>反正平时也不用</s> )，再安装相应的包：</p>\\n<p><code>python -m pip install \\"pelican[markdown]\\"</code></p>","autoDesc":true}`);export{x as comp,_ as data};
