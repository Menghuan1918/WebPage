import { hopeTheme } from "vuepress-theme-hope";
import { MR_HOPE_AVATAR } from "./logo.js";

export default hopeTheme({
  hostname: "https://blog.menghuan1918.com",

  author: {
    name: "Menghuan1918",
    url: "https://blog.menghuan1918.com",
  },
  license: "CC BY-NC-SA 4.0",
  iconAssets: "fontawesome-with-brands",

  logo: "/favicon.ico",

  repo: "Menghuan1918/WebPage",

  docsDir: "src",

  // 页脚
  displayFooter: true,

  // 博客相关
  blog: {
    description: "开源爱好者",
    intro: "/intro.html",
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      Email: "mailto:menghuan@menghuan1918.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/Menghuan1918",
      // Gitlab: "https://example.com",
      // Gmail: "mailto:info@example.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      Rss: "https://blog.menghuan1918.com/rss.xml",
      Steam: "https://steamcommunity.com/profiles/76561199019534980/",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
      // MrHope: ["https://mister-hope.com", MR_HOPE_AVATAR],
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    feed: true,
    // 在启用之前需要安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务器，在生产环境中请自行部署并使用自己的服务器！
    comment: {
      provider: "Giscus",
      repo: "Menghuan1918/WebPage",
      repoId: "R_kgDOLcYFwA",
      category: "Announcements",
      categoryId: "DIC_kwDOLcYFwM4Cdwpr",
    },

    revealjs: {
      plugins: ["highlight", "math", "search", "notes", "zoom"],
      themes: [
        'auto',
        'beige',
        'black',
        'blood',
        'league',
        'moon',
        'night',
        'serif',
        'simple',
        'sky',
        'solarized',
        'white',
      ],
    },
    markdownMath: {
      type: "katex",
    },
    components: {
      components: ["Badge", "VPCard", "VidStack", "SiteInfo"],
    },
    markdownImage: {
      figure: true,
      lazyload: true,
      mark: true,
      size: true,
    },
    markdownHint: {
      // 启用 GFM 警告
      alert: true,
    },
    markdownTab: {
      tabs: true,
      codeTabs: true,
    },
    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,


      // 在启用之前安装 mathjax-full
      // mathjax: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js


      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
  locales: {
    "/": {
      navbar: [
        "/",
        {
          text: "博文",
          icon: "pen-to-square",
          link: "/posts/",
        },
        {
          text: "文件",
          icon: "cloud",
          link: "https://blog.menghuan1918.com/AlistStore",
        },
        {
          text: "状态",
          icon: "chart-column",
          link: "https://status.menghuan1918.com/status/menghuan1918",
        },
        {
          text: "友链",
          icon: "link",
          link: "links",
        },
        {
          text: "关于",
          icon: "info",
          link: "/intro",
        }
      ],
      sidebar: {
        "/": [
          "",
          {
            text: "文章",
            icon: "book",
            prefix: "category/",
            children: [
              "ai/",
              "software/",
              "linux/",
              "website/",
            ]
          },
          {
            text: "文件",
            icon: "cloud",
            link: "https://blog.menghuan1918.com/AlistStore/",
          },
          {
            text: "状态",
            icon: "chart-column",
            link: "https://status.menghuan1918.com/status/menghuan1918",
          },
          {
            text: "友链",
            icon: "link",
            link: "links",
          },
          {
            text: "关于我",
            icon: "person-chalkboard",
            link: "intro",
          },
        ],
      },
      footer: "除非另有声明，本博客所有文章采用 知识共享署名-非商业性使用-相同方式共享4.0协议 进行许可",
    },
    "/en/": {
      navbar: [
        "/en/",
        {
          text: "Posts",
          icon: "pen-to-square",
          link: "/en/posts/",
        },
        {
          text: "Files",
          icon: "cloud",
          link: "https://blog.menghuan1918.com/AlistStore",
        },
        {
          text: "Status",
          icon: "chart-column",
          link: "https://status.menghuan1918.com/status/menghuan1918",
        },
        {
          text: "About",
          icon: "info",
          link: "/en/intro",
        }
      ],
      sidebar: {
        "/en/": [
          "",
          {
            text: "Posts",
            icon: "book",
            prefix: "posts/",
            children: "structure",
          },
          {
            text: "Files",
            icon: "cloud",
            link: "https://blog.menghuan1918.com/AlistStore/",
          },
          {
            text: "Status",
            icon: "chart-column",
            link: "https://status.menghuan1918.com/status/menghuan1918",
          },
          {
            text: "About me",
            icon: "person-chalkboard",
            link: "intro",
          },
        ],
      },
      footer: "Unless otherwise stated, all posts on this blog are licensed under CC BY-NC-SA 4.0 Licence.",
    }
  }
});
