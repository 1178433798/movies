<template>
  <div>
    <div class="searchparts">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" size="medium" label-width="100px">
          <el-col :span="5">
            <el-form-item label="电影1" prop="actor1">
              <el-input v-model="formData.actor1" placeholder="请输入电影名" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电影2" prop="actor2">
              <el-input v-model="formData.actor2" placeholder="请输入电影名" @keyup.enter.native="submitForm" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">对比</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div ref="e" v-loading="fullscreenLoading" class="e" style="width:700px;height:600px" />
  </div>
</template>

<script>
import { compare } from '../api/api'
export default {
  name: 'Actorana',
  data() {
    return {
      fullscreenLoading: true,
      formData: {
        actor1: '隐入尘烟',
        actor2: '咏梅'
      },
      s: '隐入尘烟/咏梅',
      data1: [],
      data2: []
    }
  },
  watch: {
    formData: {
      handler(newVal, oldVal) {
        console.log(newVal)
      }
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    submitForm() {
      this.fullscreenLoading = true
      // eslint-disable-next-line no-unused-vars
      this.s = ''
      this.s += this.formData.actor1 + '/' + this.formData.actor2
      console.log(this.s)
      this.initCharts()
    },
    async  initCharts() {
      await compare(this.s).then(res => {
        console.log(res)
        this.data1 = res.data.data.movie1
        this.data2 = res.data.data.movie2
        this.fullscreenLoading = false
      })
      const myChart = this.$echarts.init(this.$refs.e)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '电影影响力对比',
          left: 'lefts'

        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          show: false
        },
        yAxis: {
          type: 'category',
          data: ['评论数', '观影人数', '评分人数', '热度', '票房']
        },
        series: [
          {
            label: {
              show: true,
              position: 'right'
            },
            name: this.formData.actor1,
            type: 'bar',
            data: this.data1
          },
          {
            label: {
              show: true,
              position: 'right'
            },
            name: this.formData.actor2,
            type: 'bar',
            data: this.data2
          }
        ]
      }
      )
    }
  }
}
</script>

<style>
 .searchparts{
         width: 83vw;
        height: 70px;
        padding: 15px;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba(0, 0, 0,0.3);
    }
    .e{
  margin: auto;
  margin-top:20px;
}
</style>
