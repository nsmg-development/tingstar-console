import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import '@mdi/font/css/materialdesignicons.css'
// import moment from 'moment'

import App from './App.vue'
import router from './router'
import store from './store'

require('./store/subscriber')

Vue.use(Vuetify)

window.axios = require('axios')
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
axios.defaults.headers.common['Authorization'] =
	'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.common['c9'] = 'tingstar';

// window.moment = require('moment')
// moment.locale('ko')

Vue.config.productionTip = false
Vue.prototype.axios = window.axios;

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
	new Vue({
		vuetify: new Vuetify({
			theme: {
				themes: {
					light: {
						primary: "#0A0C0C",
					},
					dark: {
						primary: colors.purple.darken3,
					},
				},
			},
			icons: {
				iconfont: 'mdiSvg',
			},
		}),
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})
