import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StreamChart from '../packages/chart/StreamChart.vue'

describe('StreamChart', () => {
  // Canvas requires canvas package for jsdom, skip full rendering.
  // We only test type exports and component creation.
  it('should create component correctly', () => {
    const wrapper = mount(StreamChart, {
      props: {
        data: []
      }
    })
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('should expose required methods', () => {
    const wrapper = mount(StreamChart, {
      props: {
        data: []
      }
    })
    const vm = wrapper.vm
    expect(typeof vm.addPoint).toBe('function')
    expect(typeof vm.clear).toBe('function')
  })
})
