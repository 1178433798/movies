<template>
  <div v-loading="fullscreenLoading">
    <div ref="e" class="e" style="width:600px;height:600px" />
  </div>
</template>

<script>
import { type } from '../api/api'
export default {
  name: 'Typeana',
  props: {
    time: {
      type: String,
      default: '2022'
    }
  },
  data() {
    return {
      types: [],
      fullscreenLoading: false
    }
  },
  watch: {
    time: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.fullscreenLoading = true
        this.initCharts()
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    async initCharts() {
      await type(this.time).then(res => {
        console.log(res)
        this.types = res.data.data
      })
      this.fullscreenLoading = false
      const myChart = this.$echarts.init(this.$refs.e)
      // 绘制图表
      myChart.setOption({
        title: {
          left: 'center',
          text: '影视类型占比'
        },
        series: [
          {
            type: 'treemap',
            visibleMin: 300,
            label: {
              show: true,
              formatter: '{b}'
            },
            tooltip: {
              trigger: 'item'

            },
            data: this.types
          }
        ]
      }
      )
    }
  }
}
</script>

<style>
.e{
  margin-top:20px;
}

</style>
