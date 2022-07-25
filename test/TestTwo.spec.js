import { mount } from '@vue/test-utils'
import TestTwo from '../src/pages/TestTwo.vue'
// import { createTestingPinia } from '@pinia/testing'

test('TestTwo', () => {
    const wrapper = mount(TestTwo)
    expect(wrapper.find('#test').exists()).toBe(true)
})