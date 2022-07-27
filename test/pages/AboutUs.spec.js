import { mount } from '@vue/test-utils'
import AboutUs from '../../src/pages/AboutUs.vue'
import options from '../utils/pluginInitializer.js'

test('About Us', () => {
    const wrapper = mount(AboutUs, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    expect(wrapper.find('#about-us-description').exists()).toBe(true)
})