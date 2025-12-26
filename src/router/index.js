import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Game from '@/views/Game.vue';

// 路由配置功能：根据URL路径动态渲染对应的视图组件（首页和游戏页面）
const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
