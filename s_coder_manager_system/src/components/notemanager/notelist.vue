<template>
  <div>
    <div class="listheader">
      <el-button type="primary" @click="$router.push('/notemanager/addnote')"><i class="el-icon-plus"></i>新增</el-button>
      <el-button type="danger" @click="deletechoose" :disabled="forbidden">删除选中</el-button>
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
        <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" width="300" sortable>
        </el-table-column>
        <el-table-column prop="userName" label="发布人" width="120">
        </el-table-column>
        <el-table-column prop="title" label="文章标题" show-overflow-tooltip>
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
<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      pageNo: 0,
      pageSize: 10,
      tableData3: [
        {
          createTime: "",
          userName: "",
          title: "",
          id: ""
        }
      ],
      multipleSelection: [],
      forbidden: true
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    // 删除选中的
    deletechoose() {
      console.log(this.multipleSelection);
      // deleteRequest(selectedItem.id) // 删除请求
      this.$confirm("此操作将删除选中的文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.multipleSelection.forEach(selectedItem => {
            axios({
              url:
                "http://xyiscoding.top/studyapp/note/delete/" + selectedItem.id,
              method: "get",
              dataType: "json"
            }).then(res => {
              this.getArticle();
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
    getArticle: function() {
      let that = this;
      axios({
        url: "http://xyiscoding.top/studyapp/note/findAll",
        dataType: "json",
        method: "post",
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(response => {
        that.tableData3 = response.data.detail;
        console.log(this.tableData3);
      });
    },
    // 删除单篇文章
    handleDelete: function(index) {
      let that = this;
      that.id = this.tableData3[index].id; //获取当前选中的文章id
      console.log(this.id);
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "http://xyiscoding.top/studyapp/note/delete/" + this.id,
            method: "get",
            dataType: "json"
          }).then(res => {
            this.getArticle();
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
  .el-icon-plus {
    padding-right: 6px;
    font-size: 14px;
  }
}

.listbody {
  margin-top: 50px;
}

.pagination {
  margin-top: 50px;
}
</style>
