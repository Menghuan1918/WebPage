import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { hope } from "vuepress-theme-hope";
import { hopeTheme } from "vuepress-theme-hope";
import { getCommentPlugin } from "vuepress-theme-hope";


export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Menghuan1918's Blog",
  description: "Menghuan1918的个人博客",
  theme,
});
