import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import contact from './contact'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		errors: false,
		publicData:[],
	},

	getters: {
		errors: state => {
			return state.errors;
		},
	},

	mutations: {
		SET_ERROR (state, errors) {
			state.errors = errors
		},
	},

	actions: {
		setError ({ commit }, errors) {
			commit('SET_ERROR', errors)
		},
	},

	modules: {
		auth,
		contact,
	}
})
