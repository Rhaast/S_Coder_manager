<template>
  <div>
    <div class="bannerheader">
      <el-button type="primary" @click="dialogFormVisible = true"><i class="el-icon-plus"></i>新增</el-button>
      <el-button type="danger" :disabled="chooese" @click="deletechoose">删除选中</el-button>
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
        <el-table-column prop="id" label="id" width="500">
        </el-table-column>
        <el-table-column prop="name" label="name" width="500">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    	<el-dialog title="用户信息" :visible.sync="dialogFormVisible" class="handIn">
		标题：
		<el-input v-model="id" placeholder="请输入角色id"></el-input>
        <div style="height:30px"></div>
        <el-input v-model="name" placeholder="请输角色名"></el-input>
        <div style="height:30px"></div>
		<div slot="footer" class="dialog-footer">
		<el-button @click="dialogFormVisible = false">取 消</el-button>
		<el-button type="primary" @click="registerrole">确 定</el-button>
		</div>
		</el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      tableData3: [],
      chooese: true,
      dialogFormVisible: false,
      id: "",
      name: ""
    };
  },
  created() {
    this.getroles();
  },
  methods: {
    // 删除选中的
    deletechoose() {
      console.log(this.multipleSelection);
      // deleteRequest(selectedItem.id) // 删除请求
      this.$confirm("此操作将删除选中的角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.multipleSelection.forEach(selectedItem => {
            axios({
              url:
                "http://xyiscoding.top/studyapp/role/delete/" +
                selectedItem.id,
              method: "get",
              dataType: "json"
            }).then(res => {
              this.getroles();
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDelete: function(index) {
      let that = this;
      that.id = this.tableData3[index].id; //获取当前选中的评论id
      console.log(this.id);
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "http://xyiscoding.top/studyapp/role/delete/" + this.id,
            method: "get",
            dataType: "json"
          }).then(res => {
            this.getroles();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      if (this.multipleSelection.length != 0) {
        this.chooese = false;
      } else {
        this.chooese = true;
      }
    },
    registerrole() {
      if (!this.id) {
        this.$message.error("文章标题不能为空");
        return;
      }
      if (!this.name) {
        this.$message.error("userId不能为空");
        return;
      }
      let that = this;
      axios({
        url: "http://xyiscoding.top/studyapp/role/add",
        method: "post",
        dataType: "json",
        data: {
          id: this.id,
          name: this.name
        }
      }).then(res => {
        if (res.data.result == "200") {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.cce = setTimeout(() => {
            this.dialogFormVisible = false;
          }, 2000);
          this.getroles();
        } else {
          this.$message.error("用户信息填写错误");
        }
      });
    },
    getroles() {
      let that = this;
      axios({
        url: "http://xyiscoding.top/studyapp/role/getAll",
        dataType: "json",
        method: "get"
      }).then(res => {
        that.tableData3 = res.data.detail;
        console.log(this.tableData3);
      });
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
.handIn {
  text-align: left;
}
</style>
