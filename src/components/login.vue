<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png">
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" v-on:click="login">登录</el-button>
                    <el-button type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 定义表单数据绑定对象
      loginForm: {
        username: 'admin',
        password: 'admin123'
      },
      // 表单数据校验规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录表单预验证
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const result = await this.$http.post('login', this.loginForm)
        console.log(result)
        if (result.data.code === 200) {
          // console.log(result.data.msg)
          this.$message({
            showClose: true,
            message: result.data.msg,
            type: 'success'
          })
          window.sessionStorage.setItem('token', result.data.token)
          this.$router.push('/home')
        } else {
          // console.log(result.data.msg)
          this.$message({
            showClose: true,
            message: result.data.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd ;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.loginForm{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}

</style>
