<template>
  <!-- 
    主页面模板结构
    这是一个简单的游戏主页，用于展示游戏标题和开始按钮
  -->
  <div class="home-container">
    <!-- 
      使用 Vant UI 库的按钮组件
      type="primary" 表示使用主要颜色（蓝色）样式
      @click="goGame" 绑定点击事件，触发页面跳转
    -->
    <van-button type="primary" @click="goGame">开始推箱子游戏</van-button>
  </div>
</template>

<script setup>
// 导入 Vue Router 的 useRouter 钩子函数
// useRouter 用于获取路由实例，实现编程式导航
import { useRouter } from 'vue-router';

// 创建路由实例，用于处理页面跳转逻辑
const router = useRouter();

/**
 * 页面跳转函数
 * 当用户点击"开始推箱子游戏"按钮时触发
 * 使用 router.push 方法将用户导航到游戏页面
 * 
 * @function goGame
 * @returns {void} 无返回值
 */
function goGame() {
  // 跳转到游戏页面（/game 路由）
  // router.push 是 Vue Router 提供的编程式导航方法
  router.push('/game');
}
</script>

<style scoped>
/* 
  作用域样式（仅应用于当前组件）
  scoped 属性确保样式不会影响其他组件
*/
.home-container {
  /* 使用 Flex 布局 */
  display: flex;
  
  /* 水平居中内容 */
  justify-content: center;
  
  /* 垂直居中内容 */
  align-items: center;
  
  /* 设置容器高度为视口高度的 100%，使内容在屏幕中央 */
  height: 100vh;
}
</style>