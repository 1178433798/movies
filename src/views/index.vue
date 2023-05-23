<template>
  <div>
    <navigatebar />
    <iheader />
    <div class="content">
      <router-view class="views" />
    </div>
  </div>
</template>

<script>
import navigatebar from '../components/navigatebar.vue'
import iheader from '../components/iheader'
export default {
  name: 'Name',
  components: {
    navigatebar,
    iheader
  }
}
</script>

<style>
.content{
    position: absolute;
    left: 200px;
    width: 88.3%;
    height: 92vh;
    top: 55px;
}
.views{
 height: 100%;
 overflow: auto;
}
</style>
