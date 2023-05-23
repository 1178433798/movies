<template>
  <div class="alls">
    <div class="background" />
    <div class="bb" />
    <div class="movie">
      <h1>猜你喜欢 <i class="el-icon-refresh" @click="relike" /></h1>
      <br>
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="like"
      >
        <div v-for="(item,index) in movie" :key="index" class="likemovie" @click="details(item.movie)">
          <img :src="item.movie.img" alt="">
          <div class="intro">
            <div class="title">{{ item.movie.title }}</div>
            <div class="type"> {{ item.movie.year+item.movie.type }}</div>
          </div>
        </div>
      </div>
      <br>
      <h1>院线热映 <i class="el-icon-refresh" @click="rehot" /></h1>
      <br>
      <div
        v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="hot"
      >
        <div v-for="(item,index) in hotss" :key="index" class="hotmovie" @click="details(item)">
          <img :src="item.img" alt="">
          <div class="intro">
            <div class="title">{{ item.title }}</div>
            <div class="type"> {{ item.year+item.type }}</div>
          </div>
        </div>
      </div>
      <br>
      <h1>新片速递 <i class="el-icon-refresh" @click="renew" /></h1>
      <br>
      <div
        v-loading="loading3"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="new"
      >

        <div v-for="(item,index) in newss" :key="index" class="newmovie" @click="details(item)">
          <img :src="item.img" alt="">
          <div class="intro">
            <div class="title">{{ item.title }}</div>
            <div class="type"> {{ item.year+item.type }}</div>
          </div>
        </div>

      </div>
    </div>
    <el-dialog title="电影详情" :visible.sync="dialogVisible">
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

        <el-button @click="dialogVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { hot, news, detail, introduce } from '../api/api'
export default {
  name: 'Home',
  data() {
    return {
      hotss: [],
      newss: [],
      loading: true,
      loading2: true,
      loading3: true,
      movie: [],
      dialogVisible: false,
      comments: [],
      form: []

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      introduce().then(res => {
        console.log(res)
        this.movie = res.data.data
        console.log(this.movie)
        this.loading = false
      })
      hot().then(res => {
        console.log(res)
        this.hotss = res.data.data
        this.loading2 = false
      })
      news().then(res => {
        this.newss = res.data.data
        this.loading3 = false
      })
    },

    details(item) {
      console.log(item)
      var a = {
        id: item.id
      }
      detail(a).then(res => {
        console.log(res)
        this.form = res.data.data.movieEntity
        this.comments = res.data.data.comments
      })
      this.dialogVisible = true
    },
    relike() {
      this.loading = true
      introduce().then(res => {
        console.log(res)
        this.movie = res.data.data
        console.log(this.movie)
        this.loading = false
      })
    },
    rehot() {
      this.loading2 = true
      hot().then(res => {
        console.log(res)
        if (res.data.code === 1) {
          setTimeout(() => {
            this.hotss = res.data.data
            this.loading2 = false
          }, 500)
        }
      })
    },
    renew() {
      this.loading3 = true
      news().then(res => {
        if (res.data.code === 1) {
          setTimeout(() => {
            this.newss = res.data.data
            this.loading3 = false
          }, 500)
        }
      })
    }
  }
}
</script>

<style>
h1{
  color: white;
}
.alls {
position: relative;

background-image: linear-gradient(120deg, #393939 0%, #000000 100%);
}
 .background {
  position: fixed;
  width: 87%;
  height: 70vh;
  animation: mymove 20s infinite linear;
  z-index: 1;
}
 .bb {
  position: absolute;
  width: 100%;
  height: 70vh;
  z-index: 2;

}
@keyframes mymove2 {
  0% {
 background-image: url(../img/1.jpg);

  }
  25% {
     background-image: url(../img/2.jpg);
  }
  55% {
     background-image: url(../img/3.jpg);
  }
  80% {
    background-image: url(../img/4.jpg);
  }
  100% {
    background-image: url(../img/1.jpg);
  }
}
@keyframes mymove {
  0% {

    background: url(../img/1.jpg);
     background-position: 0px 0;
 background-size: 110% 70vh;
  }
  8% {
    background-position: -15px 0;
  }
  16% {
    background-position: -30px 0;
  }
  25% {
    background: url(../img/2.jpg);
 background-size: 110% 70vh;
    background-position: -45px 0;
  }
  35% {
    background-position: -50px 0;
  }
  45% {
    background-position: -65px 0px;
  }
  55% {
    background: url(../img/3.jpg);
 background-size: 110% 70vh;
    background-position: -50px 0;
  }
  68% {
    background-position: -45px 0;
  }
  80% {
    background: url(../img/4.jpg);
 background-size: 110% 70vh;
    background-position: -30px 0;
  }
  90% {
    background-position: -15px 0;
  }
  100% {
    background-position: 0px 0;
    background: url(../img/1.jpg);
 background-size: 110% 70vh;
  }
}
.movie{
  z-index: 2;
  position: absolute;
padding:20px;
box-sizing: border-box;
  width: 100%;
  top: 70vh;
background-image: linear-gradient(120deg, rgb(20,22,26) 0%, rgb(20,22,26)100%);
box-shadow:0 0 60px 30px rgb(20,22,26);
}
.like{
  display: flex;
  justify-content: space-around;
}
.likemovie {
  width: 230px;
  text-align: center;
height: 330px;
}
.intro{
  color: white;
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
  color: rgb(234, 234, 234);
  margin-top: 10px;
}
.hot{
  display: flex;
  justify-content: space-around;
}
.hotmovie{
  width: 230px;
  text-align: center;
height: 330px;
}
.new{
   display: flex;
  justify-content: space-around;
}
.newmovie{
  width: 230px;
  text-align: center;
height: 330px;
}
.newmovie img {
   height: 250px;
  width: 180px;
transition: 200ms;
}
.hotmovie img  {
   height: 250px;
  width: 180px;
transition: 200ms;
}
.likemovie img {
   height: 250px;
  width: 180px;
transition: 200ms;
}
.newmovie:hover img{
  height: 280px;
  width: 195px;
}
.hotmovie:hover img{
  height: 280px;
  width: 195px;
}
.likemovie:hover img{
  height: 280px;
  width: 195px;
}
</style>
