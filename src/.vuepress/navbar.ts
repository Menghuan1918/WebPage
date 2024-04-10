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
    link: "AlistStore/",
  },
  {
    text: "关于",
    icon: "info",
    link: "/intro",
  }
]);
