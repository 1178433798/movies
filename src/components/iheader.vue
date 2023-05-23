<template>
  <div>
    <div class="iheader">
      <h2 class=" animate__animated animate__backInRight sysname">电影系统</h2>
      <span class="pagename">{{ $route.meta.name }}</span>
      <div class="option">
        <i class="el-icon-user-solid" />
        <span>{{ username }}</span>
        <span style="marginLeft:20px" />
        <i
          class="el-icon-switch-button"
        />
        <span class="exit" @click="exit">退出</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Iheader',
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.$route)
      this.username = localStorage.getItem('name')
    },
    exit() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>
.sysname{
position: absolute;
border-bottom: 1px solid rgb(0,0,0,0.2);
box-sizing: border-box;
height: 53px;
color:#330867;
margin-left: 20px;
}
.pagename{
     position: absolute;
     left: 45%;
}
.iheader{
    position: absolute;
    top: 0;
    width: 100%;
    height: 55px;
    border-bottom: 3px solid rgb(0,0,0,0.2);
    line-height:55px;
    padding-right: 30px;
    box-sizing: border-box;
background-image: linear-gradient(120deg, #5ee7df 0%, #b490ca 100%);
}

.option{
 text-align: right;
}
.exit{
    cursor: pointer;
}
</style>
