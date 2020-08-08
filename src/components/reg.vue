<template>
    <div class="reg_container">
        <div class="reg_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" />
            </div>
            <el-form ref="regFormRef" :model="regForm" :rules="regFormRules" class="regForm">
                <el-form-item prop="username">
                    <el-input
                        v-model="regForm.username"
                        prefix-icon="el-icon-user-solid"
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="regForm.password"
                        prefix-icon="el-icon-lock"
                        placeholder="请输入密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="checkpassword">
                    <el-input
                        v-model="regForm.checkpassword"
                        prefix-icon="el-icon-lock"
                        placeholder="请确认密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input
                        v-model="regForm.email"
                        prefix-icon="el-icon-connection"
                        placeholder="请输入邮箱地址"
                    ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" v-on:click="reg">注册</el-button>
                    <el-button type="success" @click="login">已有账号返回登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        var checkUsername = (rule, value, callback) => {
            this.$http
                .post("checkUsername", this.regForm)
                .catch(() => {
                    this.$message({
                        showClose: true,
                        message: "用户名验证超时",
                        type: "warning",
                        duration: 5000,
                    });
                })
                .then((ret) => {
                    // console.log(ret);
                    if (ret.data.code === 200) {
                        console.log("用户名不存在");
                        return callback();
                    } else if (ret.data.code === 400) {
                        console.log("用户名已存在");
                        callback(new Error(ret.data.msg));
                    }
                });
        };
        var checkPassword = (rule, value, callback) => {
            if (this.regForm.password !== this.regForm.checkpassword) {
                return callback(new Error("两次输入的密码不一致"));
            } else {
                return callback();
            }
        };
        var chekEmialFormat = (rule, value, callback) => {
            const regEmail = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+.)+[A-Za-z]{2,6}$/;
            if (regEmail.test(value)) {
                return callback();
            } else {
                return callback(new Error("邮箱地址不合法"));
            }
        };
        var chekEmialExist = (rule, value, callback) => {
            this.$http
                .post("checkEmail", this.regForm)
                .catch(() => {
                    this.$message({
                        showClose: true,
                        message: "email验证超时",
                        type: "warning",
                    });
                })
                .then((ret) => {
                    // console.log(ret);
                    if (ret.data.code === 200) {
                        console.log("邮箱不存在");
                        return callback();
                    } else if (ret.data.code === 400) {
                        console.log("邮箱已存在");
                        callback(new Error(ret.data.msg));
                    }
                });
        };
        return {
            regForm: {
                username: "123123",
                password: "123123",
                checkpassword: "123123",
                email: "sfluo@vip.qq.com",
            },
            // 表单数据校验规则
            regFormRules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 10,
                        message: "长度在 3 到 10 个字符之间",
                        trigger: "blur",
                    },
                    {
                        validator: checkUsername,
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        message: "密码不可小于 6 位字符",
                        trigger: "blur",
                    },
                ],
                checkpassword: [
                    { required: true, message: "请确认密码", trigger: "blur" },
                    { validator: checkPassword, trigger: "blur" },
                ],
                email: [
                    {
                        required: true,
                        message: "邮箱地址不能为空",
                        trigger: "blur",
                    },
                    { validator: chekEmialFormat, trigger: "blur" },
                    { validator: chekEmialExist, trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        reg() {
            this.$refs.regFormRef.validate(async (valid) => {
                if (!valid) return;
                const result = await this.$http
                    .post("reg", this.regForm)
                    .catch(() => {
                        this.$message({
                            showClose: true,
                            message: "注册超时",
                            type: "warning",
                            duration: 5000,
                        });
                    });
                console.log(result.data);
                if (result.data.code === 200) {
                    this.$message({
                        showClose: true,
                        message: result.data.msg,
                        type: "success",
                        duration: 5000,
                    });
                    // 注册成功重定向到用户激活界面
                    this.$router.push("/activeUser/" + this.regForm.email);
                } else if (result.data.code === 400) {
                    this.$message({
                        showClose: true,
                        message: result.data.msg,
                        type: "error",
                        duration: 5000,
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: "登录超时",
                        type: "warning",
                        duration: 5000,
                    });
                }
            });
        },
        login() {
            this.$router.push("/login");
        },
    },
};
</script>
<style lang="less" scoped>
.reg_container {
    background-color: #2b4b6b;
    height: 100%;
}
.reg_box {
    width: 350px;
    height: 420px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.regForm {
    position: absolute;
    top: 100px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns {
    display: flex;
    justify-content: flex-end;
}
</style>
