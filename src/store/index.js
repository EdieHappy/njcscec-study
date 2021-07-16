import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userDetail: {}, // 用户登录信息
  },
  mutations: {
    // 登录成功后用户信息
    setUserDetail(state, payload) {
      state.userDetail = payload.userDetail
    }
  },
  actions,
  modules: {
  }
})
