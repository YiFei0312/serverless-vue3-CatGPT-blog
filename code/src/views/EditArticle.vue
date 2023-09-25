<template>
  <div>
    <div class="edit">修改文章</div>
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
    <van-button color="linear-gradient(to right, #e0c3fc, #8ec5fc)" @click="addArticle()">修改文章</van-button>
  </div>
  </div>
</template>
<script>
import request from "../util/request";
export default {
  data() {
    return {
      categoryList: [],
      article: {
        id: -1,
        articleTitle: "",
        articleContent: "",
        articleSummary: "",
        categoryId: "",
        articleLogo: "",
        accessNum: "",
        rebackNum: "",
        likeNum: "",
        createBy: "",
        createTime: "",
        updateTime: new Date(),
        articleStatus: 0,
        delFlag: 0
      },
      articleId: "",
      userName: ""
    };
  },
  created() {
    this.userName = this.$cookies.get("userName");
    this.articleId = this.$cookies.get("articleId");
    this.getAllcategory();
    this.init(this.articleId);
  },
  methods: {
    //回主页
    tohome() {
      this.$router.push("/index");
    },
    async getAllcategory() {
      let res = await request.post("/category/categoryList");
      if (res.data.code == 200) {
        this.categoryList = res.data.categoryList;
      }
    },
    async updateArticle() {
      let res = await request.post("/article/update", this.article);
      if (res.data.code == 200) {
        this.$message.success("更新文章成功");
        //页面跳转
        this.$router.push("/myarticlelist");
      } else {
        this.$message.error("更新失败");
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
    async init(articleId) {
      //调用后端接口请求article
      let res = await request.get("/article/getOne/" + this.$cookies.get("articleId"));
      //从res获取数据
      if (res.data.code == 200) {
        this.article = res.data.article;
      }
    }
  }
};
</script>  
<style  scoped>
.edit{
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