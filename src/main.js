import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';// 用Pinia实现全局状态管理，存储游戏数据(地图、玩家位置、关卡信息等)
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Vant); // 提供按钮等UI组件，实现游戏界面交互
app.mount('#app');
