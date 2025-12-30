import { hopeTheme } from "vuepress-theme-hope";
import { MR_HOPE_AVATAR } from "./logo.js";
import { cut } from "nodejs-jieba";

export default hopeTheme({
  hostname: "https://blog.menghuan1918.com",

  author: {
    name: "Menghuan1918",
    url: "https://blog.menghuan1918.com",
  },
  license: "CC BY-NC-SA 4.0",
  logo: "/favicon.ico",

  repo: "Menghuan1918/WebPage",

  docsDir: "src",

  // 页脚
  displayFooter: true,
  // 不显示git的名字
  contributors: false,

  // 博客相关
  blog: {
    description: "Backend & AI Developer<br>于信息洪流中，寻找下一个奇点的信号",
    intro: "/intro",
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
    icon: {
      assets: "fontawesome-with-brands",
    },
    blog: true,
    feed: true,

    slimsearch: {
      // 索引全部内容
      indexContent: true,
      indexOptions: {
        // 使用 nodejs-jieba 进行分词
        tokenize: (text:any, fieldName:any) =>
          fieldName === 'id' ? [text] : cut(text, true),
      },
    },
    // 在启用之前需要安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务器，在生产环境中请自行部署并使用自己的服务器！
    comment: {
      provider: "Giscus",
      repo: "Menghuan1918/WebPage",
      repoId: "R_kgDOLcYFwA",
      category: "Announcements",
      categoryId: "DIC_kwDOLcYFwM4Cdwpr",
    },
    components: {
      components: ["Badge", "VPCard", "VidStack", "SiteInfo"],
    },
  },
  markdown: {
    figure: true,
    imgLazyload: true,
    imgMark: true,
    imgSize: true,
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
    flowchart: true,
    alert: true,
    tabs: true,
    codeTabs: true,
    math: {
      type: "katex",
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
      blog: {
        description: "Backend & AI Developer",
        intro: "/en/intro",
      },
      footer: "Unless otherwise stated, all posts on this blog are licensed under CC BY-NC-SA 4.0 Licence.",
    }
  }
});
