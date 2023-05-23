<template>
  <div v-loading="fullscreenLoading">
    <div ref="e" class="e" style="width:700px;height:600px" />
  </div>
</template>

<script>
import { count } from '../api/api'
export default {
  name: 'Timeana',
  data() {
    return {
      China: [],
      others: [],
      World: [],
      YearList: [],
      fullscreenLoading: false
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    async  initCharts() {
      await count().then(res => {
        console.log(res.data)
        this.China = res.data.data.China
        this.others = res.data.data.Others
        this.World = res.data.data.World
        this.YearList = res.data.data.YearList
      })
      const myChart = this.$echarts.init(this.$refs.e)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '上映时间分布'
        },
        grid: {
          right: '0'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['全球上映数', '中国上映数', '外国上映数']
        },
        xAxis: {
          type: 'category',
          data: this.YearList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.World,
            type: 'line',
            name: '全球上映数',
            smooth: true
          },
          {
            data: this.China,
            type: 'line',
            name: '中国上映数',
            smooth: true
          },
          {
            data: this.others,
            type: 'line',
            name: '外国上映数',
            smooth: true
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
  margin-top: 20px;
}
</style>
