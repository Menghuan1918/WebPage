import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Menghuan1918's Blog",
      description: "Menghuan1918的个人博客",
    },
    "/en/": {
      lang: "en-US",
      title: "Menghuan1918's Blog",
      description: "Menghuan1918's personal blog",
    },
  },
  theme,
});