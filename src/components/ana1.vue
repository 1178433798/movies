<template>
  <div class="mainbody" loading="true">
    <div class="searchpart1">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" size="medium" label-width="100px">
          <el-col :span="5">
            <el-form-item label="上映时间" prop="time">
              <el-select v-model="formData.time" placeholder="请选择时间">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="c1"><regionana :time="formData.time" /></div>
    <div class="c2"><Timeana :time="formData.time" /></div>
    <div class="c3"><Typeana :time="formData.time" /></div>

  </div>
</template>

<script>
import regionana from '../components/Regionana.vue'
import Typeana from '../components/Typeana.vue'
import Timeana from '../components/Timeana.vue'
export default {
  name: 'Ana1',
  components: {
    regionana,
    Typeana,
    Timeana
  },
  data() {
    return {
      options: [{
        value: '2022',
        label: '2022'
      }, {
        value: '2021',
        label: '2021'
      }, {
        value: '2020',
        label: '2020'
      },
      {
        value: '2019',
        label: '2019'
      },
      {
        value: '2018',
        label: '2018'
      },
      {
        value: '2017',
        label: '2017'
      },
      {
        value: '2016',
        label: '2016'
      },
      {
        value: '2015',
        label: '2015'
      },
      {
        value: '2014',
        label: '2014'
      },
      {
        value: '2013',
        label: '2013'
      },
      {
        value: '2012',
        label: '2012'
      },
      {
        value: '2011',
        label: '2011'
      },
      {
        value: '2010',
        label: '2010'
      }

      ],
      formData: {
        time: '2022'
      }

    }
  },
  watch: {
    'formData.time': {
      handler(newVal, oldVal) {
        console.log('ss')
      }
    }
  },
  methods: {
    submitForm() {
      console.log(this.formData)
    }
  }
}
</script>

<style>
 .searchpart1{
        margin: auto;
        margin-top: 20px;
        width: 83vw;
        height: 70px;
        padding: 15px;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba(0, 0, 0,0.3);
    }
    .mainbody{
        position: relative;
          width: 85vw;
        height: 80vh;
       overflow-y: auto;
       overflow-x: hidden;
    }
    .c1{
        position: absolute;
        left: 0;
        top: 100px;
    }
    .c2{
         position: absolute;
         right: 0;

    }
    .c3{
         position: absolute;
         left: 50%;
         transform: translate(-55%);
         top: 720px;
    }

</style>
