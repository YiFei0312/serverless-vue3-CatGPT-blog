

<template>
  <!-- 顶栏开始 -->
  <div class="header">
    <div class="header-text">博客</div>
    <div class="search">
      <van-search v-model="key" shape="round" @update:model-value="searchbytitle()" background="#87CEFA" placeholder="请输入搜索关键词" />
    </div>
  </div>
  <!-- 顶栏结束 -->
  <!-- 文章列表开始 -->
  <div class="writerlist">
    <div v-for="item in articleList" :key="item.id" class="kuang" @click="toReadArticle(item.accessNum,item.id)">
      <div class="title">
        <!-- <router-link to="/readarticle"> -->
          {{ item.articleTitle }}
      <!-- </router-link> -->
      </div>
      <slot class="leirong">
        <van-text-ellipsis
          rows="3"
          :content="item.articleSummary"
          expand-text="展开"
          collapse-text="收起"/>
      </slot>
      <div class="wrtier"> 
        {{ item.user.userName }}
      </div>

    </div>
  </div>
  <!-- 文章列表结束 -->
  <div class="fanye">
    <van-pagination v-model="pageParam.pageNum" :total-items="total" :items-per-page="pageParam.pageSize"  @click="init"/>

  </div>
</template>


<script>
// import Card from "../components/Card.vue";
import request from "../util/request";

export default {
  data() {
    return {
      imageUrl: "", //图片地址
      categoryList:[],
      articleList: [],
      total: 0, // 总记录数
      pageParam: {
        //传递给后端接口的参数
        pageNum: 1,
        pageSize: 4,
        keyword: ""
      },
      userName: "",
      userId: "",
      userRole:"",
      colorList:['#83ddf8f8', '#a3ffcd','#895DE6','#E46267','#E69030','#66C8BC'],
      key:"",
    };
  },
  created() {
    this.init();
    // //从cookies中取值
    // this.userName = this.$cookie.get("userName");
    // this.userId = this.$cookie.get("userId");
    // this.userRole=this.$cookie.get("userRole")
    // this.imageUrl =
    // //   "http://localhost:80/image/blog_img/user/" + this.$cookie.get("userImg");
    // this.getcategory();
  },
  computed:{

  },
  methods: {
    listColor(id){
      const ty=id%6;
      return this.colorList[ty];

    },
    //跳转文章页面将文章id存入cookie
async toReadArticle  (accessNum, articleId) {
  this.ReadArticleId=articleId;
// this.$cookie.set("accessNum", accessNum);
let res = await request.get(
"/article/accessarticle/" + articleId + "/" + accessNum
);
this.$cookies.set('articleId',articleId,'7d')

// this.$cookie.set("articleId", articleId);
console.log(
"已将articleId存入cookie，articleId和访问数为：",
articleId,
accessNum + 1
);
console.log(this.$cookies.get('articleId'))
this.$router.push("/readarticle");
},
    //根据标题内容模糊搜索
    async searchbytitle() {
      //调用后端接口请求articleList
      this.pageParam.keyword=this.key;
      let res = await request.post("/article/listbytitle", this.pageParam);
      //从res获取数据
      if (res.data.code == 200) {
        this.articleList = res.data.articleList;
        this.total = res.data.total;
        console.info(this.userRole);
      }
    },
    async getcategory(){
      let res = await request.post("/category/categoryList");
      if (res.data.code == 200) {
        this.categoryList = res.data.categoryList;
        console.info(this.categoryList);
      }
    },
    search(category) {
      this.pageParam.keyword=category;
      this.pageParam.pageNum = 1;
      this.init();
    },
    async init() {
      //调用后端接口请求articleList
      let res = await request.post("/article/list", this.pageParam);
      //从res获取数据
      if (res.data.code == 200) {
        this.articleList = res.data.articleList;
        this.total = res.data.total;
      }
    },
    clickMenu(path) {
      this.$router.push(path).catch(err => {});
    },
    handleCommand(command) {
      if (command == "addarticle") {
        this.$router.push("/addarticle");
      }
      if (command == "myarticle") {
        this.$router.push("/myarticlelist");
      }
      if (command == "logout") {
        localStorage.removeItem("userName");
        this.$cookie.remove("userName");
        this.$router.push("/login");
      }
    },
    // pageNum改变调用的函数
    handleCurrentChange(val) {
      // console.log(val)
      this.pageParam.pageNum = val;
      this.init();
    },
    // pageSize改变调用的函数
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.init();
    }
  },
};
</script>

<style scoped>
.header{
    width: 100%;
    height: 2rem;
    position: fixed;
    background-color: white;
    top: 0;
}
.search{
  width: 100%;
  position: fixed;
  top: 50px ;
  right: 0;
}
.writerlist{
  padding: 110px 10px 50px 10px;
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around ; 
  margin: 10px;
}

.kuang{
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
  font-size: 15px;

}
.leirong{
  font-size: 12px;
}
.wrtier{
  font-size: 13px;
}
.fanye{
  width: 60%;
  height: 20px;
  position: fixed;
  bottom: 65px;
  left: 60px;
  right: 0;
}
</style>