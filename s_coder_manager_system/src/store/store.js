import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)
// const localLoginData = global.localStorage;
  const state = {
    logindata: JSON.parse(sessionStorage.getItem('logindata')), // 初始化vuex，刷新时获取localstorage
    form1: JSON.parse(sessionStorage.getItem('form1'))  //登录信息
  }
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
  // plugins: [vuexLocal.plugin]
})
