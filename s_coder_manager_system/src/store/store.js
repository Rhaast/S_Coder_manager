import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logindata: {},
    form1: {}
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
      axios({
        method: 'post',
        url: 'http://xyiscoding.top/studyapp/user/manager/login',
        dataType: 'json',
        data: context.state.form1
      }).then(res => {
        if (res.data.result == '200') {
          // let data = JSON.stringify(res.data)
          // sessionStorage.obj = data;    //将登陆成功的账号信息保存到data里然后再存入session
          localStorage.setItem('data', JSON.stringify(res.data)); //保存登录状态
          let message = JSON.parse(localStorage.getItem('data')); //取得localStorage数据
          this.$store.commit("updatelogindata", message.detail)
          this.$message({
            message: "登录成功",
            type: "success"
          });
          this.$router.replace('/notemanager/notelist')

        } else {
          this.$message.error("用户名或密码错误");
        }
      })
    }
  }

});
export default store
