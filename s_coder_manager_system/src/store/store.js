import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// const localLoginData = localStorage.getItem('data')
const store = new Vuex.Store({
  state: {
    logindata:{}, //登录成功返回信息
    form1: {}  //登录信息
  },
  mutations: {
    updatelogindata(state, logindata) {
      state.logindata = logindata;
    },
    updatamessage(state, form1) {
      state.form1 = form1
    }
    
  },
  actions: {
    login(context) {
      return axios({
        method: 'post',
        url: 'http://xyiscoding.top/studyapp/user/manager/login',
        dataType: 'json',
        data: context.state.form1
      })
    }
  }

});
export default store
