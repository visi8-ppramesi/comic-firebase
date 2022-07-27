import { mount } from '@vue/test-utils'
import Register from '../../src/pages/Register.vue'
import options from '../utils/pluginInitializer.js'

test('Register', () => {
    const wrapper = mount(Register, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    expect(wrapper.find('#register-failed').exists()).toBe(false)
    expect(wrapper.find('#register-button').exists()).toBe(true)
    expect(wrapper.find('#register-goback').exists()).toBe(true)
})
