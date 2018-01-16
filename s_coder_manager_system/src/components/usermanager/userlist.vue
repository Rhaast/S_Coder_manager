<template>
  <div>
    <div class="listheader">
      <el-button type="primary"><i class="el-icon-plus"></i>新增</el-button>
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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-button type="primary" icon="el-icon-arrow-left" @click="lastpage">上一页</el-button>
      <el-button type="primary" @click="nextpage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
.listheader {
  text-align: left;
}
</style>
<<script>
import axios from 'axios'
export default {
  data(){
	  return{
		  pageNo:0,
		  pageSize:10,
		  tableData3:[        {
          createTime: "",
          userName: "",
          portrait: "",
          mobile: ""
        }],
		forbidden: true,
		multipleSelection: [],
	  }
  },
  created () {
	  this.getuser();
  },
  
  methods: {
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
  }
}

</script>
