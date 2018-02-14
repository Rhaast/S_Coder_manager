<template>
  <div class="login">
    <div class="login-wrapper">
        <div class="login-form">
          <div class="card-block">
            <h1>Admin</h1>
            <p class="text-muted">用户名/密码登录</p>
            <div class="input-group m-b-1">
              <span class="input-group-addon"><i class="el-icon-success"></i></span>
              <input type="text" class="form-control" placeholder="userName" v-model="username" @input="wuha">
            </div>
            <div class="input-group m-b-2">
              <span class="input-group-addon"><i class="el-icon-success"></i></span>
              <input type="password" class="form-control" placeholder="password" v-model="password"
                     @keyup.enter="submitForm" @input="wuha">
            </div>
            <div class="row">
              <el-row>
                <el-col :span="24">
                  <el-button type="primary" class="button" @click="submitForm" :disabled="chooese">登录</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
    </div>   
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: "",
      password: "",
      logindata:{},
      chooese: true,
    };
  },
  methods: {
    wuha(){
      if(!this.username||!this.password){
        this.chooese=true;
      }else{
        this.chooese=false; 
      }
    },
    submitForm(){
      let form1 = {
          userName:this.username,
          password:this.password            
      };
      this.$store.dispatch('login')
      this.$store.commit('updatamessage',form1)
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../../../static/scss/cover";
.login {
  background: #f5f5f5;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  .login-wrapper {
    width: 500px;
    background: #fff;
    border: 1px solid #eeeeee;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -170px;
    margin-left: -275px;
    padding: 0 24px;
  }
}
.login .el-button {
  border-radius: 0;
  width: 420px;
  margin-right: 12px;
}

.login .el-button.forgot,
.login .el-button.forgot:hover {
  border: none;
}

.login .login-form {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  display: block;
}

.login .login-form .card-block {
  padding: 35px;
}
.login .login-form .card-block h1 {
  font-size: 36px;
}
.login .login-form .card-block p {
  margin: 15px 0;
}

.input-group {
  width: 100%;
  display: table;
  border-collapse: separate;
  margin-bottom: 20px !important;
}

.input-group,
.input-group-btn,
.input-group-btn > .btn,
.navbar {
  position: relative;
}

.input-group-addon:not(:last-child) {
  border-right: 0;
}

.input-group-addon,
.input-group-btn {
  min-width: 40px;
  white-space: nowrap;
  vertical-align: middle;
  width: 1%;
}

.btn-link:focus,
.btn-link:hover {
  color: #167495;
  text-decoration: underline;
  background-color: transparent;
}

.btn-link,
.btn-link:active,
.btn-link:focus,
.btn-link:hover {
  border-color: transparent;
}

.btn.focus,
.btn:focus,
.btn:hover {
  text-decoration: none;
}

.input-group-addon {
  padding: 0.5rem 0.75rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: #607d8b;
  text-align: center;
  background-color: #cfd8dc;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.input-group .form-control,
.input-group-addon,
.input-group-btn {
  display: table-cell;
}

.input-group .form-control {
  position: relative;
  z-index: 2;
  float: left;
  margin-bottom: 0;
}

.form-control {
  width: 90%;
  padding: 0.5rem 0.75rem;
  font-size: 1.5rem;
  line-height: 1.75rem;
  color: #607d8b;
  background: #fff none;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.el-button btn btn-primary p-x-2 el-button--primary {
  width: 100%;
}
.login .login-form .card-block .row {
  display: block;
  margin: 15px 0;
}
</style>


