<template>
  <div class='login'>
    <el-card class='login-card'>
      <div class='logo'>
        <img src="../../assets/logo_index.png" alt="">注册
      </div>
      <!-- 表单组件  el-form表单容器-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style='margin-top:20px'>
        <!-- 表单项 -->
        <el-form-item prop="mobile">
          <!-- 放置组件内容 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style='width:280px' v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          <el-button style='float:right'>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style='width:100%'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const validator = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('请无条件同意'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false

      },
      loginRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ],
        check: [{
          validator
        }]
      }
    }
  },

  methods: {
    login () {
      this.$refs.loginForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/register',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            console.log(res)
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login {
    background-image: url("../../assets/login_bg.jpg");
    width: 100%;
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .box-card {
      width: 400px;
      height: 330px;

      img {
        display: block;
        width: 200px;
        margin: 10px auto;
      }
    }
  }
</style>
