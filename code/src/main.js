import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import 'amfe-flexible'
import { Tabbar, TabbarItem } from 'vant';
import 'vant/lib/index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {  Form,Field, CellGroup } from 'vant';
import { Search } from 'vant';
import { Cell } from 'vant';
import { Image as VanImage } from 'vant';
import Cookies from 'js-cookie';
import VueCookies from 'vue-cookies'
import { FloatingBubble } from 'vant';
import { Pagination } from 'vant';
import { Divider } from 'vant';
import { Button } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import{reactive} from 'vue'
import { Notify } from 'vant';
import './assets/css/iconfont.css'

const app = createApp(App);
app.use(Notify);
app.use(Form);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(reactive);
app.use(Button);
app.use(Divider);
app.use(Pagination);
app.use(FloatingBubble);
app.use(VueCookies)
app.config.globalProperties.$cookies = VueCookies
app.use(Cell);
app.use(CellGroup);
app.use(ElementPlus)
app.use(router);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Field);
app.use(Search);
app.use(VanImage);
app.mount('#app')