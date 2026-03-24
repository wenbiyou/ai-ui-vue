<template>   <div class="example-page">
    <h1>AiLoader 示例</h1>

    <!-- typing 效果 -->
    <section class="example-section">
      <h2>打字机效果（typing）</h2>
      <p>AI 思考时常用的效果</p>
      <div class="example-demo">
        <AiLoader type="typing" text="AI 正在思考..." />
      </div>
      <pre><code>&lt;AiLoader type="typing" text="AI 正在思考..." /&gt;</code></pre>
    </section>

    <!-- dots 效果 -->
    <section class="example-section">
      <h2>圆点效果（dots）</h2>
      <p>数据加载时使用</p>
      <div class="example-demo">
        <AiLoader type="dots" text="加载中..." />
      </div>
      <pre><code>&lt;AiLoader type="dots" text="加载中..." /&gt;</code></pre>
    </section>

    <!-- spinner 效果 -->
    <section class="example-section">
      <h2>旋转效果（spinner）</h2>
      <p>适用于不同场景的加载动画</p>
      <div class="example-demo">
        <AiLoader type="spinner" text="处理中..." />
      </div>
      <pre><code>&lt;AiLoader type="spinner" text="处理中..." /&gt;</code></pre>
    </section>

    <!-- 不显示文本 -->
    <section class="example-section">
      <h2>不显示文本</h2>
      <p>只显示加载动画</p>
      <div class="example-demo">
        <AiLoader type="typing" />
      </div>
      <pre><code>&lt;AiLoader type="typing" /&gt;</code></pre>
    </section>

    <!-- 尺寸调整 -->
    <section class="example-section">
      <h2>尺寸调整</h2>
      <p>通过 size 属性控制大小</p>
      <div class="example-demo">
        <div style="display: flex; gap: 20px; align-items: center;">
          <div>
            <h4>小号</h4>
            <AiLoader type="typing" size="small" text="Small" />
          </div>
          <div>
            <h4>中号（默认）</h4>
            <AiLoader type="typing" size="medium" text="Medium" />
          </div>
          <div>
            <h4>大号</h4>
            <AiLoader type="typing" size="large" text="Large" />
          </div>
        </div>
      </div>
      <pre><code>&lt;AiLoader type="typing" size="small" /&gt;
&lt;AiLoader type="typing" size="large" /&gt;</code></pre>
    </section>

    <!-- 实际使用场景 -->
    <section class="example-section">
      <h2>实际使用场景</h2>
      <div class="example-demo">
        <div class="chat-demo">
          <div class="chat-message user">
            用户：请帮我写一个快速排序算法
          </div>
          <div class="chat-message assistant">
            <div class="chat-bubble">
              好的，这是快速排序的 Python 实现：
              <pre>def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)</pre>
            </div>
          </div>
          <div class="loader-demo">
            <AiLoader type="typing" text="AI 正在生成..." />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AiLoader from './AiLoader.vue'
</script>

<style scoped>
.example-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.example-section {
  margin-bottom: 40px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.example-section h2 {
  margin-top: 0;
  color: #1f2937;
  font-size: 20px;
  margin-bottom: 12px;
}

.example-section p {
  color: #6b7280;
  margin-bottom: 16px;
}

.example-demo {
  margin: 20px 0;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}

.example-code pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
}

.example-code code {
  font-family: 'Courier New', monospace;
}

.example-demo h4 {
  margin: 0 0 8px 0;
  color: #6b7280;
  font-size: 14px;
}

.chat-demo {
  max-width: 600px;
}

.chat-message {
  margin-bottom: 16px;
}

.chat-message.user {
  text-align: right;
  color: #6b7280;
}

.chat-message.assistant {
  text-align: left;
}

.chat-bubble {
  padding: 12px 16px;
  border-radius: 12px;
  background: #f9fafb;
  display: inline-block;
  text-align: left;
}

.chat-bubble pre {
  margin: 0;
  overflow-x: auto;
}

.loader-demo {
  margin-top: 8px;
}
</style>
