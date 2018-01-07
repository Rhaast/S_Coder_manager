<template>
  <div>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width:100%;
    " @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" width="300">
      </el-table-column>
      <el-table-column prop="userName" label="发布人" width="120">
      </el-table-column>
      <el-table-column prop="title" label="文章标题" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import moment from "moment";
import axios from 'axios';
export default {
  data() {
    return {
      pageNo: 0,
      pageSize: 10,
      tableData3: [{
        createTime: '',
        userName: '',
        title: ''
      }],
      multipleSelection: [],
    }
  },
  created() {
    this.getArticle();
  },
  methods: {

    //时间格式化 
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss a");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getArticle: function() {
      let that = this;
      axios({
        url: 'http://xyiscoding.top/studyapp/note/findAll',
        dataType: 'json',
        method: 'post',
        data: {
          "pageNo": this.pageNo,
          "pageSize": this.pageSize
        }
      }).then((response) => {
        that.tableData3 = response.data.detail;
        console.log(this.tableData3)
      })
    }
  }
}

</script>
