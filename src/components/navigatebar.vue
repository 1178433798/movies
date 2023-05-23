<template>
  <div>
    <!-- background-color="rgb(88,194,39)"
      text-color="#fff"
      active-text-color="#ffd04b" -->

    <el-menu
      default-active="pageOne"
      router
      text-color="#330867"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="home">
        <i class="el-icon-house" />
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item el-submenu index="China">
        <template slot="title">
          <i class="el-icon-medal-1" />
          <span slot="title">热门电影</span>
        </template>
      </el-menu-item>
      <!-- <el-menu-item index="videos">
        <i class="el-icon-data-analysis" />
        <span slot="title">電影</span>
      </el-menu-item> -->
      <el-menu-item index="usermes">
        <i class="el-icon-sugar" />
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    position: absolute;
    width: 200px;
    height: 92.5vh;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 53px;
  }
  .el-menu{
/* background-image: linear-gradient(120deg, #5ee7df 0%, #b490ca 100%); */
background-image: linear-gradient(120deg, #7af1f1 0%, #7af1f1 100%);

  }
</style>

<script>
export default {
  name: 'Navigatebar',
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
