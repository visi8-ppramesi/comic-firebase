jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import storeMock from '../__mocks__/storeMock.js'
// import { useAuthStore } from '../../src/store/auth.js'
import { getAuthStore } from '../__mocks__/authMock.js'
import Search from '../../src/pages/Search.vue'
import options from '../utils/pluginInitializer.js'

test('Search', async () => {
    // const mockRouter = {
    //     push: jest.fn()
    // }
    const wrapper = mount(Search, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        // mocks: {
        //     $router: mockRouter
        // }
    })
    const promises = [
        wrapper.find('input[name="search"]').setValue('testestest')
    ]

    await Promise.all(promises)

    await wrapper.find('#search-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.find('#search-query-title').exists()).toBe(true)
    expect(wrapper.find('#search-query-not-found').exists()).toBe(false)
})

