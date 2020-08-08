<template>
    <div class="modify_container">
        <div class="modify_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" />
            </div>
            <el-form
                ref="modifyFormRef"
                :model="modifyForm"
                :rules="modifyFormRules"
                class="modifyForm"
            >
                <el-form-item prop="oldEmail">
                    <el-input
                        v-model="modifyForm.oldEmail"
                        prefix-icon="el-icon-connection"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="modifyForm.password"
                        prefix-icon="el-icon-lock"
                        placeholder="验证登录密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input
                        v-model="modifyForm.email"
                        prefix-icon="el-icon-connection"
                        placeholder="请输入新的邮箱地址"
                    ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="modify">立即修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    props: ["email"],
    created() {
        this.modifyForm.oldEmail = this.email;
    },
    data() {
        var checkPassword = (rule, value, callback) => {
            this.$http
                .post("checkEmailAndPswd", this.modifyForm)
                .catch(() => {
                    this.$message({
                        showClose: true,
                        message: "响应超时",
                        type: "warning",
                    });
                })
                .then((ret) => {
                    // console.log(ret);
                    if (ret.data.code === 200) {
                        console.log("验证成功");
                        return callback();
                    } else if (ret.data.code === 400) {
                        console.log("验证失败");
                        callback(new Error(ret.data.msg));
                    }
                });
        };
        var chekEmialFormat = (rule, value, callback) => {
            const modifyEmail = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+.)+[A-Za-z]{2,6}$/;
            if (modifyEmail.test(value)) {
                return callback();
            } else {
                return callback(new Error("邮箱地址不合法"));
            }
        };
        var chekEmialExist = (rule, value, callback) => {
            this.$http
                .post("checkEmail", this.modifyForm)
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
            modifyForm: {
                password: "",
                oldEmail: "",
                email: "",
            },
            // 表单数据校验规则
            modifyFormRules: {
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        message: "密码不可小于 6 位字符",
                        trigger: "blur",
                    },
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
        modify() {
            this.$refs.modifyFormRef.validate(async (valid) => {
                console.log(valid);
                if (!valid) return;
                const result = await this.$http
                    .post("modifyEmail", this.modifyForm)
                    .catch(() => {
                        this.$message({
                            showClose: true,
                            message: "响应超时",
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
                    // 修改成功重定向到用户激活界面
                    this.$router.push("/activeUser/" + this.modifyForm.email);
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
                        message: "响应超时",
                        type: "warning",
                        duration: 5000,
                    });
                }
            });
        },
    },
};
</script>
<style lang="less" scoped>
.modify_container {
    background-color: #2b4b6b;
    height: 100%;
}
.modify_box {
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
.modifyForm {
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
