import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TokenCounter from '../packages/llm/TokenCounter.vue'

describe('TokenCounter', () => {
  it('should count 0 token for empty text', () => {
    const wrapper = mount(TokenCounter, {
      props: {
        modelValue: ''
      }
    })
    const vm = wrapper.vm
    expect(vm.tokenCount).toBe(0)
  })

  it('should estimate pure chinese correctly', () => {
    // 4 中文字符 ≈ 4 * 1.1 = 4.4 → ceil to 5
    const wrapper = mount(TokenCounter, {
      props: {
        modelValue: '你好世界'
      }
    })
    const vm = wrapper.vm
    expect(vm.tokenCount).toBe(5)
  })

  it('should estimate mixed chinese and english correctly', () => {
    const text = '你好 world'
    // 中文 2 → 2.2 → 3, 英文 5 → 5/4=1.25 → 2 → total ≈ 5
    const wrapper = mount(TokenCounter, {
      props: {
        modelValue: text
      }
    })
    const vm = wrapper.vm
    expect(vm.tokenCount).toBeGreaterThan(3)
    expect(vm.tokenCount).toBeLessThan(10)
  })

  it('should calculate cost correctly', () => {
    // GPT-4 价格是 ¥0.06 / 1K tokens
    // 1000 tokens → ¥0.06
    const wrapper = mount(TokenCounter, {
      props: {
        modelValue: 'x'.repeat(4000), // 4000 字符 → ~1000 tokens (all ascii) → 4000 / 4 = 1000
        defaultModel: 'gpt-4',
        showModelSelector: false
      }
    })
    const vm = wrapper.vm
    expect(vm.estimatedCost).toBeCloseTo(0.06, 2)
  })

  it('should trigger warning when token count exceeds warningLimit', () => {
    // 14000 tokens → 14000 * 4 chars (all ascii) = 56000 chars → 14000 > 13107 (0.8 * 16384)
    const wrapper = mount(TokenCounter, {
      props: {
        modelValue: 'x'.repeat(14000 * 4),
        defaultModel: 'gpt-3.5-turbo'
      }
    })
    const vm = wrapper.vm
    // 14000 * 4 chars → 56000 / 4 = 14000 tokens > 13107
    expect(vm.tokenCount).toBeGreaterThan(vm.warningLimit)
  })
})
