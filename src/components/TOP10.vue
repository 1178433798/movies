<template>
  <div>
    <div ref="e" v-loading="fullscreenLoading" class="e" style="width:600px;height:550px" />
  </div>
</template>

<script>
import { top10 } from '../api/api'
export default {
  name: 'TOP10',
  props: {
    time: {
      type: String,
      default: '2022'
    }
  },
  data() {
    return {
      fullscreenLoading: true,
      name: [],
      score: []
    }
  },
  watch: {
    time: {
      handler(newVal, oldVal) {
        console.log('ss123' + newVal)
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
      await top10(this.time).then(res => {
        console.log(res)
        this.name = res.data.data.name.reverse()
        this.score = res.data.data.score.reverse()
      })
      this.fullscreenLoading = false
      const myChart = this.$echarts.init(this.$refs.e)
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.time + '年' + 'TOP10电影',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} <br/> 得分: {c}',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false,
          max: 10
        },
        yAxis: {
          type: 'category',
          data: this.name,
          axisLabel: {

            formatter: function(params) {
              var newParamsName = ''// 最终拼接成的字符串
              var paramsNameNumber = params.length// 实际标签的个数
              var provideNumber = 18// 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''// 表示每一次截取的字符串
                  var start = p * provideNumber// 开始截取的位置
                  var end = start + provideNumber// 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p === rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr// 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params
              }
              // 将最终的字符串返回
              return newParamsName
            }

          }
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right'
            },
            data: this.score
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
