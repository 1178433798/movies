<template>
  <el-container direction="vertical" style="margin: 60px 100px 0 100px;">
    <div class="head">
      <div class="title">
        <span class="mainTitle">{{movieInfo.title}}</span>
        <span class="mainTime">{{movieInfo.type}}</span>
      </div>
      <div class="uploader">
        <img :src="movieInfo.img" alt="" style="height: 150px; width: 150px; margin-left: 30px;">
      </div>
    </div>

    <div class="player" id="barrage">
      <div  id="dplayer"></div>
    </div>
    
    <div class="barrageArea">
      <el-input v-model="barrageText" placeholder="请输入弹幕~" @keyup.enter.native="submitBarrage"></el-input>
      <el-color-picker class="barBtn" v-model="barrageColor"></el-color-picker>
      <el-button @click="submitBarrage" class="barBtn" >发射</el-button>
    </div>

    <el-row style="margin-top: 50px;">
      <el-col :span="18" class="comment subInfo">
        <span class="mainTitle" style="text-align: start; float: left;">视频描述</span>
        <span class="desc">{{this.movieInfo.introduce}}</span>
      </el-col>
      <el-col :span="18" class="comment">
        <span class="mainTitle" style="text-align: start; float: left;">评论</span>
        <span style="text-align: start; float: left; font-size: 10px; margin-bottom: 14px;">楼中楼功能暂不支持 未来版本迭代</span>
        <el-form style="display: flex; flex-direction: row;margin:14px 0;">
          <el-input
            type="textarea"
            id="inputCommentArea"
            style="resize: none; margin-right: 10px;"
            :rows="4"
            placeholder="请输入评论"
            v-model="inputComment">
          </el-input>
          <el-button icon="el-icon-edit" size="small" @click="submitComment"></el-button>
        </el-form>
        <!--  -->
        <div v-for="(c, i) in this.$data.comment">
          <div class="commentSingle">
            <img :src="c.author.avatar" style="height: 40px;margin: 0 10px 0 0;" alt="">
            <div style="display: flex; flex-direction: column; justify-content: start; width: 100%;">
              <span style="font-size: 7px;text-align: start;float: start;margin: 2px;"><span style="font-size: 20px;">{{c.author.nickname}}</span> {{c.parseTime(c.time)}}</span>
              <span style="text-align: start;float: start;margin: 2px;">{{c.text}}</span>
              <div style="display: flex; flex-direction: row;margin: 7px 0 7px auto; justify-content: end;">
                <el-button icon="el-icon-edit" size="small" @click="noFollowComment"></el-button>
                <el-button type="primary" icon="el-icon-star-off" size="small" ></el-button>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
        </div>
<!--        <el-pagination-->
<!--          style="width: 100%;"-->
<!--          :page-size="14"-->
<!--          :pager-count="1"-->
<!--          layout="prev, pager, next"-->
<!--          :total="1000">-->
<!--        </el-pagination>-->
      </el-col>
      <el-col :span="6" class="comment">
        <div class="subInfo">
          <el-button-group style="width: 100%;">
            <el-button v-if="this.video.isCollect" type="primary" icon="el-icon-star-on" @click="uncollect" plain>取消收藏</el-button>
            <el-button v-else type="primary" icon="el-icon-star-off" @click="collect">收藏</el-button>
            <el-button type="primary" icon="el-icon-share">分享</el-button>
          </el-button-group>
        </div>
        <div class="subInfo">
          <span class="mainTitle" style="text-align: start; float: left;">视频信息</span>
          <span class="desc">播放：{{this.movieInfo.viewCount}}</span>
          <span class="desc">收藏：{{ this.movieInfo.likeCount }}</span>
        </div>
        <div class="subInfo">
          <span class="mainTitle" style="text-align: start; float: left;">分类</span>
          <span class="desc">{{this.video.category}}</span>
        </div>
<!--        <div class="subInfo">-->
<!--          <span class="mainTitle" style="text-align: start; float: left;">相关视频</span>-->
<!--          <span class="desc">智能推荐相关待未来版本迭代</span>-->
<!--        </div>-->
      </el-col>
    </el-row>

  </el-container>
</template>

<script>
import Hls from 'hls.js'
import Dplayer from 'dplayer'
import {getById} from '../api/api'
let player = {}
let barrage = {}
let conn = {}
export default {
  name: 'VideoPage',
  mounted() {
    // this.mid= this.$route.query.mid==undefined?1:this.$route.query.mid//获取传参的aid
    this.getInfo(this.$route.query.mid)
    // console.log("123456"+this.movieInfo.movieUrl);
  },
  data () {
    return {
      mid:'',
      movieInfo:{},
      barrageColor: '#fff',
      inputComment: '',
      supportBarrage: true,
      barrageList: [],
      video: {
        videoId: 1,
        isCollect: false,
        pv: '',
        category: '',
        name: '加载中...',
        fileId: '',
        appId: '',
        date: new Date().toLocaleString(),
        uploader: {
          avatar: '',
          nickname: '加载中...',
        },
        describe: '',
        tag: ['']
      },
      comment: [{
        author: {
          avatar: 'http://192.168.127.130:4869/5a7e1f23a2db5512896fb0a97fb4fbbc',
          nickname: 'TestUser',
          level: 1
        },
        text: '这个视频真实太傻掉了',
        time: new Date(),
        parseTime: (time) => {
          const now = time
          return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours() + ':' + now.getMinutes()
        }
      }],
      barrageText: ''
    }
  },
  methods: {

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

// 提供id获取信息
    getInfo(id){
      getById(id).then(res=>{
        this.movieInfo=res.data.data
        this.onInitDplayer(res.data.data.movieUrl)
      })
     
    },

    collect: function () {
      configApi.collectVideo({
        video_id: parseInt(this.$data.video.videoId)
      }).then((res) => {
        if (res.errno !== 0) {
          this.$notify.error({
            title: '发送失败',
            message: res.errmsg
          })
        } else {
          this.$data.video.isCollect = true
        }
      }).catch((error) => {
        console.log(error)
        this.$notify.error({
          title: '发送失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
    },
    uncollect: function () {
      configApi.uncollectVideo({
        video_id: parseInt(this.$data.video.videoId)
      }).then((res) => {
        if (res.errno !== 0) {
          this.$notify.error({
            title: '发送失败',
            message: res.errmsg
          })
        } else {
          this.$data.video.isCollect = false
        }
      }).catch((error) => {
        console.log(error)
        this.$notify.error({
          title: '发送失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
    },
    submitBarrage: function () {
      if (!conn) {
        this.$notify.error({
          title: '请求失败',
          message: '与弹幕服务器失去连接',
        })
        return
      }

      conn.send(JSON.stringify({
        key: uuidv4(),
        time: player.currentTime() * 1000,
        text: this.$data.barrageText,
        fontSize: 26,
        color: this.$data.barrageColor,
        videoId: this.$data.video.videoId,
        creatorId: JSON.parse(this.$store.state.userInfo).user_id
      }))

      this.$data.barrageText = ''
    },
   
  }
}
</script>

<style scoped>
@import "../../node_modules/element-ui/lib/theme-chalk/index.css";
.head {
  display: flex;
  flex-direction: row;
}
.dplayer {
  height: 100%;
}
.title {
  justify-content: flex-start;
  text-align: start;
  display: inline-flex;
  flex-direction: column;
}

.mainTitle {
  text-align: start;
  font-size: 25px;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.mainTime {
  font-size: 16px;
  font-weight: normal;
  /*align-self: center;*/
}

.uploader {
  display: inline-flex;
  margin-right: auto;
}

.uploader .textArea {
  display: inline-flex;
  flex-direction: column;
}

.uploader .nickname {
  text-align: start;
  font-size: 25px;
  font-weight: normal;
}

.btn {
  margin-left: 10px;
  width: 120px;
}

.player {
  margin: 50px 0 0 0;
  background-color: #000;
  border: #409EFF;
  width: 100%;
  height: 43vw;
}

.player > video {
  height: 100%;
  width: 100%;
}

#player-container-id {
  height: 100%;
  width: 100%;
}

.barrageArea {
  display: inline-flex;
  flex-direction: row;
  margin-top: 5px;
}

.barrageArea .barBtn {
  margin-left: 5px;
}

.comment {
  float: left;
  display: flex;
  flex-direction: column;
  padding-right: 90px;
}

.commentSingle {
  display: flex;
  flex-direction: row;
  margin: 14px 0 0 0;
}

.subInfo {
  float: left;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.subInfo .desc {
  text-align: start;
  float: left;
  font-size: 17px;
}

#inputCommentArea {
  resize: none !important;
}

.el-textarea .el-textarea__inner{
   resize: none !important;
}

</style>
