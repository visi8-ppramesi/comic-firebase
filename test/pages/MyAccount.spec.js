jest.useFakeTimers()
import { mount, flushPromises } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import { getAuthStore } from '../__mocks__/authMock.js'
import storeMock from '../__mocks__/storeMock.js'
import MyAccount from '../../src/pages/MyAccount.vue'
import options from '../utils/pluginInitializer.js'

test('MyAccount-save profile', async () => {
    const wrapper = mount(MyAccount, {
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

    const promises = [
        wrapper.find('#username').setValue('newname'),
        wrapper.find('#email').setValue('newemail@email.com'),
        wrapper.find('#full-name').setValue('newfull newname'),
    ]

    await Promise.all(promises)

    await wrapper.find('#save-profile-button').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(getAuthStore().getState(['currentUser', 'email'])).toEqual('newemail@email.com')
    expect(storeMock.getState(['users', 'user-1', 'name'])).toEqual('newname')
    expect(storeMock.getState(['users', 'user-1', 'full_name'])).toEqual('newfull newname')
    expect(storeMock.getState(['users', 'user-1', 'email'])).toEqual('newemail@email.com')
})

test('MyAccount-save password', async () => {
    const wrapper = mount(MyAccount, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    const authStore = useAuthStore()
    authStore.login('email@email.com', 'password')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const promises = [
        wrapper.find('#old-password').setValue('password'),
        wrapper.find('#new-password').setValue('password2'),
        wrapper.find('#confirm-password').setValue('password2'),
    ]

    await Promise.all(promises)

    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password')
    await wrapper.find('#save-password-button').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(getAuthStore().getState(['currentUser', 'password'])).toEqual('password2')
})
