import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from "../views/Home";
import Youtube from "../views/Youtube";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token')) {
                return next({
                    name: '/'
                })
            }
            next()
        }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/youtube',
        name: 'Youtube',
        component: Youtube,
        meta: {
            requiresAuth: true,
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (!localStorage.getItem('token')) {
            return next({
                name: 'Login'
            })
        } else {
            next();
        }
    }
    next();
});

export default router
