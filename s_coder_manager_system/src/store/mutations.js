  export default{
    updatelogindata(state, logindata) {
        state.logindata = logindata;
        localStorage.setItem('logindata',JSON.stringify(logindata));// 提交mutation成功后保存logindata到localStorage
      },
      updatamessage(state, form1) {
        state.form1 = form1;
        localStorage.setItem('form1',JSON.stringify(form1));// 提交mutation成功后保存logindata到localStorage
      }
  }