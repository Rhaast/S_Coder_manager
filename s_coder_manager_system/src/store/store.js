import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)
const localLoginData = global.localStorage;
  const state = {
    logindata: {}, // 初始化vuex，刷新时获取localstorage
    form1: JSON.parse(localStorage.getItem('form1'))  //登录信息
  }
  // const vuexLocal = new VuexPersistence({
  //   storage: window.localStorage,
  //   reducer: state => ({
  //     logindata: state.logindata,
  //     form1: state.form1,
  //   }),
  //   filter: (mutation) => (
  //     mutation.type === 'updatelogindata' ||
  //     mutation.type === 'updatamessage' 
  //   )
  // })
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
  // plugins: [vuexLocal.plugin]
})
