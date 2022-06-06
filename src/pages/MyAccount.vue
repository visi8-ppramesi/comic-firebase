<template>
        <div class="h-full w-full">
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1 text-white">
                    <div class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">Profile Information</div>
                    <div class="px-3 lg:px-5">Update Your Account's Profile Information and Email Address</div>
                </div>
                <div class="md:col-span-2">
                    <div class="p-3">
                        <div class="bg-slate-100 rounded border-2">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-4">
                                    <div class="text-xl p-3 lg:p-5">Profile Photo</div>
                                    <div class="px-3">
                                        <img v-if="imageDataUrl" :src="imageDataUrl" />
                                        <input ref="profilePictureRef" type="file" accept="image/*" style="display:none" @change="onFileChange" />
                                        <button class="font-bold px-3 border-2 rounded" @click="selectProfilePicture">Select Profile Picture</button>
                                    </div>
                                </div>
                                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                        Username
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="name" placeholder="Username">
                                </div>
                                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                        Email
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="email" placeholder="Email">
                                </div>
                                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname">
                                        Full name
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="full_name" placeholder="Fullname">
                                </div>
                            </div>
                            <div class="flex justify-end px-5 py-5">
                                <button class="bg-blue-500 rounded w-14 h-7" @click="saveProfile">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-1 text-white">
                    <div class="font-bold text-xl px-3 pt-3 lg:px-5 lg:pt-5">Update Password</div>
                    <div class="px-3 lg:px-5">Ensure Your Password is using a long, random password to stay secure</div>
                </div>
                <div class="md:col-span-2">
                    <div class="p-3">
                        <div class="bg-slate-100 rounded border-2">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="cureent-password">
                                        Current Password
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="oldPassword" placeholder="Username">
                                </div>
                                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="new-password">
                                        New Password
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="newPassword" placeholder="Password">
                                </div>
                                <div class="px-3 mt-5 col-span-6 sm:col-span-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">
                                        Confirm Password
                                    </label>
                                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Confirm password">
                                </div>
                            </div>
                            <div class="flex justify-end px-5 py-5">
                                <button class="bg-blue-500 rounded w-14 h-7" @click="savePassword">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
/*
    todo: 
        validation
        error toast
*/
import { useAuthStore } from '../store/auth.js'
import { mapState } from 'pinia'
// import { doc } from 'firebase/firestore'
// import firebase from '../firebase/firebase.js'
import _ from 'lodash'
export default {
    name: 'my-account',
    data(){
        return {
            profilePicture: null,
            profilePictureChanged: false,
            imageDataUrl: null,
            name: '',
            email: '',
            full_name: '',
            oldPassword: '',
            newPassword: '',
            authStore: null,
        }
    },
    created(){
        this.authStore = useAuthStore()
        if(!_.isNil(this.userData)){
            const { name, email, full_name } = this.userData
            this.name = name
            this.email = email
            this.full_name = full_name
            console.log(this.profileImageUrl)
            this.imageDataUrl = this.profileImageUrl
        }
        if(!_.isNil(this.profileImageUrl)){
            this.imageDataUrl = this.profileImageUrl
        }
    },
    watch: {
        profileImageUrl(){
            if(!_.isNil(this.profileImageUrl)){
                this.imageDataUrl = this.profileImageUrl
            }
        },
        userData(){
            if(!_.isNil(this.userData)){
                const { name, email, full_name } = this.userData
                this.name = name
                this.email = email
                this.full_name = full_name
            }
        }
    },
    computed:{
        ...mapState(useAuthStore, {
            userData: 'user',
            userInstance: 'userInstance',
            isLoggedIn: 'isLoggedIn',
            profileImageUrl: 'profile_image_url'
        })
    },
    methods: {
        onFileChange(event){
            this.profilePicture = event.target.files[0];
            this.imageDataUrl = URL.createObjectURL(this.profilePicture);
            this.profilePictureChanged = true
        },
        selectProfilePicture(){
            this.$refs.profilePictureRef.click()
        },
        async saveProfile(){
            let loader = this.$loading.show({
                loader: 'dots'
            });
            console.log('profile save')
            try{
                if(this.profilePictureChanged){
                    await this.userInstance.uploadField('profile_image_url', 'profile_images/' + this.userInstance.id, this.profilePicture)
                }
                const { name, email, full_name } = this
                await this.authStore.updateUserProfileData({name, email, full_name})
                // await this.userInstance.updateProfileData({name, email, full_name}).then((__) => {
                //     this.authStore.updateStoreUserData({ name, email, full_name })
                // })
                this.$toast.open({
                    message: "Profile updated!",
                    type: "success",
                    duration: 5000,
                    dismissible: true,
                    position: 'bottom'
                })
            }catch(err){
                console.error(err)
                throw err
            }finally{
                loader.hide();
            }
        },
        async savePassword(){
            let loader = this.$loading.show({
                loader: 'dots'
            });
            try{
                await this.userInstance.updatePassword(this.oldPassword, this.newPassword)
                this.$toast.open({
                    message: "Password updated!",
                    type: "success",
                    duration: 5000,
                    dismissible: true,
                    position: 'bottom'
                })
            }catch(err){
                console.error(err)
                throw err
            }finally{
                loader.hide();
            }
        },
        onCancel(){
            console.log('cancelled')
        }
    }
}
</script>

<style scoped>

</style>