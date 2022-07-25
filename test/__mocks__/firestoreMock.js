const abunchashit = {
    settings: {
        banners: {
            value: [
                {
                    async_component: "video-banner",
                    target: "SSb0da8HXyie7DbcAEve",
                    target_type: "Comic",
                    title: "Kara",
                    type: "component"
                }
            ]
        }
    },
    async_components: {
        'video-banner': {
            data: '()=>({videoSrc:"https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/videos%2Fdashboard%2Ftest-compressed.mp4?alt=media&token=4d7a6536-0203-4698-ba2a-3cbed199b965",imgSrc:"https://firebasestorage.googleapis.com/v0/b/comics-77200.appspot.com/o/logos%2Fkara_logo.png?alt=media&token=7060c54a-8c85-4131-8f88-8a6c7ac84200"})',
            name: 'video-banner',
            template: '<div class="flex w-full h-full"><video playsinline autoplay muted loop v-show="videoSrc" :src="videoSrc" class="absolute w-full h-full object-cover"></video><div class="w-full h-full bg-black/50 items-center justify-center z-20 flex text-white"><img v-show="imgSrc" :src="imgSrc"></div></div>'
        }
    }
}

const emptyDocument = (paths) => {
    let fakeData = abunchashit[paths[0]]
    for(let i = 1; i < paths.length; i++){
        fakeData = fakeData[paths[i]]
    }
    return {
        data(){
            return {
                ...fakeData
            }
        }
    }
}

export const getFirestore = jest.fn();
export const where = jest.fn();
export const limit = jest.fn();
export const orderBy = jest.fn();
export const startAfter = jest.fn();
export const doc = jest.fn((...args) => {
    args.shift();
    return args;
});
export const FieldPath = jest.fn();
export const endBefore = jest.fn();
export const collection = jest.fn();
export const query = jest.fn();


export const getDoc = jest.fn((ref) => {
    return {
        exists(){
            return true
        },
        id: '123',
        ...emptyDocument(ref)
    }
});
export const getDocs = jest.fn((ref) => {
    return {
        exists(){
            return true
        },
        empty: false,
        docs: Array(5).fill(emptyDocument(ref))
    }
});