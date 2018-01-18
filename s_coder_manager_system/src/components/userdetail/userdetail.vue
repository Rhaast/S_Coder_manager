<<template>
<div class="userdetail">
    <el-dialog title="用户信息" :data="tableData3" :visible.sync="dialogFormVisible" class="handIn" style="z-index:99">
		用户名：
		<el-input v-model="userName" placeholder="请输入用户名"></el-input>
        <div style="height:20px"></div>
        	密码：
       <el-input v-model="password" placeholder="请输入密码"></el-input>
        <div style="height:20px"></div>
        昵称：
        <el-input v-model="nickName" placeholder="请输入昵称"></el-input>
        <div style="height:20px"></div>
        电话：
        <el-input v-model="mobile" placeholder="请输入电话"></el-input>
        <div style="height:20px"></div>
        邮箱：
        <el-input v-model="email" placeholder="请输入邮箱"></el-input>
        <div style="height:20px"></div>
        用户id：
        <el-input v-model="userid" placeholder="请输入邮箱"></el-input>
        <div style="height:20px"></div>
        创建时间：
        <el-input v-model="createTime" placeholder="请输入邮箱"></el-input>
        <div style="height:20px"></div>
  <el-radio v-model="radio" label=1>Male</el-radio>
  <el-radio v-model="radio" label=0>Female</el-radio>
		<div slot="footer" class="dialog-footer">
		<el-button @click="dialogFormVisible = false">取 消</el-button>
		<el-button type="primary">确 定</el-button>
		</div>
		</el-dialog>
<div class="md-overlay" v-if="dialogFormVisible" @click="closemd"></div>
  </div>
</template>
<<script>
import axios from 'axios';
export default {
  props:{
    id : String
  },
  data(){
      return{
        dialogFormVisible:false,
        tableData3:{},
        userName:'',
        createTime:'',
        email:'',
        userid:'',
        mobile:'',
        nickName:'',
        password:'',
        radio:'1'

      }
  },
  created () {
    this.getid()
  },
  methods: {
    closemd(){
      this.dialogFormVisible = false;
      alert(11)
    },
      getid(){
        let that = this;
        axios({
        url: 'http://xyiscoding.top/studyapp/user/findById/' + this.id, // 传入userId获取自己的数据
        dataType: 'json',
        method: 'get',
      }).then((res)=>{
        that.tableData3=res.data.detail;
        that.userName = that.tableData3.userName
        that.password = that.tableData3.password
        that.nickName = that.tableData3.nickName
        that.mobile = that.tableData3.mobile
        that.email = that.tableData3.email
        that.radio = that.tableData3.sex.toString()
        that.userid = that.tableData3.id
        that.createTime = that.tableData3.createTime
        console.log(this.sex)

      })
      },
      showdetail(){
          this.dialogFormVisible=true
      }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.userdetail {
.md-overlay {
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
}


</style>

