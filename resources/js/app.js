import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import moment from 'moment'

import App from './App.vue'
import router from './router'
import store from './store'


require('./store/subscriber')

Vue.use(Vuetify)

window.axios = require('axios')
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = '/api'

// window.moment = require('moment')
// moment.locale('ko')

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    new Vue({
        vuetify: new Vuetify({
            theme: {
                themes: {
                    light: {
                        primary: "#414C65",
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
        render: h => h(App)
    }).$mount('#app')
})
