export default{
        getUserInfo:(state)=>state.logindata==null?'':state.logindata,
        getLoginInfo:(state)=>state.form1==null?'':state.form1
  }