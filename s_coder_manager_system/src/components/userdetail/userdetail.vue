<<template>
<div class="userdetail">
    <el-card class="box-card" v-show="showuserdetail">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
  </div>
</template>
<<script>
export default {
  data(){
      return{
        showuserdetail:false
      }
  },
  methods: {
      showdetail(){
          this.showuserdetail=true
      }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.userdetail {

}
</style>

