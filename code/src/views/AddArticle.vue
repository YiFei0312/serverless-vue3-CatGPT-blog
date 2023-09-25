<template>
  <div>
    <div class="add">添加文章</div>
    <van-cell-group inset>
      <van-field
        v-model="article.articleTitle"
        rows="2"
        autosize
        label="标题"
        type="textarea"
        maxlength="30"
        placeholder="请输入标题"
        show-word-limit
      />
      <van-field
        v-model="article.articleSummary"
        rows="2"
        autosize
        label="简介"
        type="textarea"
        maxlength="50"
        placeholder="请输入简介"
        show-word-limit
      />
      <van-field
        v-model="article.articleContent"
        rows="2"
        autosize
        label="内容"
        type="textarea"
        maxlength="1000"
        placeholder="请输入内容"
        show-word-limit
      />
    </van-cell-group>
    <div class="article">
    <van-button color="linear-gradient(to right, #e0c3fc, #8ec5fc)" @click="addArticle()" >上传文章</van-button>
  </div>
  </div>
</template>

<script>
import request from "../util/request";
export default {
  data() {
    return {
      categoryList: [],
      imageUrl: "",
      article: {
        id: -1,
        articleTitle: "",
        articleContent: "",
        articleSummary: "",
        categoryId: "",
        articleLogo: "",
        accessNum: 0,
        rebackNum: 0,
        likeNum: 0,
        createBy: "",
        createTime: new Date(),
        updateTime: "",
        articleStatus: 0,
        delFlag: 0
      },
      addRules: {
        articleTitle: [
          { required: true, message: "请输入标题名称", trigger: "blur" }
        ],
        articleContent: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        articleSummary: [
          { required: true, message: "请输入概要", trigger: "blur" }
        ]
      },
      articleId: "",
      userName: "",
      userId: ""
    };
  },
  created() {
    this.userName = this.$cookies.get("userName");
    this.userId = this.$cookies.get("userId");
    this.article.createBy = this.userId;
    this.getAllcategory();
    this.init();
  },
  methods: {
    //回主页
    tohome() {
      this.$router.push("/mine");
    },
    async getAllcategory() {
      let res = await request.post("/category/categoryList");
      if (res.data.code == 200) {
        this.categoryList = res.data.categoryList;
      }
    },
    addArticle() {
      // validate表单验证
      this.$refs["registerForm"].validate(async flag => {
        if (flag) {
          let res = await request.post("/article/add", this.article);
          console.log(res);
          if (res.data.code != 200) {
            this.$message.error("添加失败");
            return;
          }
          this.init();
          this.$message.success("添加成功");
          return;
        }
        this.$message.error("表单验证失败");
      });
    },
    //-----
    //文件上传成功执行的函数
    handleAvatarSuccess(res) {
      console.info("文件上传后，返回的数据:");
      console.info(res);
      // res就是后端controller层传递的ResultModel值
      //修改图片src属性值
      this.imageUrl = "http://localhost:80/" + res.src;
      //修改表单中数据
      this.article.articleLogo = res.imgTitle;
    },
    //文件上传之前的函数 file，就是你选中的图片文件
    beforeAvatarUpload(file) {
      if (file.type !== "image/jpeg") {
        this.$message.error("图片只支持JPG格式!");
        return false;
      } else if (file.size / 1024 / 1024 > 2) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
      return true;
    },
    async addArticle() {
      let res = await request.post("/article/add", this.article);
      if (res.data.code == 200) {
        this.$message.success("上传文章成功");
        //页面跳转
        this.$router.push("/index");
      } else {
        this.$message.error("上传失败");
      }
    },
    handleCommand(command) {
      if (command == "logout") {
        if (localStorage.userName) {
          localStorage.removeItem("userName");
          next();
        } else {
          this.$cookie.remove("userName");
          this.$router.push("/login");
        }
      }
    },
    //时间格式化
    formatDate(row, column) {
      // 获取单元格数据
      let datac = row[column.property];
      let dtc = new Date(datac);
      //获取月,默认月份从0开始
      let dtuMonth = dtc.getMonth() + 1;
      //获取日
      let dtuDay = dtc.getDate();
      //处理1-9月前面加0
      if (dtuMonth < 10) {
        dtuMonth = "0" + (dtc.getMonth() + 1);
      }
      //处理1-9天前面加0
      if (dtuDay < 10) {
        dtuDay = "0" + dtc.getDate();
      }
      //获取小时
      let dtuHours = dtc.getHours();
      //处理1-9时前面加0
      if (dtuHours < 10) {
        dtuHours = "0" + dtc.getHours();
      }
      //获取分钟
      let dtuMinutes = dtc.getMinutes();
      //处理1-9分前面加0
      if (dtuMinutes < 10) {
        dtuMinutes = "0" + dtc.getMinutes();
      }
      //获取秒
      let dtuSeconds = dtc.getSeconds();
      //处理1-9秒前面加0
      if (dtuSeconds < 10) {
        dtuSeconds = "0" + dtc.getSeconds();
      }
      //组装年月日时分秒,按自己的要求来
      let dd =
        dtc.getFullYear() +
        "/" +
        dtuMonth +
        "/" +
        dtuDay +
        " " +
        dtuHours +
        ":" +
        dtuMinutes +
        ":" +
        dtuSeconds;
      return (row.TableIsbibei = dd);
      //+ " " + dtuHours + ":" + dtuMinutes + ":" + dtuSeconds
    },
    async init() {}
  }
};
</script>
<style  scoped>
.add{
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgb(163, 217, 241);
  font-size: 30px;
}
.article{
  margin-top: 10px;
  text-align: center;
}
</style>