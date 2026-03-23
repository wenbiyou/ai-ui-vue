<template>
  <div class="ai-loader" :class="`ai-loader--${type}`">
    <div v-if="type === 'dots'" class="ai-loader__dots">
      <span class="ai-loader__dot" :style="{ '--delay': '0s' }"></span>
      <span class="ai-loader__dot" :style="{ '--delay': '0.2s' }"></span>
      <span class="ai-loader__dot" :style="{ '--delay': '0.4s' }"></span>
    </div>
    <div v-else-if="type === 'spinner'" class="ai-loader__spinner">
      <div class="ai-loader__spinner-blade" v-for="i in 12" :style="{ '--delay': `${i * 0.1}s` }"></div>
    </div>
    <div v-else-if="type === 'typing'" class="ai-loader__typing">
      <span class="ai-loader__typing-dot" v-for="i in 3" :style="{ '--delay': `${i * 0.16}s` }"></span>
    </div>
    <div v-if="text" class="ai-loader__text">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * AiLoader 组件 Props 定义
 * @description 加载状态组件，提供三种不同的加载动画，适合 AI 对话场景
 */
export interface AiLoaderProps {
  /**
   * 加载动画类型
   * - typing: 打字机三点跳动，推荐用于 AI 思考/生成中
   * - dots: 三点上下跳动，简洁轻量
   * - spinner: 旋转加载，传统样式
   */
  type?: 'dots' | 'spinner' | 'typing'
  /** 加载提示文本，可选 */
  text?: string
  /** 组件尺寸 */
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<AiLoaderProps>(), {
  type: 'typing',
  size: 'medium'
})
</script>

<style scoped>
.ai-loader {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.ai-loader--small { transform: scale(0.75); }
.ai-loader--large { transform: scale(1.25); }

/* Dots */
.ai-loader__dots {
  display: flex;
  gap: 4px;
}

.ai-loader__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ai-primary-color, #6366f1);
  animation: ai-loader-bounce 1.4s infinite ease-in-out;
  animation-delay: var(--delay);
}

@keyframes ai-loader-bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Spinner */
.ai-loader__spinner {
  position: relative;
  width: 32px;
  height: 32px;
}

.ai-loader__spinner-blade {
  position: absolute;
  width: 3px;
  height: 8px;
  background: var(--ai-primary-color, #6366f1);
  left: 50%;
  top: 0;
  transform-origin: center 16px;
  border-radius: 2px;
  animation: ai-loader-spinner 1.2s linear infinite;
  animation-delay: var(--delay);
}

@keyframes ai-loader-spinner {
  0% { transform: rotate(0deg); opacity: 1; }
  100% { transform: rotate(360deg); opacity: 0.15; }
}

/* Typing */
.ai-loader__typing {
  display: flex;
  gap: 3px;
}

.ai-loader__typing-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--ai-text-secondary, #9ca3af);
  animation: ai-loader-typing 1.4s infinite ease-in-out;
  animation-delay: var(--delay);
}

@keyframes ai-loader-typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

.ai-loader__text {
  font-size: 13px;
  color: var(--ai-text-secondary, #6b7280);
}
</style>
