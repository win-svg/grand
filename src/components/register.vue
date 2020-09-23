<template>
  <div class="register_background">
    <div class="login">
     <div class="login_title">
       <img src="../assets/title.png" alt="">
     </div>
      <div class="login_operation">
        <div class="login_import">
          <input type="text" v-model="username">
          <img src="../assets/login_me.png" alt="">
        </div>
        <div class="login_import">
          <input type="password" v-model="password">
          <img src="../assets/login_password.png" alt="#" style="position: absolute;left: 15%;top: 210px;">
        </div>
        <div class="login_remember">
          <a-checkbox @change="onChange" id="login" :defaultChecked="select">
            记住密码
          </a-checkbox>
        </div>
        <div class="login_click" @click="login">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      select: false,
      username: '',
      password: ''
    }
  },
  created() {
    this.select =  eval(localStorage.getItem('check').toLowerCase())
    if (this.select && this.select === true) {
      this.username = JSON.parse(localStorage.getItem('username'))
      this.password = JSON.parse(localStorage.getItem('password'))
    }
    // if (JSON.parse(localStorage.getItem('username'))) {
    //   this.$router.push({name: 'index'})
    // }
  },
  methods: {
    onChange(e) {
      localStorage.setItem('check',e.target.checked)
    },
    login () {
      if (this.username === '' || this.password === '') {
        this.$message.warning('请输入账号或密码');
      } else {
        this.$api.login({username: this.username, password: this.password}).then(data => {
          console.log(data);
          if (data.data.code === 200) {
            this.$message.success('登录成功,欢迎使用');
            localStorage.setItem('username', JSON.stringify(this.username))
            sessionStorage.setItem('username', JSON.stringify(this.username))
            sessionStorage.setItem('token', JSON.stringify(data.data.data.token))
            sessionStorage.setItem('leftNav', JSON.stringify(data.data.data.leftNav))
            localStorage.setItem('password', JSON.stringify(this.password))
            this.$router.push({name: 'homePage'})
          } else {
            this.$message.error('账号或密码错误');
          }
          // this.iconLoading = false
          // this.$router.push({name: 'homePage'})
        })
                .catch(error => {
                  this.$message.error('账号或密码错误');
                  console.log(error);
                })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .register_background{
    width: 100vw;
    height: 100vh;
    background: url("../assets/register_bg.png");
    position: relative;
    .login{
      width:35.4%;
      height:680px;
      background: rgba(255,255,255,1);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      .login_title{
        width: 100%;
        height:230px;
        background:rgba(33,118,255,1);
        border-radius:4px 4px 0 0;
        position: relative;
        img{
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
      .login_operation{
        width: 100%;
        height: 450px;
        border-radius:0 0 4px 4px;
        position: relative;
        input{
          width: 80%;
          height: 66px;
          font-size: 24px;
          outline: none;
          color: #4d585d;
          text-indent: 15%;
          margin-left: 10%;
          margin-top: 63px;
          border:1px solid rgba(204,204,204,1);
          border-radius:4px;
        }
        img{
          position: absolute;
          top: 80px;
          left: 15%;
        }
      }
      .login_remember{
        width: 100%;
        margin-left: 10%;
        padding-top: 27px;
        /deep/.ant-checkbox + span{
          font-size: 16px;
        }
      }
      .login_click{
        width: 80%;
        margin-left: 10%;
        height:60px;
        background:rgba(33,118,255,1);
        box-shadow:0px 4px 10px 0px rgba(5,88,212,0.33);
        border-radius:4px;
        margin-top: 53px;
        text-align: center;
        line-height: 60px;
        font-size:22px;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      .login_click:hover{
        cursor: pointer;
      }
    }
  }
</style>
