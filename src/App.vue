<template>
  <div class="text-gray-50 bg-gray-800 mt-0 h-auto w-full z-20 top-0 font-mono">
    <nav class="bg-gray-800" v-show="showNav">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center md:hidden">
            <!-- Mobile menu button-->
            <button
              id="mobile-menu-button"
              @click="mobileMenuOpen = !mobileMenuOpen"
              type="button"
              class="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white hover:bg-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-white
              "
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="
              flex-1 flex
              items-center
              justify-center
              md:items-stretch md:justify-start
            "
          >
            <div
              @click="visit(routeResolver('Dashboard'))"
              class="flex-shrink-0 flex items-center"
            >
              <img
                class="block md:hidden h-16 w-auto p-3"
                :src="visi8Icon"
                alt="Workflow"
              />
              <img
                class="hidden md:block h-16 w-auto p-3"
                :src="visi8Icon"
                alt="Workflow"
              />
            </div>
            <div class="hidden md:flex items-center md:ml-6">
              <div class="flex space-x-4">
                <div v-if="isLoggedIn" class="px-2 py-2 space-y-1">
                  <router-link :to="routeResolver('Dashboard')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</router-link>
                  <!-- <router-link :to="routeResolver('MyAccount')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">My Account</router-link> -->
                  <router-link :to="routeResolver('MyComics')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">My Comics</router-link>
                  <router-link :to="routeResolver('MyTransactions')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page" >My Transactions</router-link >
                  <!-- <router-link :to="routeResolver('Logout')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Logout</router-link> -->
                </div>
                <div v-else class="px-2 py-2 space-y-1">
                  <router-link :to="routeResolver('Dashboard')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</router-link>
                  <router-link :to="routeResolver('Login')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Login</router-link>
                  <router-link :to="routeResolver('Register')" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Register</router-link>
                </div>
                <!-- <router-link @click="mobileMenuOpen = false" :to="{name: 'dashboard'}" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</router-link>
                                <router-link :to="{}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</router-link>
                                <router-link :to="{}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</router-link>
                                <router-link :to="{}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</router-link> -->
              </div>
            </div>
          </div>
          <div
            v-if="isLoggedIn"
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              md:static md:inset-auto md:ml-6 md:pr-0
            "
          >
            <!-- Profile dropdown -->
            <svg
              @click="goToSearch"
              xmlns="http://www.w3.org/2000/svg"
              class="ml-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <div class="ml-2 relative">
              <div>
                <button
                  @click="profileMenuOpen = !profileMenuOpen"
                  type="button"
                  class="
                    bg-gray-800
                    flex
                    text-sm
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-gray-800
                    focus:ring-white
                  "
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <span>
                    <img
                      v-if="isLoggedIn && profile_image_url"
                      class="h-8 w-8 rounded-full"
                      :src="profile_image_url"
                      alt=""
                    />
                    <svg
                      v-else-if="isLoggedIn"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span v-if="unreadCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{{ unreadCount }}</span>
                  </span>
                </button>
              </div>
              <div
                v-if="profileMenuOpen"
                class="
                  z-50
                  origin-top-right
                  absolute
                  right-0
                  mt-2
                  w-48
                  rounded-md
                  shadow-lg
                  py-1
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <div class="block px-4 py-2 text-sm text-gray-700">
                  {{ user.email }}
                </div>
                <hr />
                <router-link
                  :to="routeResolver('MyNotifications')"
                  class="block px-4 py-2 text-sm text-gray-700"
                  >My Notifications</router-link
                >
                <router-link
                  :to="routeResolver('MyAccount')"
                  class="block px-4 py-2 text-sm text-gray-700"
                  >My Account</router-link
                >
                <div
                  @click="goTo(routeResolver('Logout'))"
                  class="block px-4 py-2 text-sm text-gray-700"
                >
                  Logout
                </div>
               </div>
            </div>
          </div>
          <div
            v-else
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              md:static md:inset-auto md:ml-6 md:pr-0
            "
          >
            <svg
              @click="goToSearch"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <div class="ml-3 relative">
              <div v-if="isLoggedIn">
                <button
                  @click="profileMenuOpen = !profileMenuOpen"
                  type="button"
                  class="
                    bg-gray-800
                    flex
                    text-sm
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-gray-800
                    focus:ring-white
                  "
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-if="profileMenuOpen"
                class="
                  z-50
                  text-black
                  flex flex-col
                  origin-top-right
                  absolute
                  right-0
                  mt-2
                  w-48
                  rounded-md
                  shadow-lg
                  py-1
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <router-link
                  :to="routeResolver('Login')"
                  class="block px-4 py-2 text-sm text-gray-700"
                  >Login</router-link
                >
                <router-link
                  :to="routeResolver('Register')"
                  class="block px-4 py-2 text-sm text-gray-700"
                  >Register</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div
        class="md:hidden bg-gray-800 absolute w-full"
        id="mobile-menu"
        v-if="mobileMenuOpen"
      >
        <div v-if="isLoggedIn" class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            :to="routeResolver('Dashboard')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >Dashboard</router-link
          >
          <!-- <router-link
            :to="routeResolver('MyAccount')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >My Account</router-link
          > -->
          <router-link
            :to="routeResolver('MyComics')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >My Comics</router-link
          >
          <router-link
            :to="routeResolver('MyTransactions')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >My Transactions</router-link
          >
          <!-- <router-link
            :to="routeResolver('Logout')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >Logout</router-link
          > -->
          <!-- <router-link
            :to="routeResolver('web.purchasetokens')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >Purchase Tokens</router-link
          > -->
        </div>
        <div v-else class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            :to="routeResolver('Dashboard')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >Dashboard</router-link
          >
          <router-link
            :to="routeResolver('Login')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >Login</router-link
          >
          <router-link
            :to="routeResolver('Register')"
            class="
              bg-gray-900
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            aria-current="page"
            >Register</router-link
          >
        </div>
      </div>
    </nav>
    <div class="flex flex-col md:flex-row">
      <div
        class="
          md:w-96
          max-w-screen
          min-h-screen-navbar
          md:min-h-full
          main-content
          flex-1
          bg-gradient-to-t
          from-purple-800
          to-indigo-900
          h-auto
          text-black
        "
      >
        <router-view />
      </div>
    </div>
    <div v-show="showNav" class="w-100 bg-gray-800 divide-y text-center h-full">
      <div class="h-12 py-2 flex justify-center content-center items-center">
        <router-link :to="routeResolver('AboutUs')">About Us</router-link>
      </div>
      <div v-if="isLoggedIn" class="h-12 py-2 flex justify-center content-center items-center">
        <router-link :to="routeResolver('MyAccount')">My Account</router-link>
      </div>
      <div class="h-12 py-2 flex justify-center content-center items-center">
        <router-link :to="routeResolver('PrivacyPolicy')">Privacy Policy</router-link>
      </div>
      <!-- <div class="h-12 py-2 flex justify-center content-center items-center">
        <router-link :to="routeResolver('FAQ')">FAQ</router-link>
      </div> -->
      <div class="pb-3">
        <div class="h-12 py-2 flex justify-center content-center items-center">
          <router-link :to="routeResolver('PrivacyPolicy')">Follow Us On</router-link>
        </div>
        <div class="flex items-center justify-center">
          <a target="_blank" :href="socials.facebook"><img class="w-8" :src="facebook" /></a>
          <a target="_blank" :href="socials.instagram"><img class="w-8" :src="instagram" /></a>
          <a target="_blank" :href="socials.twitter"><img class="w-8" :src="twitter" /></a>
        </div>
      </div>
      <div v-if="multiLanguage" class="h-12 py-2 flex justify-center content-center items-center text-sm">
        <span class="mr-2">{{ $t('language') }}:</span>
        <span @click="selectLanguage('en')" class="lang-selector" :class="{ 'lang-selected': $i18n.locale === 'en' }">En</span> | <span @click="selectLanguage('id')" class="lang-selector" :class="{ 'lang-selected': $i18n.locale === 'id' }">Id</span>
      </div>
    </div>
  </div>
  <div id="modal"></div>
</template>

<script>
import { useAuthStore } from './store/auth.js'
import { mapState } from 'pinia'
import { useI18nStore } from '@/store/i18n.js'
import Settings from './firebase/Setting.js'
// import facebook from "../assets/icons/facebook.png";
// import instagram from "../assets/icons/instagram.png";
// import twitter from "../assets/icons/twitter.png";
const i18Texts = {
  messages: {
    en: {
      language: 'Language',
      myAccount: 'My Account',
      faq: 'FAQ',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      myComics: 'My Comics',
      myTransactions: 'My Transactions',
      purchaseTokens: 'Purchase Tokens',
      aboutUs: 'About Us',
      privacyPolicy: 'Privacy Policy',
      follow: 'Follow Us On'
    },
    id: {
      language: 'Bahasa',
      myAccount: 'Akun Saya',
      faq: 'FAQ',
      logout: 'Keluar',
      login: 'Masuk',
      register: 'Daftar',
      dashboard: 'Dashboard',
      myComics: 'Komik Saya',
      myTransactions: 'Transaksi Saya',
      purchaseTokens: 'Beli Token',
      aboutUs: 'Tentang Kami',
      privacyPolicy: 'Kebijakan Privasi',
      follow: 'Ikuti Kami Di'
    }
  }
}

export default {
  name: "App",
  components: {

  },
  i18n: i18Texts,
  mounted(){
    document.addEventListener('click', (e) => {
      if(!(e.target.closest("#mobile-menu-button") || e.target.closest("#user-menu-button"))){
        this.mobileMenuOpen = false
        this.profileMenuOpen = false
      }
    })
    this.emitter.on('navigate', () => {
      this.mobileMenuOpen = false
      this.profileMenuOpen = false
    })
    this.getSocials()
  },
  setup(){
    const i18nStore = useI18nStore()
    const authStore = useAuthStore()
    authStore.authAction()
    return {
      authStore,
      i18nStore
    }
  },
  // created(){
  //   useAuthStore().authAction()
  // },
  data() {
      return {
          cartCount: 0,
          mobileMenuOpen: false,
          profileMenuOpen: false,
          icons: {
              comic: require('./assets/comic.jpeg'),
          },
          visi8Icon: require('./assets/visi8_logo_new.png'),
          facebook: require('./assets/icons/facebook.png'),
          instagram: require('./assets/icons/instagram.png'),
          twitter: require('./assets/icons/twitter.png'),//require('./assets/visi8_logo.png'),
          socials: {},
      }
  },
  inject: [
    'routeResolver',
    'emitter'
  ],
  computed: {
    multiLanguage: () => process.env.VUE_APP_MULTI_LANGUAGE === 'true',
    showNav(){
      return this.$route.meta.showNav
    },
    ...mapState(useAuthStore, ['user', 'isLoggedIn', 'profile_image_url', 'unreadCount'])
  },
  methods: {
    selectLanguage(lang){
      this.i18nStore.changeLocale(lang)
    },
    goTo(url){
      this.$router.push(url)
    },
    async getSocials(){
      this.socials = (await Settings.getSocials()).value
    },
    goToSearch(){
      this.$router.push(this.routeResolver('Search'))
    },
    test(){
      this.$toast.open({
        message: "Test message from Vue",
        type: "success",
        duration: 5000,
        dismissible: true
      })
      // this.$toast.open('dfaskljadskljdhasfkljdhasfkljahsdfkljhasdfkljh')
    },
    visit(route){
      this.$router.push(route)
    },
    post(route){
      console.log(route)
    }
  }
};
</script>

<style>
.lang-selected:before{
  display: inline-block;
  width: 15px;
  height: 15px;
  content: url("data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22white%22%20stroke-width=%222%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20d=%22M5%2013l4%204L19%207%22%20/%3E%3C/svg%3E");
}
.lang-selected{
  padding: 1px 5px;
  display: flex;
  align-items: center;
  border: 1px white solid;
  border-radius: 8px;
  align-items: center;
}
#mobile-menu {
  z-index: 900;
}
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
.badge {
  position: relative;
  top: -13px;
  right: -34px;
  padding: 0px 5px;
  border-radius: 50%;
  background: red;
  font-size: 12px;
  color: white;
  pointer-events: none;
}
</style>
