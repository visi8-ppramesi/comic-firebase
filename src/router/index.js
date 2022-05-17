import { createWebHistory, createRouter } from "vue-router";

// const authorRoutes = [
//     {
//         path: "/author/:id",
//         name: "Author",
//         component: () => import("@/pages/Author.vue"),
//         meta: {
//             showNav: true
//         }
//     },
//     {
//         path: "/authors",
//         name: "Authors",
//         component: () => import("@/pages/Authors.vue"),
//         meta: {
//             showNav: true
//         }
//     }
// ]

// const authRoutes = [
//     {
//         path: "/login",
//         name: "Login",
//         component: () => import("@/pages/Login.vue"),
//         meta: {
//             showNav: false,
//             requiresLoggedOut: true
//         }
//     },
//     {
//         path: "/logout",
//         name: "Logout",
//         component: () => import("@/pages/Logout.vue"),
//         meta: {
//             showNav: false,
//             requiresAuth: true
//         }
//     },
//     {
//         path: "/register",
//         name: "Register",
//         component: () => import("@/pages/Register.vue"),
//         meta: {
//             showNav: false,
//             requiresLoggedOut: true
//         }
//     },
// ]

// const mineRoutes = [
//     {
//         path: "/my-account",
//         name: "MyAccount",
//         component: () => import("@/pages/MyAccount.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true
//         }
//     },
//     {
//         path: "/my-comics",
//         name: "MyComics",
//         component: () => import("@/pages/MyComics.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true
//         }
//     },
//     {
//         path: "/my-profile",
//         name: "MyProfile",
//         component: () => import("@/pages/MyProfile.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true
//         }
//     },
//     {
//         path: "/my-transactions",
//         name: "MyTransactions",
//         component: () => import("@/pages/MyTransactions.vue"),
//         meta: {
//             showNav: true,
//             requiresAuth: true
//         }
//     },
//     {
//         path: "/user/:id",
//         name: "User",
//         component: () => import("@/pages/User.vue"),
//         meta: {
//             showNav: true
//         }
//     },
// ]

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
    // ...authorRoutes,
    // ...authRoutes,
    ...infoRoutes,
    ...comicsRoutes,
    // ...mineRoutes
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
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