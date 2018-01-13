<template>
  <div>
    <div class="listheader">
      <el-button type="danger" @click="deletechoose" :disabled="forbidden">删除选中</el-button>
      <div class="el-input" style="width: 360px; float: right;">
      <i class="el-input__icon el-icon-search"></i>
	 <input type="text" placeholder="输入用户昵称" v-model="userName"
      class="el-input__inner" style="width: 180px;" @keyup.enter="findcomment($event)">
      </div>
    </div>
    <div class="listbody">
      <el-table ref="multipleTable" :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark" style="width:100%;
    " @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="评论id" width="300">
        </el-table-column>
	    <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" width="300" sortable>
        </el-table-column>
        <el-table-column prop="commentUser" label="评论人" width="120">
        </el-table-column>
        <el-table-column prop="content" label="评论内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
	    :background="true"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="totalData3Number">
    </el-pagination>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      tableData3: [
        {
          createTime: "",
          commentUser: "",
          content: "",
          id: ""
        }
      ],
      totalData3Number: 0,
      multipleSelection: [],
      forbidden: true,
      userName: "",
      fullscreenLoading: false
    };
  },
  created() {},
  methods: {
    // handleSizeChange: function (size) {
    //     this.pagesize = size;
    // },   //pageSize 改变时会触发
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        // currentPage 改变时会触发
    },
    findcomment(pageNum, pageSize) {
      let that = this;
      if (this.userName == "") {
        this.$message({
          message: "昵称不能为空",
          type: "warning"
        });
      }
      axios({
        url: "http://xyiscoding.top/studyapp/comment/my/" + this.userName,
        method: "get",
        dataType: "json"
      }).then(res => {
        if (!res.data.detail.length == 0) {
          that.tableData3 = res.data.detail;
          that.totalData3Number = res.data.detail.length;
          console.log(this.totalData3Number);
          this.userName = this.userName;
        } else {
          this.$message.error("暂时没有数据");
        }
      });
    },
    // 删除选中的
    deletechoose() {
      console.log(this.multipleSelection);
      // deleteRequest(selectedItem.id) // 删除请求
      this.$confirm("此操作将删除选中的评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.multipleSelection.forEach(selectedItem => {
            axios({
              url:
                "http://xyiscoding.top/studyapp/comment/delete/" +
                selectedItem.id,
              method: "get",
              dataType: "json"
            }).then(res => {
              this.findcomment();
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
    lastpage() {
      if (this.pageNo == 0) {
        return;
      } else {
        this.pageNo--;
        this.getArticle();
        console.log(this.pageNo);
      }
    },
    nextpage() {
      if (this.tableData3.length < this.pageSize) {
        this.$message("没有更多的内容");
      } else {
        this.pageNo++;
        this.getArticle();
        console.log(this.pageNo);
      }
    },
    //时间格式化
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
    // 删除单条评论
    handleDelete: function(index) {
      let that = this;
      that.id = this.tableData3[index].id; //获取当前选中的评论id
      console.log(this.id);
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "http://xyiscoding.top/studyapp/comment/delete/" + this.id,
            method: "get",
            dataType: "json"
          }).then(res => {
            this.findcomment();
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
    }
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../../static/scss/cover";
.listheader {
  text-align: left;
  .el-input {
    .el-input__icon {
      position: absolute;
      right: 18px;
      float: right;
    }
    .el-input__inner {
      float: right;
    }
  }
}
.pagination{
  margin-top: 50px;
}

.listbody {
  margin-top: 50px;
}

.pagination {
  margin-top: 50px;
}
</style>
