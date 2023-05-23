<template>
  <div class="login-wrap">
    <transition name="slide-fade1">
      <div v-show="show1" class="form-wrapper">
        <div class="header">
          电影可视化分析系统
        </div>
        <div ref="LoginForm" class="input-wrapper" :model="LoginForm">
          <div class="border-wrapper" prop="username">
            <input v-model="LoginForm.username" type="text" name="username" placeholder="用户名" class="border-item" autocomplete="off">
          </div>
          <div class="border-wrapper" prop="password">
            <input v-model="LoginForm.password" type="password" name="password" placeholder="密码" class="border-item" autocomplete="off" @keyup.enter.native="Login">
          </div>
        </div>
        <div class="action">
          <div class="btn" @click="Login">登录</div>
          <div class="btn" @click="Registerbox()">注册</div>
        </div>
      </div>
    </transition>
    <div>
      <transition name="slide-fade2">
        <div v-show="show2" class="form-wrapper">
          <div class="header">
            注册
          </div>
          <div ref="RegisterForm" class="input-wrapper" :model="RegisterForm">
            <div class="border-wrapper" prop="username">
              <input v-model="RegisterForm.username" type="text" name="username" placeholder="用户名" class="border-item" autocomplete="off">
            </div>
            <div class="border-wrapper" prop="password">
              <input v-model="RegisterForm.password" type="password" name="password" placeholder="密码" class="border-item" autocomplete="off">
            </div>
            <!-- <div class="border-wrapper" prop="password">
          <input type="password" name="password" placeholder="确认密码" class="border-item" autocomplete="off" v-model="RegisterForm.password"/>
        </div> -->
          </div>
          <div class="action">
            <div class="btn" @click="Register()">确认</div>
            <div class="btn" @click="show1 = true,show2 = false">取消</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { login, register } from '../api/api'
export default {
  name: 'Login',
  data() {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      RegisterForm: {
        username: '',
        password: ''
      },
      show1: true,
      show2: false
    }
  },
  methods: {
    Login() {
      const data = {
        username: this.LoginForm.username,
        password: this.LoginForm.password
      }
      login(data).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.$message.success('登录成功！')
          localStorage.setItem('name', res.data.data.username)
          localStorage.setItem('id', res.data.data.id)

          this.$router.push('/index')
        } else {
          this.$message.error('账户不存在,登录失败！')
        }
      })
    },
    Register() {
      const data = {
        username: this.RegisterForm.username,
        password: this.RegisterForm.password
      }
      register(data).then(res => {
        if (res.data.code === 1) {
          this.$message.success('注册成功！')
          this.show1 = true
          this.show2 = false
        } else {
          this.$message.error('注册失败！')
        }
      })
    },
    Registerbox() {
      this.show1 = false
      this.show2 = true
    }
  }
}
</script>
<style>
  .login-wrap {
  background: url('../img/Login.png') no-repeat;
  background-size: cover;
  font-family: JetBrains Mono Medium;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.form-wrapper{
  width: 350px;
  background-color: rgba(41, 45, 62, 0.8);
  color: #fff;
  border-radius: 2px;
  padding: 50px;
}
.form-wrapper .header {
  text-align: center;
  font-size: 35px;
  line-height: 100px;
}
.form-wrapper .input-wrapper input {
  background-color: rgb(41, 45, 62);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #fff;
  outline: none;
}
.form-wrapper .input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #e8198b, #0eb4dd);
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-wrapper .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  border-radius: 30px;
}
.form-wrapper .action {
  display: flex;
  justify-content: center;
}
.form-wrapper .action .btn {
  width: 60%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 50px;
  border-radius: 30px;
  cursor: pointer;
}
.form-wrapper .action .btn:hover {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
.form-wrapper .icon-wrapper {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}
.form-wrapper .icon-wrapper i {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}
.form-wrapper .icon-wrapper i:hover {
  background-color: #0e92b3;
}
.slide-fade1-enter-active {transition: all .5s ease 0.1s}
.slide-fade1-leave-active {transition: all .2s ease}
.slide-fade1-enter, .slide-fade1-leave-to{transform: translateX(5px);opacity: 0;}
.slide-fade2-enter-active {transition: all .5s ease 0.1s}
.slide-fade2-leave-active {transition: all .2s ease}
.slide-fade2-enter, .slide-fade2-leave-to{transform: translateX(5px);opacity: 0;}
</style>
