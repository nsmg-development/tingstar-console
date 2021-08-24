import axios from 'axios'
import store from '../store'

export default {
	namespaced: true,

	state: {
		token: null,
		user: null,
	},

	getters: {
		authenticated(state) {
			return state.token
		},

		// user (state) {
		//     return state.user
		// }
	},

	mutations: {
		SET_TOKEN(state, token) {
			state.token = token
		},

		SET_USER(state, data) {
			state.user = data
		}
	},

	actions: {
		async login({dispatch}, credentials) {
			store.dispatch('setError', false)

			try {
				let response = await axios.post('oauth/token', credentials)
				return dispatch('attempt', response.data.access_token)
			} catch (error) {
				store.dispatch('setError', '로그인 정보를 확인해 주세요.')
			}
		},

		async attempt({commit, state}, token) {
			if (token) {
				commit('SET_TOKEN', token)
			}

			if (!state.token) {
				return
			}
			// try {
			//
			//     let response = await axios({
			//         url: '/api/v1/users/me',
			//         method: 'GET',
			//         headers: {
			//             'Authorization' : 'Bearer ' + token
			//         }
			//     });
			//
			//     if(response.data.result){
			//         commit('SET_USER', response.data.data[0])
			//     }
			// } catch (error) {
			//     commit('SET_TOKEN', null)
			//     commit('SET_USER', null)
			// }
		},

		logout({commit}) {
			// return axios.post('oauth/logout').then(() => {
			commit('SET_TOKEN', null)
			commit('SET_USER', null)
			localStorage.clear();
			// })
		}
	},
}
