import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiInput from '../packages/core/AiInput.vue'

describe('AiInput', () => {
  it('renders correctly', () => {
    const wrapper = mount(AiInput)
    expect(wrapper.find('.ai-input').exists()).toBe(true)
    expect(wrapper.find('.ai-input__textarea').exists()).toBe(true)
  })

  it('emits update:modelValue when typing', async () => {
    const wrapper = mount(AiInput)
    const textarea = wrapper.find('.ai-input__textarea')
    
    await textarea.setValue('test message')
    await textarea.trigger('input')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test message'])
  })

  it('emits submit on Enter (without Shift)', async () => {
    const wrapper = mount(AiInput)
    const textarea = wrapper.find('.ai-input__textarea')
    
    await textarea.trigger('keydown', { key: 'Enter', shiftKey: false })
    
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('does not emit submit on Shift+Enter', async () => {
    const wrapper = mount(AiInput)
    const textarea = wrapper.find('.ai-input__textarea')
    
    await textarea.trigger('keydown', { key: 'Enter', shiftKey: true })
    
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('emits cancel on Escape', async () => {
    const wrapper = mount(AiInput)
    const textarea = wrapper.find('.ai-input__textarea')
    
    await textarea.trigger('keydown', { key: 'Escape' })
    
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('displays character count when showCharCount is true', () => {
    const wrapper = mount(AiInput, {
      props: { modelValue: 'test', maxlength: 100, showCharCount: true }
    })
    
    expect(wrapper.find('.ai-input__char-count').text()).toBe('4 / 100')
  })

  it('respects disabled prop', () => {
    const wrapper = mount(AiInput, {
      props: { disabled: true }
    })
    
    const textarea = wrapper.find('.ai-input__textarea') as any
    expect(textarea.element.disabled).toBe(true)
  })

  it('respects maxlength prop', () => {
    const wrapper = mount(AiInput, {
      props: { maxlength: 10 }
    })
    
    const textarea = wrapper.find('.ai-input__textarea') as any
    expect(textarea.element.maxLength).toBe(10)
  })
})
