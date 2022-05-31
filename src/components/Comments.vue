<template>
    <div class="px-5 pb-5">
        <div class="antialiased mx-auto w-full bg-white px-4 pt-2 pb-3 rounded-xl">
            <h3 class="pt-3 pb-2 text-gray-800 text-lg lg:text-xl xl:text-2xl">Comments</h3>
            <div class="space-y-4">
                <comment v-for="(comment, idx) in comments" :key="'comment-' + idx" :comment="comment"/>
            </div>
        </div>
    </div>
</template>

<script>
import Comment from './Comment.vue'
export default {
    components: {
        Comment
    },
    name: 'comments',
    props: ['comments'],
    created(){
    }
}
</script>
