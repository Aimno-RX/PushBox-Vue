# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
# 推箱子游戏

一个基于 **Vue 3** 的经典推箱子游戏实现，包含 10 个精心设计的关卡，支持键盘和触摸操作，适配桌面和移动设备。

---

## 🌟 项目特点
- **10 个难度递增的关卡**：从简单教学到高难度挑战，满足不同水平玩家需求  
- **多平台支持**：支持键盘方向键和触摸屏手势操作  
- **实时状态显示**：显示当前关卡、移动次数和剩余目标数量  
- **游戏控制功能**：提供重置关卡、上一关、下一关等便捷操作  
- **响应式设计**：适配各种屏幕尺寸，移动设备体验优化  
- **直观的游戏界面**：清晰的视觉区分墙壁、箱子、目标点和玩家  

---

## 🛠 技术栈
- **Vue 3.5.24** - 核心框架  
- **Pinia** - 状态管理  
- **Vant** - UI 组件库  
- **Vue Router** - 路由管理  
- **Vite** - 构建工具  
- **Better-scroll** - 地图滚动支持  
- **Less** - CSS 预处理器  

---

## 🚀 运行项目

### 安装依赖
```bash
npm install

### 启动开发服务器
npm run dev

### 打开浏览器访问
http://localhost:5173

### 构建生产版本
npm run build

---

## 🎮 游戏玩法

### 目标
将所有箱子 (B) 推到目标位置 (G)

### 操作方式
- **键盘**：使用方向键移动玩家  
- **触摸屏**：上下左右滑动控制角色移动  
- **屏幕按钮**：点击方向按钮移动  

### 规则
- 玩家 (P) 只能推动一个箱子，不能拉动  
- 箱子不能被推到墙壁或另一个箱子后面  
- 所有箱子都到达目标位置才能通关  

### 控制功能
- **重置关卡**：重置当前关卡到初始状态  
- **上一关 / 下一关**：切换关卡  
- **移动次数**：记录当前关卡的步数  
- **剩余目标**：显示还需要移动到目标位置的箱子数量  

---

## 🖼 界面预览
游戏界面分为四个主要区域：

1. **规则说明区**：显示游戏基本规则  
2. **状态信息区**：显示当前关卡、移动次数和剩余目标  
3. **游戏地图区**：显示游戏地图，不同元素有不同颜色标识  
4. **控制按钮区**：提供方向控制和关卡管理按钮
