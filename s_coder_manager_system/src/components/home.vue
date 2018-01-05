<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="headerbg">
        <div class="left">
          <transition name="slide">
            <h1 v-show="!isCollapse">S_Coder</h1>
          </transition>
        </div>
        <div class="slidehidden">
          <img src="../assets/image/icon-slidebar.png" height="25" width="21" @click="collapse">
        </div>
        <div class="userstatus">
          <span class="username">admin</span>
          <span class="verticalline">|</span>
          <span class="loginstatus">注销</span>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
    <div class="slideaside">
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="height:100%">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">笔记管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="$router.push('/notemanager')">笔记列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-picture"></i>
            <span slot="title">banner管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="$router.push('/bannermanager')">图片管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-question"></i>
            <span slot="title">提问管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="$router.push('/questionmanager')">提问列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span slot="title">评论管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="$router.push('/commentmanager')">评论列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="$router.push('/usermanager')">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span slot="title">签到管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click="$router.push('/signinmanager')">签到统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span slot="title">问题回复管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="7-1" @click="$router.push('/nestedreviewmanager')">问题评论列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span slot="title">管理员信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="8-1" @click="$router.push('/managerlist')">管理员列表</el-menu-item>
            <el-menu-item index="8-2" @click="$router.push('/systemlog')">系统日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="homecontent">
      <router-view></router-view>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      isCollapse: false,

    }
  },
  created() {
    this.$router.push('/notemanager')
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    collapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
@import '../../static/scss/cover';
$high-color:#5272f9;
.home-wrapper{
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
      border-right: 1px solid rgba(238, 241, 146, 0.3);
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
      .verticalline {
        line-height: 60px;
        padding: 0 24px;
      }
    }
  }
}
.content-wrapper{
  display: flex;
  position: absolute;
  top:60px;
  bottom: 0;
  width: 100%;
.slideaside {
  }
.homecontent {
  padding: 20px;
  flex:1;
  }
}
}
</style>
