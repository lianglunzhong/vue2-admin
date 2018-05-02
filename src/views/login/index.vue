<template>
  <div class="login-container">
    <div class="form-wrapper">
      <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm">
        <div class="form-title">
          <h3 class="title">系统登录</h3>
        </div>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" placeholder="Username" clearable>
            <i slot="prefix" class="icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :type="passwordType" v-model="loginForm.password" placeholder="Password">
            <i slot="prefix" class="icon-lock"></i>
            <i slot="suffix" class="show-password-icon" :class="[showPass ? 'icon-eye-blocked' : 'icon-eye']" @click.stop.prevent="showPassword()"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="submit-wrapper">
            <el-button type="primary" size="medium" class="submit-btn" @click="login()">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度最少为6位！'))
      } else {
        callback()
      }
    }

    return {
      msg: 'This is login component',

      loginForm: {
        'username': '',
        'password': ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      showPass: false
    }
  },
  methods: {
    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.showPass = true
      } else {
        this.passwordType = 'password'
        this.showPass = false
      }
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('login')
          console.log(this.$store)
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  },
  computed: {
    
  }
}
</script>

<style lang="scss">
/* reset element-ui style */
.login-container {
  .el-form-item {
    margin-bottom: 32px;
    .el-input {
      input {
        background: transparent;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;

.login-container {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: $bg;
  .form-wrapper {
    width: 400px;
    .form-title {
      text-align: center;
      margin-bottom: 30px;
      .title {
        color: #fff;
      }
    }
    .show-password-icon {
      cursor: pointer;
    }
    .submit-wrapper {
      text-align:center;
      .submit-btn {
        width: 100%;
      }
    }
  }
}
</style>
