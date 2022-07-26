jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import Comic from '../../src/pages/Comic.vue'
import options from '../utils/pluginInitializer.js'

test('Comic', async () => {
    options.plugins.router.push({name: 'Comics', params: {id: 'comic-1'}})
    await options.plugins.router.isReady()
    const wrapper = mount(Comic, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const authStore = useAuthStore()
    authStore.login('', '')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    // console.log('userInstance', authStore.userInstance)
    
    expect(wrapper.find('#title').text()).toBe('hard drive 2000')
    expect(wrapper.find('#categories').text()).toBe('Horror, Scifi')

    await wrapper.find('#favorite-button').trigger('click')
    await flushPromises()
    await flushPromises()
    expect(storeMock.getState(['users', 'user-1', 'favorites'])[0]).toEqual(expect.arrayContaining(['comics', 'comic-1']))
})