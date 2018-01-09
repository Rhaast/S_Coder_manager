<<template>
<div>
 <div id="editor">
    <mavon-editor style="height: 100%" v-model="content" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
    <button @click="uploadimg">upload</button>
</div>
<el-button class="sub-article" type="primary" @click="dialogFormVisible = true">发表<i class="el-icon-upload2 el-icon--right"></i></el-button>
	<el-dialog title="用户信息" :visible.sync="dialogFormVisible" class="handIn">
		标题：
		<el-input v-model="title" placeholder="请输入标题"></el-input>
        <div style="height:30px"></div>
        <el-input v-model="userId" placeholder="请输入需要添加的用户id"></el-input>
        <div style="height:30px"></div>
        <el-input v-model="nickName" placeholder="请输入用户昵称"></el-input>
		<div style="height:30px;"></div>
		<div slot="footer" class="dialog-footer">
		<el-button @click="dialogFormVisible = false">取 消</el-button>
		<el-button type="primary" @click="subArticle">确 定</el-button>
		</div>
		</el-dialog>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
      content: "",
      userId: "",
      nickName: "",
      title: "",
      img_file: {}
    };
  },
  methods: {
            // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 缓存图片信息
            this.img_file[pos] = $file;
            console.log(this.img_file);
        },
        $imgDel(pos){
            delete this.img_file[pos];
        },
        uploadimg($e){
            let that = this;
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            for(var _img in this.img_file){
                formdata.append(_img, this.img_file[_img]);
            }
            axios({
                url: 'http://xyiscoding.top/studyapp/note/updateImg?img=_img',
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                 console.log(this.img_file[_img])
                 that.picmessage = res.data.detail
                 console.log(this.picmessage)
                /**
                 * 例如：返回数据为 [[pos: url], [pos, url]...]
                 * pos 为原图片标志（./0）
                 * url 为上传后图片的url地址
                 */
                 // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                for (var i in res) {
                    $vm.$img2Url 
                    // $vm.$img2Url(res[i].[0],res[i].[1]);
                }
            })
        },
    subArticle() {
      if (!this.title) {
        this.$message.error("文章标题不能为空");
        return;
      }
      if (!this.userId) {
        this.$message.error("userId不能为空");
        return;
      }
      if (!this.nickName) {
        this.$message.error("昵称不能为空");
        return;
      }
      if (!this.content) {
        this.$message.error("文章内容不能为空");
        return;
      }

      axios({
        url: "http://xyiscoding.top/studyapp/note/add",
        method: "post",
        dataType: "json",
        data: {
          title: this.title,
          content: this.content,
          userId: this.userId,
          userName: this.nickName
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
        } else {
          this.$message.error("用户信息填写错误");
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../../static/scss/cover";
#editor {
  height: 750px;
}
.sub-article {
  float: right;
  margin-top: 20px;
}
.handIn {
  text-align: left;
}
</style>
