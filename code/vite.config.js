import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postCssPxToRem from "postcss-pxtorem";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
// 引入@vitejs/plugin-legacy
import legacy from '@vitejs/plugin-legacy';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  base:'./',
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          //自动添加客户端前缀
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
          ],
        }),
        postCssPxToRem({
          //pxtorem
          rootValue: 37.5, //根节点的font-size值的大小
          propList: ["*"], //需要转换的属性,全部都进行转换
          selectorBlackList: ["norem"], //过滤到no-rem开头的class,不进行rem转换
        }),
      ],
    },
  },
});
