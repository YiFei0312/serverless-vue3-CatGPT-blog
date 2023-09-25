<template>
  <div>
    <h1>{{ article.articleTitle }}</h1>
    <van-divider>最后一次修改时间</van-divider>
    <p>{{ article.createTime }}</p>
    <van-divider>文本</van-divider>
    <div v-html="article.articleContent" class="text"></div>
  </div>
  <van-floating-bubble icon="chat" @click="like(article.id, article.likeNum)">
    <div class="background"></div>
    <div class="heart"></div>
    <div class="number">{{ article.likeNum }}</div>
  </van-floating-bubble>
</template>

<script>
import request from "../util/request";

export default {
  data() {
    return {
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
        createTime: new Date(),
        updateTime: "",
        articleStatus: "",
        delFlag: 0,
      },
      articleId: "",
      userName: "",
    };
  },
  created() {
    this.articleId = this.$cookies.get("articleId");
    // this.userName = Cookies.get("userName");
    // this.articleId = Cookies.get("articleId");
    // console.log("read",this.ReadArticleId)
    // this.articleId=this.ReadArticleId
    this.init(this.articleId);
  },
  methods: {
    //回主页
    tohome() {
      this.$router.push("/home");
    },
    //点赞
    async like(articleId, likeNum) {
      let res = await request.get(
        "/article/likearticle/" + articleId + "/" + likeNum
      );
      this.init(articleId);
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
    async init(articleId) {
      //调用后端接口请求article
      let res = await request.get("/article/getOne/" + articleId);
      //从res获取数据
      if (res.data.code == 200) {
        this.article = res.data.article;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 23px;
  font-weight: bold;
  margin: 20px 20px;
  text-indent: 2em;
}

p {
  font-size: 14px;
  color: #575151a9;
  margin-bottom: 10px;
}

div {
  line-height: 1.5;
}
.text {
  text-indent: 2em;
  font-size: 20px;
  margin: 15px 15px;
}
.heart {
  position: absolute;
  margin: auto;
  top: 7px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  height: 25px;
  width: 25px;
  transform: rotate(-45deg);
}

.heart::after {
  background-color: rgb(255, 255, 255);
  content: "";
  border-radius: 50%;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 0px;
  left: 12px;
}

.heart::before {
  content: "";
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  position: absolute;
  width: 25px;
  height: 25px;
  top: -12px;
  left: 0px;
}

.background {
  height: 999px;
  width: 999px;
  background-color: #e54818;
}
.number {
  position: absolute;
  z-index: 99999;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.721);
  font-weight: 700;
}
</style>
