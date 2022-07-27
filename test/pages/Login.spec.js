import { mount } from '@vue/test-utils'
import Login from '../../src/pages/Login.vue'
import options from '../utils/pluginInitializer.js'

test('Login', () => {
    const wrapper = mount(Login, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    expect(wrapper.find('#login-forgot').exists()).toBe(true)
    expect(wrapper.find('#login-wrong').exists()).toBe(false)
    expect(wrapper.find('#login-button').exists()).toBe(true)
    expect(wrapper.find('#login-account').exists()).toBe(true)
    expect(wrapper.find('#login-signup').exists()).toBe(true)
    expect(wrapper.find('#login-option').exists()).toBe(true)
})
