import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "博文",
    icon: "pen-to-square",
    link: "/posts/",
  },
  {
    text:"文件",
    icon:"cloud",
    link: "https://blog.menghuan1918.com/AlistStore",
  },
  {
    text: "关于",
    icon: "info",
    link: "/intro",
  }
]);
