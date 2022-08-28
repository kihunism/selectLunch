import VueRouter from 'vue-router'
import LoginPage from '../pages/users/LoginPage.vue'
import UserSignupPage from '../pages/users/UserSignupPage.vue'
import MainPage from '../pages/MainPage.vue'
import MyinfoPage from '../pages/users/MyinfoPage.vue'
import store from '../store/store.js'
import ResetPWPage from '../pages/users/ResetPWPage.vue'
import OnboardingPage from '../pages/boards/OnboardingPage.vue'
import BoardPage from '../pages/boards/BoardPage.vue'
import HistoryPage from '../pages/history/HistoryPage.vue'

const requireAuth = () => (to, from, next) => {
    if(store.state.isLogin === true) {
        console.log('false 상태')
        return next()
    }else {
        console.log('true 상태!')
        next('/login')
    }
}

const routes = [
    {
        path: '/',
        name: MainPage.name,
        component: MainPage,
        beforeEnter: requireAuth(),
        redirect: '/boards'
    },
    {
        path: '/boards',
        name: BoardPage.name,
        component: BoardPage,
        beforeEnter: requireAuth(),
    },
    {    
        path: '/boards/:category',
        component: BoardPage,
        beforeEnter: requireAuth(),
    },  
    {
        path: '/create',
        name: UserSignupPage.name,
        component: UserSignupPage
    },
    {
        path: '/reset-pw',
        name: ResetPWPage.name,
        component: ResetPWPage
    },
    {
        path: '/myinfo',
        component: MyinfoPage,
    },
    {
        path: '/login',
        name: LoginPage.name,
        component: LoginPage,
        meta: {
            auth: true
        }
    },
    {
        path: '/onboarding',
        name: OnboardingPage.name,
        component: OnboardingPage
    },
    {
        path: '/history',
        name: HistoryPage.name,
        component: HistoryPage
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

// router.beforeEach((to, from, next) => {
//     if(store.state.isLogin === true) {
//         console.log('false 상태')
//         return next()
//     }else {
//         console.log('true 상태!')
//         next('/login')
//     }
// })



// router.beforeEach((to, from, next) => {
//     // const isLogin = store.getters[""]
//     if(store.state.isLogin && to.meta.auth) {
//         next()
//     }else {
//         router.push('/login')
//     }
// })



export default router