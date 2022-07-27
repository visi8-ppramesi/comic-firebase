jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import storeMock from '../__mocks__/storeMock.js'
import Authors from '../../src/pages/Authors.vue'
import options from '../utils/pluginInitializer.js'

test('Authors', async () => {
    const wrapper = mount(Authors, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const titles = Object.values(storeMock.getState(['authors'])).map(item => item.name)

    expect(wrapper.findAll('.grid-item').map(item => item.text())).toEqual(expect.arrayContaining(titles))
    expect(wrapper.find('#authors-sort').exists()).toBe(true)
    expect(wrapper.find('#authors-select').exists()).toBe(true)
})
