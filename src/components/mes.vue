<template>
  <div class="allss">
    <div class="left">
      <div class="favormovie">
        <h2>喜欢的电影</h2>
        <br>
        <div class="search">
          <el-row :gutter="15">
            <el-form ref="elForm" :model="firsttype" size="medium" label-width="100px">
              <el-col :span="10">
                <el-form-item label="类型" prop="type">
                  <el-select v-model="firsttype.type" placeholder="请选择类型">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item size="large">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <div class="favor">
          <div v-for="(item,index) in movie" :key="index" class="favors" @click="details(item)">
            <img :src="item.movie.img" alt="">
            <div class="intro">
              <div class="title">{{ item.movie.title }}</div>
              <div class="type"> {{ item.movie.year+item.movie.type }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <h2>历史记录</h2>
      <br>
      <el-radio v-model="radio" label="1">查看</el-radio>
      <el-radio v-model="radio" label="2">评论</el-radio>
      <el-radio v-model="radio" label="3">喜欢</el-radio>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="500"
      >
        <el-table-column
          prop="time"
          label="日期"
          sortable
          width="180"
        />
        <el-table-column
          prop="content"
          label="操作记录"
        />
      </el-table>
    </div>
    <el-dialog title="电影详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="电影封面" label-width="80px">
          <template>
            <img :src="form.img" alt="" style="width:100px">
          </template>
        </el-form-item>
        <el-form-item label="电影名" label-width="80px">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="导演" label-width="80px">
          <el-input v-model="form.director" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" label-width="80px">
          <el-input v-model="form.type" autocomplete="off" />
        </el-form-item>
        <el-form-item label="演员" label-width="80px">
          <el-input v-model="form.performer" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上映地区" label-width="80px">
          <el-input v-model="form.country" autocomplete="off" />
        </el-form-item>
        <el-form-item label="语言" label-width="80px">
          <el-input v-model="form.language" autocomplete="off" />
        </el-form-item>
        <el-form-item label="简介" label-width="80px">
          <el-input v-model="form.introduce" type="textarea" rows="5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="评论" label-width="80px">
          <template>
            <div style="maxHeight:200px;overflow:auto">

              <div v-for="i in comments" :key="i.time" class="com">
                <el-tag>{{ i.username }}</el-tag>
                <el-tag style="marginLeft:100px" type="success">{{ i.content }}</el-tag>
                <el-tag style="float:right">{{ i.time }}</el-tag>
              </div>
              <el-tag v-if="comments.length===0">暂无评论</el-tag>
            </div>
          </template>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="success">已喜欢</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { liketype, history, detail } from '../api/api'
export default {
  name: 'Mes',
  data() {
    return {
      firsttype: {
        type: ''
      },
      radio: '1',
      options: [
        {
          label: '动画',
          value: '动画'
        },
        {
          label: '恐怖',
          value: '恐怖'
        },
        {
          label: '喜剧',
          value: '喜剧'
        },
        {
          label: '剧情',
          value: '剧情'
        },
        {
          label: '科幻',
          value: '科幻'
        },
        {
          label: '爱情',
          value: '爱情'
        },
        {
          label: '犯罪',
          value: '犯罪'
        },
        {
          label: '惊悚',
          value: '惊悚'
        },
        {
          label: '冒险',
          value: '冒险'
        },
        {
          label: '动作',
          value: '动作'
        },
        {
          label: '家庭',
          value: '家庭'
        },
        {
          label: '奇幻',
          value: '奇幻'
        },
        {
          label: '古装',
          value: '古装'
        },
        {
          label: '纪录片',
          value: '纪录片'
        }
      ],
      tableData: [
        {
          date: '2022-08-02',
          option: '评论了电影《小猪佩奇》'
        },
        {
          date: '2022-09-18',
          option: '喜欢了电影《正义回廊》'
        },
        {
          date: '2021-11-06',
          option: '查看了电影《正义回廊》'
        },
        {
          date: '2022-07-21',
          option: '评论了电影《正义回廊》'
        }

      ],
      movie: [],
      dialogFormVisible: false,
      form: {},
      comments: [],
      alldata: []
    }
  },
  watch: {
    radio: {
      handler(newVal, old) {
        if (newVal === '1') {
          this.tableData = this.alldata.watch
        }
        if (newVal === '2') {
          this.tableData = this.alldata.comment
        }
        if (newVal === '3') {
          this.tableData = this.alldata.like
        }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      liketype(this.firsttype).then(res => {
        this.movie = res.data.data
        console.log(this.movie)
      })
      history().then(res => {
        console.log(res)
        this.alldata = res.data.data
        console.log(this.alldata)
        this.tableData = this.alldata.watch
      })
    },

    details(item) {
      this.dialogFormVisible = true
      var a = {
        id: item.movie.id
      }

      detail(a).then(res => {
        console.log(res)
        this.form = res.data.data.movieEntity
        this.comments = res.data.data.comments
      })
    },
    handleInputConfirm(i) {
      if (i === 1) {
        if (this.inputValue1) {
          this.dynamicTags1.push(this.inputValue1)
        }
        this.inputVisible1 = false
        this.inputValue1 = ''
      }
      if (i === 2) {
        if (this.inputValue2) {
          this.dynamicTags2.push(this.inputValue2)
        }
        this.inputVisible2 = false
        this.inputValue2 = ''
      }
      if (i === 3) {
        if (this.inputValue3) {
          this.dynamicTags3.push(this.inputValue3)
        }
        this.inputVisible3 = false
        this.inputValue3 = ''
      }
    },
    submitForm() {
      console.log(this.formData)
      liketype(this.firsttype).then(res => {
        this.movie = res.data.data
        console.log(this.movie)
      })
    }
  }
}
</script>

<style>
.allss{
  margin-top: 20px;
  height: 80vh;
}
 .search{
        margin: auto;
        width: 95%;
        height: 70px;
        padding: 15px;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba(0, 0, 0,0.3);
    }
.favormovie{
  padding:5px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 650px;
  box-sizing: border-box;
}
.intro{
  height: 75px;
   display:-webkit-box;
   overflow:hidden;
   text-overflow:ellipsis;
   -webkit-line-clamp:3;
   -webkit-box-orient:vertical;
}
.title{
  font-size: 16px;
}
.type{
  font-size: 14px;
  color: rgb(114, 114, 114);
  margin-top: 10px;
}
.favor{
  width: 100%;
  margin-top: 20px;
  display: flex;
flex-wrap: wrap;
max-height: 430px;
overflow: auto;
}
.favors{
  width: 200px;
  text-align: center;
height: 300px;
float: left;
margin-left: 20px;
  transition: 200ms;
}
.favors:hover {

  transform: scale(1.1);
}
.favors img  {
   height: 210px;
  width: 150px;

}
.left{
    overflow-y: hidden;
  float: left;
        width: 55vw;
        height: 85vh;
        padding: 15px;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba(0, 0, 0,0.3);
        margin-left: 20px;
}
.right{
    overflow-y: auto;
        width: 28vw;
        height: 85vh;
        padding: 15px;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba(0, 0, 0,0.3);
       float: right;
       margin-right: 20px;
}
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
