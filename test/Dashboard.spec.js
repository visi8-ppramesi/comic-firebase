import { mount } from '@vue/test-utils'
import Dashboard from '../src/pages/Dashboard.vue'
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

test('Dashboard', () => {
    const wrapper = mount(Dashboard)
    console.log(JSON.stringify(wrapper))
    expect(wrapper.find('#test').exists()).toBe(true)
})