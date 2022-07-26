import { flushPromises, mount } from '@vue/test-utils'
import Dashboard from '../../src/pages/Dashboard.vue'
import options from '../utils/pluginInitializer.js'
// import { createTestingPinia } from '@pinia/testing'
const i18Texts = {
    messages: {
        en: {
            title1: 'All Comics',
            title2: 'Adventure',
            title3: 'Science Fiction',
            show: 'Show More',
            authors: 'Authors',
        },
        id: {
            title1: 'Semua Komik',
            title2: 'Petualangan',
            title3: 'Fiksi Ilmiah',
            show: 'Lihat Lebih Banyak',
            authors: 'Penulis',
        }
    }
}

test('Dashboard', async () => {
    const wrapper = mount(Dashboard, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    
    expect(wrapper.find('#banner').exists()).toBe(true)
    expect(wrapper.find('#async-banner').exists()).toBe(true)
})