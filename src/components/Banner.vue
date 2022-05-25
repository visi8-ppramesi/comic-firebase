<template>
    <vueper-slides slide-image-inside class="w-full">
        <vueper-slide v-for="(banner, idx) in banners" :key="idx" :title="banner.title">
         <!-- :image="banner.banner_image_url" :link="routeResolver(banner.target_type, {id: banner.target}, {}, 'string')"> -->
            <template #content>
                <router-link :to="routeResolver(banner.target_type, {id: banner.target}, {}, 'string')">
                    <img class="w-full h-full object-cover" :src="banner.banner_image_url" alt="">
                </router-link>
            </template>
        </vueper-slide>
    </vueper-slides>
</template>

<script>
/* eslint-disable */
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
// import 'vue3-carousel/dist/carousel.css';
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
    components: {
        VueperSlides,
        VueperSlide,
        // Carousel,
        // Slide,
        // Pagination,
        // Navigation
    },
    created(){
    },
    inject: [
        'routeResolver'
    ],
    props: {
        banners: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    methods: {
        goToItem(route){
            this.$inertia.visit(route(route.name, route.params))
        }
    },
    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
        };
    },
}
</script>
