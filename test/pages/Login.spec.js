jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import storeMock from '../__mocks__/storeMock.js'
// import { useAuthStore } from '../../src/store/auth.js'
import { getAuthStore } from '../__mocks__/authMock.js'
import Login from '../../src/pages/Login.vue'
import options from '../utils/pluginInitializer.js'

test('Login', async () => {
    const mockRouter = {
        push: jest.fn()
    }
    const wrapper = mount(Login, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        mocks: {
            $router: mockRouter
        }
    })
    const promises = [
        wrapper.find('input[name="email"]').setValue('email@email.com'),
        wrapper.find('input[name="password"]').setValue('password')
    ]

    await Promise.all(promises)

    await wrapper.find('#login-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(getAuthStore().getState(['currentUser', 'email'])).toEqual('email@email.com')
    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password')
})

