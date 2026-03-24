import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SmartForm from '../packages/form/SmartForm.vue'
import type { SmartFormField } from '../packages/form/SmartForm.vue'

describe('SmartForm', () => {
  it('should render fields correctly', () => {
    const fields: SmartFormField[] = [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'bio', label: 'Bio', type: 'textarea' }
    ]
    const wrapper = mount(SmartForm, {
      props: {
        modelValue: {},
        fields
      }
    })
    expect(wrapper.findAll('.smart-form__field')).toHaveLength(2)
    expect(wrapper.find('label').text()).toContain('Name')
  })

  it('should validate required fields', async () => {
    const fields: SmartFormField[] = [
      { key: 'name', label: 'Name', type: 'text', required: true }
    ]
    const wrapper = mount(SmartForm, {
      props: {
        modelValue: { name: '' },
        fields
      }
    })
    const form = wrapper.vm
    const isValid = form.validate()
    expect(isValid).toBe(false)
  })

  it('should pass validation when required field has value', async () => {
    const fields: SmartFormField[] = [
      { key: 'name', label: 'Name', type: 'text', required: true }
    ]
    const wrapper = mount(SmartForm, {
      props: {
        modelValue: { name: 'test' },
        fields
      }
    })
    const form = wrapper.vm
    const isValid = form.validate()
    expect(isValid).toBe(true)
    expect(wrapper.find('.smart-form__error').exists()).toBe(false)
  })

  it('should emit ai-complete when AI button clicked', async () => {
    const fields: SmartFormField[] = [
      { key: 'name', label: 'Name', type: 'text', required: true, aiEnabled: true }
    ]
    const wrapper = mount(SmartForm, {
      props: {
        modelValue: { name: '' },
        fields
      }
    })
    const aiBtn = wrapper.find('.smart-form__ai-btn')
    await aiBtn.trigger('click')
    expect(wrapper.emitted('ai-complete')).toBeTruthy()
    expect(wrapper.emitted('ai-complete')![0][0]).toBe('name')
  })

  it('should update modelValue when input changes', async () => {
    const fields: SmartFormField[] = [
      { key: 'name', label: 'Name', type: 'text' }
    ]
    const wrapper = mount(SmartForm, {
      props: {
        modelValue: { name: '' },
        fields
      }
    })
    const input = wrapper.find('input')
    await input.setValue('hello')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0][0]).toEqual({ name: 'hello' })
  })
})
