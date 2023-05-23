<template>
  <div v-loading="fullscreenLoading">
    <div ref="es" class="e" style="width:600px;height:600px;marginTop:20px" />
  </div>
</template>

<script>
import { country } from '../api/api'
export default {
  name: 'Regionana',
  props: {
    time: {
      type: String,
      default: '2022'
    }
  },
  data() {
    return {
      countrys: [],
      fullscreenLoading: true
    }
  },
  watch: {
    time: {
      handler(newVal, oldVal) {
        console.log('ss123' + newVal)
        this.fullscreenLoading = true
        this.ss()
      }
    }
  },
  mounted() {
    this.ss()
  },
  methods: {
    async ss() {
      console.log(this.time)
      await country(this.time).then(res => {
        this.countrys = res.data.data.res
        console.log(this.countrys)
      })
      this.fullscreenLoading = false
      const myChart = this.$echarts.init(this.$refs.es)
      var option
      option = {
        title: {
          text: '上映地区分布',
          top: 100
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} ：{b} <br/> 上映电影数: {c}'
        },
        legend: {
          data: ['中国大陆', '中国香港', '中国台湾', '美国', '英国', '日本', '韩国', '澳大利亚', '俄罗斯', '泰国', '德国', '法国', '加拿大', '西班牙']
        },
        series: [
          {
            name: '地区',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'right'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: this.countrys
          }
        ]
      }
      option && myChart.setOption(option)
    }
  }
}
</script>

<style>
.e{
    margin-top: 20px;
}

</style>
