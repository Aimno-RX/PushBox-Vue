<template>
  <!-- 
    游戏主容器，包含游戏规则、状态信息、地图和控制按钮
    ref="wrapperRef" 用于better-scroll初始化
  -->
  <div class="game-container" ref="wrapperRef">
    <!-- 游戏规则说明区域 -->
    <div class="rules">
      <h3>推箱子游戏规则：</h3>
      <ul>
        <li>用方向键或屏幕按钮移动玩家 (P)</li>
        <li>将所有箱子 (B) 推到目标位置 (G)</li>
        <li>所有箱子都到达目标位置才能通关</li>
        <li>可点击按钮重置关卡或跳到下一关</li>
      </ul>
    </div>

    <!-- 游戏状态信息区域，显示当前关卡、移动次数和剩余目标 -->
    <div class="header">
      <!-- 显示当前关卡和总关卡数 -->
      <div>关卡：{{ levelNumber }}/{{ totalLevels }}</div>
      <!-- 显示玩家已移动的步数 -->
      <div>移动次数：{{ moves }}</div>
      <!-- 显示剩余未完成的目标数量 -->
      <div>剩余目标：{{ remainingGoals }}/{{ totalGoals }}</div>
    </div>

    <!-- 游戏地图区域，使用v-for循环渲染二维地图 -->
    <div class="map" ref="scrollRef">
      <!-- 遍历地图的每一行 -->
      <div v-for="(row, i) in map" :key="i" class="row">
        <!-- 遍历行中的每个单元格 -->
        <span v-for="(cell, j) in row" :key="j" :class="cellClass(cell, i, j)">
          <!-- 根据单元格类型显示相应内容 -->
          {{ displayCell(cell, i, j) }}
        </span>
      </div>
    </div>

    <!-- 控制按钮区域 -->
    <div class="controls">
      <!-- 上方向按钮 -->
      <van-button @click="moveUp">↑</van-button>
      <!-- 左、下、右方向按钮 -->
      <div>
        <van-button @click="moveLeft">←</van-button>
        <van-button @click="moveDown">↓</van-button>
        <van-button @click="moveRight">→</van-button>
      </div>
      <!-- 关卡控制按钮 -->
      <div class="level-controls">
        <!-- 上一关按钮，当关卡数大于1时才可点击 -->
        <van-button type="warning" @click="prevLevel" :disabled="levelNumber <= 1">上一关</van-button>
        <!-- 重置当前关卡按钮 -->
        <van-button type="danger" @click="resetCurrentLevel">重置关卡</van-button>
        <!-- 下一关按钮，当不是最后一关时才可点击 -->
        <van-button type="success" @click="nextLevel" :disabled="levelNumber >= totalLevels">下一关</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入Vue相关API
import { ref, computed, onMounted } from 'vue';
// 导入better-scroll用于实现地图滚动
import BScroll from 'better-scroll';
// 导入游戏状态管理store
import { useGameStore } from '@/store/game';
import { storeToRefs } from 'pinia'; // 新增导入

// 创建DOM引用，用于初始化better-scroll
const wrapperRef = ref(null);
const scrollRef = ref(null);

// 获取Pinia中的游戏状态store
const gameStore = useGameStore();

// 使用 storeToRefs 保持响应性
const { 
  map, 
  player, 
  moves, 
  levelNumber, 
  totalLevels,
  currentLevelIndex,
  gameState
} = storeToRefs(gameStore);

// 方法不需要响应性，直接从 store 获取
const { move, loadLevel, resetLevel } = gameStore;

// 计算剩余目标数量（地图中仍为'G'的单元格数量）
const remainingGoals = computed(() => {
  let count = 0;
  for (let i = 0; i < map.value.length; i++) {
    for (let j = 0; j < map.value[i].length; j++) {
      if (map.value[i][j] === 'G') count++;
    }
  }
  return count;
});

// 计算总目标数量（初始目标点数量）
const totalGoals = computed(() => {
  return gameStore.goals.length;
});

// 组件挂载后执行的初始化操作
onMounted(() => {
  // 初始化better-scroll，使地图区域可滚动
  new BScroll(wrapperRef.value, { scrollX: true, scrollY: true });

  // 手势识别变量
  let startX = 0, startY = 0;
  
  // 触摸开始事件监听
  wrapperRef.value.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  // 触摸结束事件监听
  wrapperRef.value.addEventListener('touchend', e => {
    // 计算触摸位移
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    const minSwipeDistance = 30; // 最小滑动距离，避免误触
    
    // 判断水平滑动
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
      dx > 0 ? move(0, 1) : move(0, -1); // 右滑/左滑
    } 
    // 判断垂直滑动
    else if (Math.abs(dy) > minSwipeDistance) {
      dy > 0 ? move(1, 0) : move(-1, 0); // 下滑/上滑
    }
  });
});

// 方向移动函数
function moveUp() { move(-1, 0); }   // 向上移动
function moveDown() { move(1, 0); }   // 向下移动
function moveLeft() { move(0, -1); }  // 向左移动
function moveRight() { move(0, 1); }  // 向右移动

// 关卡控制函数
function resetCurrentLevel() { 
  if (confirm('确定要重置当前关卡吗？')) {
    resetLevel(); // 调用store中的重置方法
  }
}

function nextLevel() { 
  if (levelNumber.value < totalLevels.value) {
    loadLevel(currentLevelIndex.value + 1); // 加载下一关
  }
}

function prevLevel() {
  if (levelNumber.value > 1) {
    if (confirm('确定要返回上一关吗？当前进度将丢失。')) {
      loadLevel(currentLevelIndex.value - 1); // 加载上一关
    }
  }
}

// 根据单元格类型返回对应的CSS类
function cellClass(cell, i, j) {
  if (i === player.value.x && j === player.value.y) {
    return cell === 'Y' ? 'player-on-goal' : 'player'; // 玩家在目标点上
  }
  if (cell === '#') return 'wall';                      // 墙壁
  if (cell === 'B') return 'box';                      // 箱子
  if (cell === 'X') return 'box-on-goal';              // 箱子在目标点上（新增）
  if (cell === 'G') return 'goal';                     // 目标点
  return 'empty';                                      // 空地
}

// 根据单元格类型返回显示内容
function displayCell(cell, i, j) {
  if (i === player.value.x && j === player.value.y) {
    return cell === 'Y' ? 'P' : 'P'; // 玩家在目标点上也显示P
  }
  if (cell === ' ') return '';       // 空格不显示
  if (cell === 'X') return 'B';      // 箱子在目标点上显示B
  if (cell === 'Y') return 'P';      // 玩家在目标点上显示P
  return cell;                       // 其他单元格显示原字符
}
</script>

<!-- 使用Less预处理器编写样式，scoped确保样式仅作用于当前组件 -->
<style lang="less" scoped>
.game-container {
  max-width: 100%;
  margin: 20px auto;
  padding: 10px;
  
  // 游戏规则样式
  .rules {
    background: #fdf6e3;  // 米黄色背景
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 6px;
    
    h3 {
      margin-bottom: 5px;
      color: #333;
    }
    
    ul {
      padding-left: 20px;
      color: #666;
    }
  }
  
  // 游戏状态信息样式
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: bold;
    background: #f0f0f0;  // 浅灰色背景
    padding: 8px;
    border-radius: 4px;
    flex-wrap: wrap;
    
    > div {
      margin: 2px 5px;
    }
  }
  
  // 游戏地图样式
  .map {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    border: 2px solid #333;  // 黑色边框
    border-radius: 4px;
    overflow: hidden;
    
    .row {
      display: flex;
      
      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #ddd;  // 浅灰色边框
        transition: all 0.2s ease;
        font-weight: bold;
        
        // 玩家样式
        &.player {
          background: #3498db;  // 蓝色
          color: white;
        }
        
        // 玩家在目标点上样式
        &.player-on-goal {
          background: #2196f3;  // 亮蓝色
          color: white;
        }
        
        // 墙壁样式
        &.wall {
          background: #2c3e50;  // 深蓝色
          color: white;
        }
        
        // 箱子样式
        &.box {
          background: #e74c3c;  // 红色
          color: white;
          transition: transform 0.2s;
        }
        
        // 箱子在目标点上样式
        &.box-on-goal {
          background: #ff9800;  // 橙色
          color: white;
          transition: transform 0.2s;
        }
        
        // 目标点样式
        &.goal {
          background: #2ecc71;  // 绿色
          color: white;
        }
        
        // 空地样式
        &.empty {
          background: #ecf0f1;  // 浅灰色
        }
      }
    }
  }
  
  // 控制按钮样式
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    
    button {
      margin: 3px;
      min-width: 60px;
    }
    
    div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    // 关卡控制按钮样式
    .level-controls {
      margin-top: 10px;
      width: 100%;
      justify-content: space-between;
    }
  }
}

// 响应式设计：适配小屏幕设备
@media (max-width: 480px) {
  .game-container {
    // 调整地图单元格大小
    .map .row span {
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }
    
    // 调整按钮大小
    .controls button {
      min-width: 50px;
      padding: 8px 12px;
    }
    
    // 调整状态栏布局
    .header {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>