<template>
  <div class="all">
    <mes />
  </div>
</template>

<script>
import mes from '../components/mes'
export default {
  name: 'Usermes',
  components: {
    mes
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style>
.all{
  overflow-y: auto;
}
.el-tabs{
  padding-left: 20px;
}

</style>
