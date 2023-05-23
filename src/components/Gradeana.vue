<template>
  <div v-loading="fullscreenLoading">
    <div ref="e" class="e" style="width:650px;height:550px" />
  </div>
</template>

<script>
import { score } from '../api/api'
export default {
  name: 'Gradeana',
  props: {
    time: {
      type: String,
      default: '2022'
    }
  },
  data() {
    return {
      countrys: [],
      fullscreenLoading: true,
      China: [],
      US: [],
      Jap: [],
      korea: []
    }
  },
  watch: {
    time: {
      handler(newVal, oldVal) {
        this.fullscreenLoading = true
        this.initCharts()
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    async  initCharts() {
      await score(this.time).then(res => {
        res.data.data.中国.unshift('中国')
        res.data.data.美国.unshift('美国')
        res.data.data.日本.unshift('日本')
        res.data.data.韩国.unshift('韩国')
        console.log(res.data.data)
        this.China = res.data.data.中国
        this.US = res.data.data.美国
        this.Jap = res.data.data.日本
        this.korea = res.data.data.韩国
      })
      this.fullscreenLoading = false
      const myChart = this.$echarts.init(this.$refs.e)
      // 绘制图表
      var option = {
        title: {
          left: 'left',
          text: '影视评分'
        },
        legend: {
          data: ['中国', '美国', '日本', '韩国']
        },
        tooltip: {
          trigger: 'axis',
          showContent: true
        },
        dataset: {
          source: [
            ['grade', '4', ' 4.5', ' 5', ' 5.5', '6', '6.5', '7', '7.5', '8', ' 8.5', '9', '9.5'],
            this.China,
            this.US,
            this.Jap,
            this.korea
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%', right: '0' },
        series: [
          {
            type: 'line',
            name: '中国',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            name: '美国',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            name: '日本',
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'line',
            smooth: true,
            name: '韩国',
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' }
          },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            emphasis: {
              focus: 'self'
            },
            label: {
              formatter: '{b}: {@4.0} ({d}%)'
            },
            encode: {
              itemName: 'grade',
              value: '4.0',
              tooltip: '4.0'
            }
          }
        ]
      }

      myChart.on('updateAxisPointer', function(event) {
        const xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })
      myChart.setOption(option)
    }
  }
}
</script>

<style>
.e{
  margin: auto;
  margin-top: 20px;
}
</style>
