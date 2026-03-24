import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiChat from '../packages/chat/AiChat.vue'
import type { ChatMessage } from '../packages/chat/AiChat.vue'

describe('AiChat', () => {
  it('should render empty messages correctly', () => {
    const wrapper = mount(AiChat, {
      props: {
        modelValue: []
      }
    })
    expect(wrapper.find('.ai-chat').exists()).toBe(true)
    expect(wrapper.findAll('.ai-chat__message-item')).toHaveLength(0)
  })

  it('should render messages correctly', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: 'Hello AI', timestamp: new Date() },
      { role: 'assistant', content: 'Hello user', timestamp: new Date() }
    ]
    const wrapper = mount(AiChat, {
      props: {
        modelValue: messages
      }
    })
    expect(wrapper.findAll('.ai-chat__message-item')).toHaveLength(2)
  })

  it('should emit submit event when user sends message', async () => {
    const wrapper = mount(AiChat, {
      props: {
        modelValue: []
      }
    })
    // Find the textarea/input (inside AiInput)
    const input = wrapper.find('input, textarea')
    await input.setValue('test message')
    const sendBtn = wrapper.find('.ai-chat__send-btn')
    await sendBtn.trigger('click')
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')![0][0]).toBe('test message')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('should disable input when loading is true', () => {
    const wrapper = mount(AiChat, {
      props: {
        modelValue: [],
        loading: true
      }
    })
    const sendBtn = wrapper.find('.ai-chat__send-btn')
    expect((sendBtn.element as HTMLButtonElement).disabled).toBe(true)
  })
})
