<script setup>
</script>

<template>
      <router-view />
    <el-footer>
      <div>
        <van-tabbar route>
          <van-tabbar-item replace to="/home" icon="home-o">HOME</van-tabbar-item>
          <van-tabbar-item replace to="/mine" icon="contact">MINE</van-tabbar-item>
          <van-tabbar-item replace to="/catgpt">
            CatGPT
            <template #icon="props">
              <van-icon class-prefix="icon" name="weibiaoti-q_huaban" />
            </template>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </el-footer>
</template>



<style scoped>
.test {
  height: 50px;
  width: 100px;
  background-color: aqua;

  /* 右上角 position:fixed保持 */
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
