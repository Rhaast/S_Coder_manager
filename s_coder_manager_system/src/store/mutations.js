  import * as types from './mutation-types' 
  export default{
    [types.UPLOGIN_MUTATION](state, logindata) {
        state.logindata = logindata;
        sessionStorage.setItem('logindata',JSON.stringify(logindata));// 提交mutation成功后保存logindata到localStorage
      },
      [types.UPFORM_MUTATION ](state, form1) {
        state.form1 = form1;
        sessionStorage.setItem('form1',JSON.stringify(form1));// 提交mutation成功后保存logindata到localStorage
      }
  }