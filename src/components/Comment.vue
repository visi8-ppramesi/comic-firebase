<template>
    <div class="flex text-black">
        <div class="lg:text-xl xl:text-2xl flex-1 border px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
            <div class="flex">
                <img class="flex items-center justify-center rounded-full w-6 h-6 sm:w-8 sm:h-8" :src="profil" alt="">
                <div class="px-3 flex-grow items-center justify-center">
                    <strong>Test 1</strong> <span class="lg:text-lg text-xs text-gray-900">16:59</span>
                </div>
                <button class="flex items-center justify-between">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="px-9 sm:px-11 text-justify pt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book.
            </div>
            <p class="text-sm">
            </p>
        </div>
    </div>
</template>

<script>
// import moment, { isMoment } from 'moment'
export default {
    name: 'comment',
    props: ['comment'],
    // inject: ['swal'],
    data() {
        return {
            profil: require('../assets/kara_bg.jpg'),
            moment: null,
            replyBox: false,
            message: '',
            likes: {},
        }
    },
    // created(){
    //     this.moment = moment
    //     this.likes[this.comment.id] = this.comment.liked
    //     this.comment.all_children_with_commenter.forEach((el) => {
    //         this.likes[el.id] = el.liked
    //     })
    // },
    // methods:{
    //     likeComment(commentId, liked){
    //         let vote = true
    //         if(liked){
    //             vote = false
    //         }
    //         axios.post(route('api.comment.vote', {comment: commentId}), {
    //             vote: vote
    //         })
    //         .then((response) => {
    //             this.likes[commentId] = !liked
    //             if(this.comment.id === commentId){
    //                 this.comment.rating = response.data.rating
    //             }else{
    //                 let idx = this.comment.all_children_with_commenter.findIndex(el => el.id === commentId)
    //                 this.comment.all_children_with_commenter[idx].rating = response.data.rating
    //                 // this.comment.all_children_with_commenter[idx].liked = !vote
    //             }
    //         })
    //     },
    //     deleteComment(id){
    //         const swalWithBootstrapButtons = this.swal.mixin({
    //             customClass: {
    //                 confirmButton: 'bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    //                 cancelButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    //             },
    //             buttonsStyling: false
    //         })

    //         swalWithBootstrapButtons.fire({
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonText: 'Yes, delete it!',
    //             cancelButtonText: 'No, cancel!',
    //             reverseButtons: true
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 axios.delete(route('api.comment.delete', {comment: id}))
    //                 .then((response) => {
    //                     this.emitter.emit('reloadComments')
    //                     swalWithBootstrapButtons.fire(
    //                         'Deleted!',
    //                         'Your comment has been deleted.',
    //                         'success'
    //                     )
    //                 })
    //             } else if (
    //                 result.dismiss === Swal.DismissReason.cancel
    //             ) {
    //                 swalWithBootstrapButtons.fire(
    //                     'Cancelled',
    //                     'Your comment is safe :)',
    //                     'error'
    //                 )
    //             }
    //         })
    //     },
    //     toggleReplyBox(){
    //         this.replyBox = !this.replyBox
    //     },
    //     submit(){
    //         axios.post(route('comments.reply', {comment: this.comment.id}), {
    //             message: this.message
    //         })
    //         .then((response) => {
    //             this.message = ''
    //             this.replyBox = false
    //             this.emitter.emit('reloadComments')
    //             return this.swal.fire({
    //                 icon: "success",
    //                 title: "Comment posted!",
    //                 text: "Comment posted succesful!",
    //             })
    //         })
    //     }
    // }
}
</script>
<style scoped>
.active{
    fill:red;
}
.inactive{
    fill:transparent;
}
</style>
