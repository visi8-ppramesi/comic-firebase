jest.useFakeTimers()
import { flushPromises, mount } from '@vue/test-utils'
import { useAuthStore } from '../../src/store/auth.js'
import storeMock from '../__mocks__/storeMock.js'
import PaymentModal from '../../src/components/PaymentModal.vue'
import options from '../utils/pluginInitializer.js'
import { nextTick } from 'vue'

test('PaymentModal', async () => {
    const wrapper = mount(PaymentModal, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: { ...options.components },
            directives: {
                loading: (el, binding) => {
                    if (binding.value || typeof binding.value === "undefined") {
                        el.classList.add("state-loading");
                        el.setAttribute("disabled", "disabled");
                    } else {
                        el.classList.remove("state-loading");
                        el.removeAttribute("disabled");
                    }
                }
            }
        }
    })

    const comic = storeMock.getState(['comics', 'comic-1'])
    const chapter = storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1'])

    wrapper.vm.setState('chapterData', chapter)
    wrapper.vm.setState('comicData', comic)
    wrapper.vm.openModal()

    const selectElement = wrapper.find("#gopay-selector")

    selectElement.element.checked = true
    await Promise.all([
        selectElement.trigger('click'),
        selectElement.trigger('change')
    ])

    await wrapper.find('#next-button-top').trigger('click')
    await nextTick()
    // console.log(wrapper.vm.page)

    // await flushPromises()
    // await flushPromises()
    // await flushPromises()
    // await flushPromises()
    // await wrapper.find('#next-button-top').trigger('click')
    // await flushPromises()
    // await flushPromises()
    // await flushPromises()
    // await flushPromises()

    // console.log(wrapper.html())
})