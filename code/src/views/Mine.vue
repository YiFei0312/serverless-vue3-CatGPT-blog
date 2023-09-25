<template>
<div class="gongju">
<div class="information">
    <div v-if="user.id" class="outlogin">
      <van-button plain type="primary" @click="outlogin" >退出登录</van-button>
    </div>
    <div class="avatar-container">
      <img v-if="!user.id" src="../assets/img/head_portrait.jpg" alt="缺失" class="img"  @click="showPopup" />
      <img v-if="user.id" src="../assets/img/head_portrait1.jpg" alt="缺失" class="img"  @click="showPopup"/>
      <span class="wdname">{{ user.name }}</span>
    </div>
    <div class="info">
      <div class="contact">
        <div class="contact-item">
          <span>Email : {{ user.email }}</span>
      </div>
        <div class="contact-item">
          <span>电话： {{ user.phone }}</span>
        </div>

      </div>

    </div>
</div>
<div>
<div class="wenzhang">
<van-cell-group>
  <van-dropdown-menu ref="menuRef">
    <van-dropdown-item title="文章" ref="itemRef">
      <div v-for="item in articleList" v-if="user.id" style="width: 80%;">
        <van-cell>
          <text class="wentext">{{ item.articleTitle}}</text>
          <template #right-icon>
            <van-button type="primary" block round @click="onConfirm(item.id)" style="width:3px;float:left">
              修改</van-button>
          </template>
        </van-cell>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
</van-cell-group>
</div>

<van-cell-group>
  <div class="tianjia">
    <van-button color="linear-gradient(to right, #fbc2eb, #a6c1ee)" @click="AddArticle" style="width: 120px;">添加文章</van-button>
  </div>
</van-cell-group>

<van-popup v-model:show="show" closeable :style="{ }">
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="state.userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="state.userPwd"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 18px;">
      <van-button round block type="primary" native-type="submit" >提交</van-button>
    </div>
  </van-form>
</van-popup>
</div>
</div>
</template>

<script>
import { Popup } from "vant";
import VueCookies from "vue-cookies";
import { onMounted } from "vue";
import { ref, reactive } from "vue";
import { showNotify, closeNotify } from "vant";
import request from "../util/request";
import AddArticle from "./AddArticle.vue";
export default {
setup() {
  const show = ref(false);
  const showPopup = () => {
    show.value = true;
  };
  const state = reactive({
    userName: "",
    userPwd: ""
  });
  const user = reactive({
    id: "",
    name: "一个寂寞的邢代豪",
    email: "",
    phone: ""
  });
  const onSubmit = async values => {
    console.log(state);
    let res = await request.post("/user/login", state);
    if (res.data.code == 200) {
      user.name = state.userName;
      user.id = res.data.id;
      show.value = false;
      let res1 = await request.get("user/getOne/" + user.id);
      if (res1.data.code == 200) {
        user.email = res1.data.user.userEmail;
        user.phone = res1.data.user.userPhone;
      }
      console.log(user.id);
      $cookies.set("id", user.id);
      $cookies.set("userName", user.name);
      $cookies.set("userEmail", user.email);
      $cookies.set("userPhone", user.phone);
    } else {
      showNotify("密码错误");
    }
  };
  const outlogin = () => {
    user.id ="";
    user.name = "一个寂寞的邢代豪";
    user.email = "";
    user.phone = "";
    $cookies.set("id",user.id);
    $cookies.set("userName","一个寂寞的邢代豪");
    $cookies.remove("userEmail");
    $cookies.remove("userPhone");
  };
  return {
    show,
    state,
    user,
    showPopup,
    onSubmit,
    outlogin
  };
},
data() {
  return {
    pageParam: {
      //传递给后端接口的参数
      pageNum: 1,
      pageSize: 4,
      keyword: ""
    },
    articleList:[],
    imgList: [
      "../assets/img/head_portrait.jpg",
      "../assets/img/head_portrait1.jpg",
      "../assets/img/head_portrait2.jpg",
      "../assets/img/head_portrait3.jpg"
    ],
    writerList: ["标题1", "标题2", "标题3"]
  };
},
created() {
  this.user.id=this.$cookies.get("id");
  this.user.name=this.$cookies.get("userName");
  this.user.email=this.$cookies.get("userEmail");
  this.user.phone=this.$cookies.get("userPhone");
  this.init();
  console.log(this.articleList);
},
methods: {
  AddArticle(){
    this.$cookies.set("userName",this.user.name);
    this.$cookies.set("userId",this.user.id)
    this.$router.push("/addarticle");
  },
  async init() {
    this.pageParam.keyword=this.$cookies.get("id");
    //调用后端接口请求articleList
    let res = await request.post("/article/listbycreater", this.pageParam);
    //从res获取数据
    if (res.data.code == 200) {
      console.log(123,res);
      this.articleList = res.data.articleList;
      this.total = res.data.total;
    }
  },
  onConfirm(articleId){
    this.$cookies.set("articleId", articleId);
    this.$router.push("/editarticle");

  }
},
components: {
  [Popup.name]: Popup
}
};
</script>

<style>
.gongju{
  width: 100%;
display: flex;
flex-direction: column;
}
.avatar-container{
width: 100%;
height: 100px;
float: left;
font-size: 30px;
}
.img {
width: 100px;
height: 100px;
}
.wdname{
height: 50px;
padding:0px 0px 10px 30px;
font-size: 30px;
}
/* .name{
font-size: 50px;
} */
/* .profile {
width: 100%;
height: 110px;
padding: 10px;
} */
.outlogin{
width: 80px;
height: 10px;
float: right;
font-size: 1px;
}
.outlogin.button{
width: auto;
height: 10px;

}

.avatar {
width: 100px;
height: 100px;
border-radius: 50%;
object-fit: cover;
}

.info {
margin-left: 2px;
float: right;
}

.wenzhang{

}
.wentext{
  float: left;
  width: 50%;
}

.contact {
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  margin-top: 1px;
  float: right;
}
.contact-item {
display: flex;
align-items: center;
margin-bottom: 1px;
}
.tianjia{
  padding-left:130px ;
}

.information {
width: 100%;
top: 0px;
right: 0px;
z-index: 1;
background-color: rgba(157, 180, 201, 0.699);
}
</style>