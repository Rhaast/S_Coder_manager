<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="headerbg">
        <div class="left">
          <transition name="slide">
            <h1 v-show="isCollapse">S_Coder</h1>
          </transition>
        </div>
        <div class="slidehidden">
          <img src="../assets/image/icon-slidebar.png" height="25" width="21" @click="collapsed">
        </div>
        <div class="userstatus">
          <span class="username">{{logindata.userName}}</span>
          <span class="portrait"><img :src="'http://xyiscoding.top/img/'+logindata.portrait" height="24" width="24"></span>
          <span class="verticalline">|</span>
          <span class="loginstatus" @click="logout">{{logintxt}}</span>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="slideaside" :class="{actived: isActive}">
        <Sidebar ref="getsidebar"></Sidebar>
      </div>
      <div class="homecontent">
        <div class="breadcrumb">
          <breadcrumb></breadcrumb>
        </div>
        <div class="maincontent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Sidebar from "../components/slidebar/Sidebar";
import breadcrumb from "../components/breadcrumb/breadcrumb";
import {mapState} from 'vuex';
export default {
  name: "HelloWorld",
  data() {
    return {
      isCollapse: true,
      isActive: "",
      logintxt: "未登录",
    };
  },
  computed: {    //获得vuex里的状态
    logindata(){
      return this.$store.state.logindata;
    }
  },
  mounted() {
    if (localStorage.getItem('data')) {
      this.logintxt = "注销";
    }
    if (!localStorage.getItem('data')) {
      this.logintxt = "未登录";
    }
  },
  methods: {
    logout(){
      if(this.logintxt=='注销'){
        this.$confirm('是否退出后台管理系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           this.$router.push('/')
           location.reload();
           localStorage.clear()
           this.$store.commit("updateUserInfo","");
           this.$store.commit("updatePortrait","");
           this.$message({
            type: 'success',
            message: '已退出'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    collapsed() {
      this.isCollapse = !this.isCollapse;
      this.$refs.getsidebar.collapse();
      this.isActive = !this.isActive;
    }
  },
  components: {
    Sidebar,
    breadcrumb
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
@import "../../static/scss/cover";
$high-color: #5272f9;
.home-wrapper {
  .header {
    .headerbg {
      background: $high-color;
      width: 100%;
      height: 60px;
      .left {
        float: left;
        display: inline-block;
        padding: 0 32px;
        line-height: 60px;
        height: 60px;
        h1 {
          font-size: 24px;
          color: #fff;
          text-transform: uppercase;
          width: 166px;
        }
      }
      .slidehidden {
        width: 60px;
        height: 60px;
        float: left;
        display: inline-block;
        position: relative;
        margin: 0 auto;
        img {
          position: absolute;
          left: 50%;
          margin-left: -12px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .userstatus {
        line-height: 60px;
        float: right;
        color: #fff;
        width: 230px;
        font-size: 18px;
        margin-right: 24px;
        .portrait img {
          width: 24px;
          height: 24px;
          vertical-align: middle;
          border-radius: 50%;
        }
        .verticalline {
          line-height: 60px;
          padding: 0 24px;
        }
      }
    }
  }
  .content-wrapper {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
    .slideaside {
      flex: 0, 0, 230px;
      width: 230px;
      &.actived {
        width: 65px;
        flex: 0, 0, 65px;
      }
    }
    .homecontent {
      overflow-y: scroll;
      // 裁剪 div 元素中内容的左/右边缘 - 如果溢出元素的内容区域的话
      flex: 1;
      width: 100%;
      padding: 20px;
      .breadcrumb {
      }
      .maincontent {
        margin-top: 50px;
      }
    }
  }
}
</style>
