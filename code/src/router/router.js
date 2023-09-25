//管理当前项目所有页面的路由
//安装路由：vue-router
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Mine from "../views/Mine.vue";
import CatGPT from "../views/CatGPT.vue";
import ReadArticle from "../views/ReadArticle.vue";
import AddArticle from "../views/AddArticle.vue"
import EditArticle from "../views/EditArticle.vue"
import { createWebHashHistory } from 'vue-router'

//创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  //定义所有路径的路径
  routes: [
    {
      path: "/editarticle", //页面对应路由的路径
      component: EditArticle, //路径对应的组件
    },
    {
      path: "/addarticle", //页面对应路由的路径
      component: AddArticle, //路径对应的组件
    },
    {
      path: "/home", //页面对应路由的路径
      component: Home, //路径对应的组件
    },
    
    {
      path: "/readarticle", //页面对应路由的路径
      component: ReadArticle, //路径对应的组件
    },

    {
      path: "/catgpt", //页面对应路由的路径
      component: CatGPT, //路径对应的组件
    },
    {
      path: "/mine", //页面对应路由的路径
      component: Mine, //路径对应的组件
    },
  ],
});
export default router;
