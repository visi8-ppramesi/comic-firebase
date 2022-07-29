jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import Chapter from '../../src/pages/Chapter.vue'
import options from '../utils/pluginInitializer.js'

beforeEach(() => {
    // create teleport target
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)
})

afterEach(() => {
    // clean up
    document.body.outerHTML = ''
})

test('Chapter', async () => {
    options.plugins.router.push({ name: 'Chapter', params: { comicId: 'comic-1', chapterId: 'chapter-1' } })
    await options.plugins.router.isReady()

    const wrapper = mount(Chapter, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: { ...options.components }
        }
    })
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    document.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }))
    jest.runAllTimers();
    document.dispatchEvent(new CustomEvent('scroll', { detail: 2000 }))
    jest.runAllTimers();

    expect(wrapper.find("#chapter-container").exists()).toBe(true)
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    
    expect(wrapper.findAll('.content').map(v => v.attributes('src'))).toEqual(expect.arrayContaining(['data:image/jpeg;base64,UjBsR09EbGhBUUFCQUFBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PQ==']))
})