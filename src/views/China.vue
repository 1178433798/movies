<template>
  <div style="height:100%">
    <div class="searchpart">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" size="medium" label-width="100px">
          <el-col :span="5">
            <el-form-item label="上映时间" prop="year">
              <el-select v-model="formData.year" placeholder="请选择时间">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="类型" prop="type">
              <el-select v-model="formData.type" placeholder="请输入类型">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="演员" prop="performer">
              <el-input v-model="formData.performer" placeholder="请输入演员名" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电影名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入电影名" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="地区" prop="area">
              <el-select v-model="formData.area" placeholder="请选择地区">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div class="table">

      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        height="500"
      >
        <el-table-column
          prop="movieEntity.img"
          label="电影封面"
          width="180"
        >
          <template slot-scope="scope">
            <img style="width:160px" :src="scope.row.movieEntity.img" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="movieEntity.title"
          label="作品名"
        />

        <el-table-column
          prop="movieEntity.year"
          label="上映时间"
        />

        <el-table-column
          prop="movieEntity.type"
          label="类型"
        />
        <el-table-column
          prop="movieEntity.director"
          label="导演"
        />
        <el-table-column
          prop="movieEntity.scorePeople"
          label="评分人数"
        />
        <el-table-column
          prop="movieEntity.score"
          label="得分"
        />
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看详情</el-button>
            <el-button v-if="scope.row.isLike==='1'" type="text" size="small" @click="like(scope.row.movieEntity)">喜欢</el-button>
            <el-button v-else type="text" size="small">已喜欢</el-button>
            <el-button type="text" size="small" @click="comment(scope.row.movieEntity)">评论</el-button>
            <!-- <el-button type="text" size="small" @click="play(scope.row.movieEntity.movieUrl)">播放</el-button> -->
            <!-- <el-button type="text" size="small" @click="play(scope.row.movieEntity.id)">播放</el-button> -->
            <a :href="'#/index/videos?mid='+scope.row.movieEntity.id">播放</a>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
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
        <el-button v-if="islike==1" type="primary" @click="like2(form.title,form.id)">喜 欢</el-button>
        <el-button v-else type="success">已喜欢</el-button>
      </div>
    </el-dialog>
    <el-dialog title="评论" :visible.sync="dialogFormVisible2">

      <span>{{ commentname }}</span>    <br><br>
      评论：
      <br>  <br>
      <el-input v-model="commentform.content" type="textarea" rows="5" autocomplete="off" />

      <div slot="footer" class="dialog-footer">

        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="commentcom">确 定</el-button>

      </div>
    </el-dialog>
    <div>
    <div id="dplayer"></div>
  </div>
  </div>
    
</template>
<script>
import { page1, like, comment, detail, initIntroduce, type } from '../api/api'
import Hls from 'hls.js'
import Dplayer from 'dplayer'
export default {
  name: 'China',
  data() {
    return {
      loading: true,
      comments: [],
      islike: 1,
      formData: {
        page: 1,
        limit: 10,
        year: 2022,
        type: '',
        performer: '',
        area: 1,
        name:''
      },
      options: [
        {
          label: '2022',
          value: 2022
        },
        {
          label: '2021',
          value: 2021
        },
        {
          label: '2020',
          value: 2020
        },
        {
          label: '2019',
          value: 2019
        },
        {
          label: '2018',
          value: 2018
        },
        {
          label: '2017',
          value: 2017
        }
      ],
      options2: [
        {
          label: '中国',
          value: 1
        },
        {
          label: '外国',
          value: 2
        }
      ],
      options3: [
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
      tableData: [],
      total: 100,
      currentPage: 1,
      pagesize: 10,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {},
      commentname: '',
      commentform: {
        movieid: '',
        content: ''
      },
      dp:null,

    }
  },
  created() {

  },
  mounted() {
    this.init()
  },
  methods: {
    play(movieUrl) {
      console.log("moveurl: "+movieUrl)
      if (movieUrl) {
        this.onInitDplayer(movieUrl)
        }
      // this.$router.push({path:'/videos'})
    },
    init() {
      page1(this.formData).then(res => {
        this.tableData = res.data.data.data
        console.log(res.data)
        this.loading = false
        this.total = res.data.data.total * 1
      })
    },
		//Dplayer初始化
    onInitDplayer(val){
	      let index = val.indexOf(':')+1
	      val = val.substring(index)
	      console.log(val)
	      this.dp = new Dplayer({
	        container: document.getElementById('dplayer'),
	        autoplay: false,
	        theme: '#FADFA3',
	        loop: true,
	        lang: 'zh-cn',
	        screenshot: false,
	        hotkey: true,
	        preload: 'auto',
	        volume: 0.7,
	        mutex: true,
	        video: {
	          url:val,
	          type:'customHls',
	          customType: {
	            customHls: function (video, player) {
	              const hls = new Hls()
	              hls.loadSource(video.src)
	              hls.attachMedia(video)
	            }
	          },
	        },
	      });
	    },
    reset() {
      this.formData = {
        page: 1,
        limit: 10,
        year: 2022,
        type: '',
        performer: '',
        area: 1
      }
      this.loading = true
      this.currentPage = 1
      this.init()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.formData.page = val
      console.log(this.formData)
      this.loading = true
      this.init()
    },
    submitForm() {
      this.loading = true
      console.log(this.formData)
      this.init()
    },
    like(row) {
      console.log(row)

      like(row.id).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '喜欢了电影《' + row.title + '》'
        })
        this.submitForm()
      })
      initIntroduce().then(res => {

      })
    },
    like2(title, id) {
      like(id).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '喜欢了电影《' + title + '》'
        })
      })
      initIntroduce().then(res => {

      })
    },
    comment(row) {
      this.dialogFormVisible2 = true
      this.commentname = row.title
      this.commentform.movieid = row.id
    },
    commentcom() {
      comment(this.commentform).then(res => {
        if (res.data.code === 1) {
          this.dialogFormVisible2 = false
          this.$message({
            type: 'success',
            message: '评论成功！'
          })
        }
      })
      this.commentform.content = ''
    },
    handleClick(row) {
      console.log(row)
      var a = {
        id: row.movieEntity.id
      }
      this.islike = row.isLike
      console.log(this.islike)
      detail(a).then(res => {
        console.log(res)
        this.form = res.data.data.movieEntity
        this.comments = res.data.data.comments
      })
      this.dialogFormVisible = true
      // this.form = row
      console.log(this.form)
    }
  }
}
</script>

<style>
 .searchpart{
        margin: auto;
        margin-top: 20px;
        width: 85vw;
        height: 70px;
        padding: 15px;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgba(0, 0, 0,0.3);
    }
    .table{
    margin-left: 20px;
    margin-top: 20px;
    }
    .block{
      margin-left: 50%;
      transform: translate(-50%);
      margin-top: 20px;
    }
    .com{

margin: auto;
      margin-top: 20px;
      border-bottom: solid 2px  rgb(0, 0, 0,0.1);
      border-radius: 5px;
      padding: 2px;
      width: 90%;

    }
</style>
