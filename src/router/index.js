import { createWebHistory, createRouter } from "vue-router";
import emitter from "@/utils/emitter";

const authorRoutes = [
    {
        path: "/author/:id",
        name: "Author",
        component: () => import("@/pages/Author.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/authors",
        name: "Authors",
        component: () => import("@/pages/Authors.vue"),
        meta: {
            showNav: true
        }
    }
]

const authRoutes = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/Login.vue"),
        meta: {
            showNav: false,
            requiresLoggedOut: true
        }
    },
    {
        path: "/logout",
        name: "Logout",
        component: () => import("@/pages/Logout.vue"),
        meta: {
            showNav: false,
            requiresAuth: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/pages/Register.vue"),
        meta: {
            showNav: false,
            requiresLoggedOut: true
        }
    },
]

const mineRoutes = [
    {
        path: "/my-account",
        name: "MyAccount",
        component: () => import("@/pages/MyAccount.vue"),
        meta: {
            showNav: true,
            requiresAuth: true
        }
    },
    {
        path: "/my-comics",
        name: "MyComics",
        component: () => import("@/pages/MyComics.vue"),
        meta: {
            showNav: true,
            requiresAuth: true
        }
    },
    {
        path: "/my-profile",
        name: "MyProfile",
        component: () => import("@/pages/MyProfile.vue"),
        meta: {
            showNav: true,
            requiresAuth: true
        }
    },
    {
        path: "/my-transactions",
        name: "MyTransactions",
        component: () => import("@/pages/MyTransactions.vue"),
        meta: {
            showNav: true,
            requiresAuth: true
        }
    },
    {
        path: "/user/:id",
        name: "User",
        component: () => import("@/pages/User.vue"),
        meta: {
            showNav: true
        }
    },
]

const infoRoutes = [
    {
        path: "/about-us",
        name: "AboutUs",
        component: () => import("@/pages/AboutUs.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/privacy-policy",
        name: "PrivacyPolicy",
        component: () => import("@/pages/PrivacyPolicy.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/terms-service",
        name: "TermsOfService",
        component: () => import("@/pages/TermsOfService.vue"),
        meta: {
            showNav: true
        }
    },
]

const comicsRoutes = [
    {
        path: "/comic/:id",
        name: "Comic",
        component: () => import("@/pages/Comic.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/comics",
        name: "Comics",
        component: () => import("@/pages/Comics.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/comic/:comicId/chapter/:chapterId",
        name: "Chapter",
        component: () => import("@/pages/Chapter.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/comic/:comicId/chapter/:chapterId/page/:pageId",
        name: "Page",
        component: () => import("@/pages/Scene.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/comic/:comicId/chapter/:chapterId/page/:pageId/scene/:sceneId",
        name: "Scene",
        component: () => import("@/pages/ArScene.vue"),
        meta: {
            showNav: true
        }
    }
]

export const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: () => import("@/pages/Dashboard.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/test",
        name: "Test",
        component: () => import("@/pages/Test.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/test-two",
        name: "TestTwo",
        component: () => import("@/pages/TestTwo.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/search",
        name: "Search",
        component: () => import("@/pages/Search.vue"),
        meta: {
            showNav: true
        }
    },
    {
        path: "/faq",
        name: "FAQ",
        component: () => import("@/pages/FAQ.vue"),
        meta: {
            showNav: true
        }
    },
    ...authorRoutes,
    ...authRoutes,
    ...infoRoutes,
    ...comicsRoutes,
    ...mineRoutes,
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("@/pages/NotFound.vue"), meta: { showNav: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    //eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
      // always scroll to top
      return { top: 0 }
    },
});

router.beforeEach((to, from, next) => {
    if(from.name && from.name !== 'Logout' && from.name !== 'Login' && from.name !== 'Register'){
        const fromRoute = {
            name: from.name,
            params: from.params,
            query: from.query
        }
        localStorage.setItem('fromRoute', JSON.stringify(fromRoute))
    }
    
    emitter.emit('navigate')
    const loggedIn = localStorage.getItem('uid')
  
    if(to.meta.requiresLoggedOut && !!loggedIn){
      return next('/')
    }
  
    if (to.meta.requiresAuth && !loggedIn) {
      return next('/login');
    }
  
    next();
  });

export default router;