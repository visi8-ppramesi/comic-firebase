jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import Comics from '../../src/pages/Comics.vue'
import options from '../utils/pluginInitializer.js'

test('Comics', async () => {
    const wrapper = mount(Comics, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const titles = Object.values(storeMock.getState(['comics'])).map(item => item.title)

    expect(wrapper.findAll('.grid-item').map(item => item.text())).toEqual(expect.arrayContaining(titles))
})