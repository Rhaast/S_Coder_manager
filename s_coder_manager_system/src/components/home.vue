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
          <span class="username">admin</span>
          <span class="verticalline">|</span>
          <span class="loginstatus">注销</span>
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
export default {
  name: "HelloWorld",
  data() {
    return {
      isCollapse: true,
      isActive: ""
    };
  },
  methods: {
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
