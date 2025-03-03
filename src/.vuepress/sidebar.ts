import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "book",
      prefix: "category/",
      children: [
        "ai",
        "software",
        "linux",
        "website",
      ]
    },
    {
      text: "文件",
      icon: "cloud",
      link: "https://blog.menghuan1918.com/AlistStore/",
    },
    {
      text: "关于我",
      icon: "person-chalkboard",
      link: "intro",
    },
  ],
});
