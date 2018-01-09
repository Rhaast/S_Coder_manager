<template>
  <div>
    <div class="bannerheader">
      <el-button type="primary" @click="$router.push('/notemanager/addnote')"><i class="el-icon-plus"></i>新增</el-button>
      <el-button type="danger" :disabled="chooese">删除选中</el-button>
    </div>
    <div class="bannerbody">
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width:100%;
    " @selection-change="handleSelectionChange">
		    <el-table-column
      type="index"
      width="50">
    </el-table-column>
        <el-table-column type="selection" width="55" sortable>
        </el-table-column>
				  <el-table-column
          label="图片" width="300">
          <template slot-scope="scope">
            <img :src='scope.row.url' style="height: 35px;vertical-align: middle;" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="300">
        </el-table-column>
        <el-table-column prop="url" label="图片地址" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
			tableData3:[],
			chooese:true
		};
  },
  created() {
		this.getpictrue();
	},
  methods: {
    handleSelectionChange(val) {
			this.multipleSelection = val;
			console.log(val)
			if(this.multipleSelection.length!=0){
				this.chooese=false;
			}else{
				this.chooese=true;
			}
    },
		getpictrue(){
			let that = this
			axios({
				url:'http://xyiscoding.top/studyapp/banner/findAll',
				method:'get',
				dataType:'json'
			}).then((response)=>{
				that.tableData3=response.data.detail;
				console.log(this.tableData3)
				

			})
		}
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../../static/scss/cover";
.bannerheader {
  text-align: left;
  .el-icon-plus {
    padding-right: 6px;
    font-size: 14px;
  }
}

.bannerbody {
  margin-top: 50px;
}

.pagination {
  margin-top: 50px;
}
</style>
