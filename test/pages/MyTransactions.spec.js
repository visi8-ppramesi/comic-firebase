import { mount } from '@vue/test-utils'
import MyTransactions from '../../src/pages/MyTransactions.vue'
import options from '../utils/pluginInitializer.js'

test('MyTransactions', () => {
    const wrapper = mount(MyTransactions, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    expect(wrapper.find('#my-transactions-title').exists()).toBe(true)
    expect(wrapper.find('#my-transactions-id').exists()).toBe(true)
    expect(wrapper.find('#my-transactions-name').exists()).toBe(true)
    expect(wrapper.find('#my-transactions-description').exists()).toBe(true)
    expect(wrapper.find('#my-transactions-price').exists()).toBe(true)
    expect(wrapper.find('#my-transactions-currency').exists()).toBe(true)
    expect(wrapper.find('#my-transactions-payment').exists()).toBe(true)
    expect(wrapper.find('#my-transactions-transaction').exists()).toBe(true)
})
