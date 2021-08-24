import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from "../views/Home";
import Platform from "../views/platform/Platform";
import PlatformShow from "../views/platform/PlatformShow";
import MediaShow from "../views/media/MediaShow";
import ArticleShow from "../views/article/ArticleShow";
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
		path: '/platform',
		name: 'Platform',
		component: Platform,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/platform/:id',
		name: 'PlatformShow',
		component: PlatformShow,
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: '/media',
		name: 'MediaShow',
		component: MediaShow,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/:id',
		name: 'ArticleShow',
		component: ArticleShow,
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
