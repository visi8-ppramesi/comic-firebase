import { mount } from '@vue/test-utils'
import MyComics from '../../src/pages/MyComics.vue'
import options from '../utils/pluginInitializer.js'

test('MyComics', () => {
    const wrapper = mount(MyComics, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    expect(wrapper.find('#my-comics-title').exists()).toBe(true)
    expect(wrapper.find({ ref: 'chapter' }).exists())
    expect(wrapper.find({ ref: 'load' }).exists())
})
