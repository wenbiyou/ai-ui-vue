<template>
  <div class="ai-message" :class="`ai-message--${role}`">
    <div class="ai-message__avatar" v-if="showAvatar">
      <slot name="avatar">
        <span class="ai-message__avatar-default">{{ role === 'user' ? '👤' : '🤖' }}</span>
      </slot>
    </div>
    <div class="ai-message__content-wrapper">
      <div class="ai-message__content">
        <slot v-if="!content">{{ defaultMessage }}</slot>
        <AiMarkdown v-else :content="content" />
      </div>
      <div v-if="showTimestamp" class="ai-message__timestamp">
        {{ formattedTime }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AiMarkdown from '../markdown/AiMarkdown.vue'

export interface AiMessageProps {
  role?: 'user' | 'assistant' | 'system'
  content?: string
  showAvatar?: boolean
  showTimestamp?: boolean
  timestamp?: Date | string
}

const props = withDefaults(defineProps<AiMessageProps>(), {
  role: 'assistant',
  showAvatar: true,
  showTimestamp: false
})

const defaultMessage = computed(() => {
  if (props.role === 'user') return 'User message'
  if (props.role === 'system') return 'System message'
  return 'Assistant message'
})

const formattedTime = computed(() => {
  if (!props.timestamp) return ''
  const date = new Date(props.timestamp)
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<style scoped>
.ai-message {
  display: flex;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
}

.ai-message--user {
  flex-direction: row-reverse;
}

.ai-message--user .ai-message__content-wrapper {
  align-items: flex-end;
}

.ai-message--assistant {
  flex-direction: row;
}

.ai-message__avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--ai-avatar-bg, #f3f4f6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-message__avatar-default {
  font-size: 18px;
}

.ai-message__content-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.ai-message--user .ai-message__content-wrapper {
  align-items: flex-end;
}

.ai-message__content {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

.ai-message--user .ai-message__content {
  background: var(--ai-primary-color, #6366f1);
  color: white;
  border-bottom-right-radius: 4px;
}

.ai-message--assistant .ai-message__content {
  background: var(--ai-bg-secondary, #f9fafb);
  color: var(--ai-text-color, #1f2937);
  border-bottom-left-radius: 4px;
}

.ai-message__timestamp {
  font-size: 11px;
  color: var(--ai-text-secondary, #9ca3af);
  margin-top: 4px;
}

.ai-message--user .ai-message__timestamp {
  text-align: right;
}
</style>
