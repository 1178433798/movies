<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="数量分析" name="first"><ana1 /></el-tab-pane>
      <el-tab-pane label="品质分析" name="second"><ana2 /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ana1 from '../components/ana1.vue'
import ana2 from '../components/ana2.vue'
export default {
  name: 'Analyse',
  components: {
    ana1,
    ana2
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style>
.el-tabs{
  padding-left: 20px;
}
</style>
