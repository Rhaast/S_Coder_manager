<template>
  <div>
    <div class="listheader">
      <el-button type="primary"  @click="dialogFormVisible = true"><i class="el-icon-plus"></i>新增</el-button>
      <el-button type="danger" :disabled="forbidden">删除选中</el-button>
      <!-- <div class="el-input" style="width: 200px; float: right;">
      <i class="el-input__icon el-icon-search"></i>
      <input type="text" placeholder="输入用户名称" v-model="searchKey" @keyup.enter="search($event)"
      class="el-input__inner">
      </div> -->
    </div>
    <div class="listbody">
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width:100%;
    " @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="用户头像" :formatter="dateFormat" width="300">
        <template slot-scope="scope">
		<img :src="'http://xyiscoding.top/img/'+ scope.row.portrait" class="myportrait" height="60" width="60" style="border-radius:50%">
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" show-overflow-tooltip>
        </el-table-column>
		 <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-button type="primary" icon="el-icon-arrow-left" @click="lastpage">上一页</el-button>
      <el-button type="primary" @click="nextpage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" class="handIn">
		注册用户：
		<el-input v-model="userName" placeholder="请输入用户名"></el-input>
        <div style="height:30px"></div>
        <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
        <div style="height:30px"></div>
        <el-input v-model="nickName" placeholder="请输入昵称"></el-input>
        <div style="height:30px"></div>
        <el-input v-model="mobile" placeholder="请输入电话"></el-input>
        <div style="height:30px"></div>
        <el-input v-model="email" placeholder="请输入邮箱"></el-input>
        <div style="height:30px"></div>
  <el-radio v-model="sex" label=1>Male</el-radio>
  <el-radio v-model="sex" label=0>Female</el-radio>
		<div slot="footer" class="dialog-footer">
		<el-button @click="dialogFormVisible = false">取 消</el-button>
		<el-button type="primary" @click="reg">确 定</el-button>
		</div>
		</el-dialog>
    <userdetail ref="showdetail"></userdetail>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
.listheader {
  text-align: left;
}
</style>
<<script>
import axios from 'axios'
import userdetail from '../userdetail/userdetail'
export default {
  data(){
	  return{
		  pageNo:0,
		  pageSize:10,
		  tableData3:[{
          createTime: "",
          userName: "",
          portrait: "",
          mobile: ""
        }],
      userName: '',
      password: '',
      nickName:'',
      mobile:'',
      email:'',
      sex:'',
		forbidden: true,
      dialogFormVisible: false,
		multipleSelection: [],
	  }
  },
  created () {
	  this.getuser();
  },
  
  methods: {
   handleEdit:function(index){
      let that = this;
      that.id = this.tableData3[index].id; //获取当前选中的评论id
      console.log(this.id);
      this.$refs.showdetail.showdetail();
      
    },
    reg() {
      var ret = /[a-zA-Z0-9]{4,10}/;
      if (!this.userName) {
        this.$message.error("用户名不能为空");
        return;
      }else if(ret.test(this.userName)){

      }else{
        this.$message.error("用户名格式不对");
        return;
      }
      if (!this.password) {
        this.$message.error("密码不能为空");
        return;
      }
      if (!this.nickName) {
        this.$message.error("昵称不能为空");
        return;
      }
      var ret = /^1\d{10}$/;
      if (!this.mobile) {
        this.$message.error("电话不能为空");
        return;
      }else if(ret.test(this.mobile)){
 
      }else{
        this.$message.error("手机号格式不对");
        return;
      }
      var ret = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
      if (!this.email) {
         this.$message.error("邮箱不能为空");
         return;
      }else if(ret.test(this.email)){

      }else{
        this.$message.error("邮箱格式不对");
        return;
      }
      if (!this.sex){
         this.$message.error("请选择性别");
         return;
      }
      let that = this;
      axios({
        url:'http://xyiscoding.top/studyapp/user/add',
        dataType:'json',
        method:'post',
        data:{
          userName:this.userName,
          password:this.password,
          nickName:this.nickName,
          mobile:this.mobile,
          email:this.email,
          sex:this.sex
        }
      }).then(res=>{
      if (res.data.result == "200") {
          this.$message({
            message: "注册成功",
            type: "success"
          });
          this.cce = setTimeout(() => {
            this.dialogFormVisible = false;
          }, 2000);
          this.getuser();
        } else {
          this.$message.error("用户名已被占用");
        }

      })
    },
	dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss a");
    },
	   handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
      if (this.multipleSelection.length != 0) {
        this.forbidden = false;
      } else {
        this.forbidden = true;
      }
    },
	  getuser(){
		  let that = this
		  axios({
			  url:'http://xyiscoding.top/studyapp/user/getAll',
			  method:'post',
			  dataType:'json',
			  data:{
				  pageNo:this.pageNo,
				  pageSize:this.pageSize
			  }

		  }).then(res=>{
			  if(res.data.result==200){
				  that.tableData3 = res.data.detail.content
				  console.log(this.tableData3)

			  }

		  })
	  },
	lastpage() {
      if (this.pageNo == 0) {
        return;
      } else {
        this.pageNo--;
        this.getuser();
        console.log(this.pageNo);
      }
    },
    nextpage() {
      if (this.tableData3.length < this.pageSize) {
        this.$message("没有更多的内容");
      } else {
        this.pageNo++;
        this.getuser();
        console.log(this.pageNo);
      }
    },
  },
  components: {
    userdetail
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
.handIn {
  text-align: left;
}
</style>

