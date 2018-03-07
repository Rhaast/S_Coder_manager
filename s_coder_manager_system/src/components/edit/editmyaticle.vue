<<template>
<div>
 <div id="editor">
    <mavon-editor style="height: 100%" v-model="content" ref='md' @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
    <button @click="uploadimg" class="uploadimg">uploadImg</button>
</div>
<el-button class="sub-article" type="primary" @click="dialogFormVisible = true">发表<i class="el-icon-upload2 el-icon--right"></i></el-button>
	<el-dialog title="用户信息" :visible.sync="dialogFormVisible" class="handIn">
		标题：
		<el-input v-model="title" placeholder="请输入标题"></el-input>
		<div slot="footer" class="dialog-footer">
		<el-button @click="dialogFormVisible = false">取 消</el-button>
		<el-button type="primary" @click="subArticle">确 定</el-button>
		</div>
		</el-dialog>
    </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      dialogFormVisible: false,
      content: "",
      userId: "",
      nickName: "",
      title: "",
      img_file: {},
      id:'',
      createTime:''
    };
  },
   computed: {    //获得vuex里的状态
    ...mapGetters([
      'getUserInfo'
      // ...
    ])
  },
  created () {
      this.getnoteid()
  },
  methods: {
    getnoteid() {
     let that = this // 取得笔记id
     that.id = this.$route.query.id;
     that.noteid = that.id;
     console.log(this.noteid);
      axios({
        url: 'http://xyiscoding.top/studyapp/note/findById/' + that.noteid,
        dataType: 'json',
        method: 'get',
      }).then((response)=>{
        that.noteLists = response.data.detail.note;
        that.content = that.noteLists.content;
        that.title = that.noteLists.title;
        that.userId = that.noteLists.userId;
        that.userName = that.noteLists.userName;
        console.log(this.noteLists)
      })

    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 缓存图片信息
      console.log(pos);
      this.img_file[pos] = $file;
      console.log(this.img_file);
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    uploadimg($e) {
      let that = this;
      // 第一步.将图片上传到服务器.
      // var formdata = new FormData();
      for (var _img in this.img_file) {
        // alert(_img); //获取原图片标志（./0）
        // formdata.append(_img, this.img_file[_img]);
        (myimg => {
          axios
            .post(
              "http://xyiscoding.top/studyapp/note/updateImg",
              qs.stringify({ img: this.img_file[myimg].miniurl })
            )
            .then(res => {
              if (res.status == 200) {
                //  console.log("http://xyiscoding.top/img/"+res.data.detail);
                console.log(res);
              }
              that.picmessage = res.data.detail;
              /**
                 * 例如：返回数据为 [[pos: url], [pos, url]...]
                 * pos 为原图片标志（./0）
                 * url 为上传后图片的url地址
                 */
              // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)

              this.$refs.md.$img2Url(
                myimg,
                "http://xyiscoding.top/img/" + res.data.detail
              );
            });
        })(_img); //闭包
      }
    },
    subArticle() {
        let that = this;
        let userInfo = this.getUserInfo;
        console.log(userInfo)
        that.userId = userInfo.user.id;
        that.nickName = userInfo.user.nickName;
      if (!this.title) {
        this.$message.error("文章标题不能为空");
        return;
      }
      if (!this.content) {
        this.$message.error("文章内容不能为空");
        return;
      }
     that.createTime =Date.parse(new Date());
      axios({
        url: "http://xyiscoding.top/studyapp/note/update",
        method: "post",
        dataType: "json",
        data: {
          title: this.title,
          content: this.content,
          userId: this.userId,
          userName: this.userName,
          id:this.id,
          createTime:this.createTime
        }
      }).then(res => {
        if (res.data.result == "200") {
          this.$message({
            message: "更改成功",
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
  .uploadimg{
    float: left;
    width: 89px;
    height: 40px;
    border-radius: 6px;
    background: #5272f9;
    border: none;
    color: #fff;
    margin-top: 20px;
    &:focus{
    background-color:#6d89ff;
    outline:none;
    border-radius: 6px;  
    border-color:#6d89ff;
    }
    &:hover{
     background-color:#6d89ff;
     border-color:#6d89ff;
    }
  }
}
.sub-article {
  float: right;
  margin-top: 20px;
}
.handIn {
  text-align: left;
}
</style>