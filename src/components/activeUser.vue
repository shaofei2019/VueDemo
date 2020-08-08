<template>
    <div class="reg_container">
        <div class="reg_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" />
            </div>
            <div style="margin-top:100px"></div>
            <div class="tip">
                <h3>最后一步</h3>
                <p>现在，请激活你的账户。激活邮件已发送到您的邮箱，请按照邮件提示操作。</p>
            </div>
            <div class="tip">
                <h3>你可能需要</h3>
                <li>
                    <a>未收到邮件？</a>
                    <el-button @click="sentActiveEmail">再发送一次</el-button>
                </li>
                <li>
                    <a>邮箱填写有误？</a>
                    <el-button @click="modifyEmail">立即修改</el-button>
                </li>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["email"],
    data() {
        return {
        };
    },
    methods: {
        async sentActiveEmail() {
            console.log(this.email);
            this.$http
                .get("activeUserByEmail", {
                    params: {
                        email: this.email,
                    },
                })
                .catch(() => {
                    this.$message({
                        showClose: true,
                        message: "网络故障",
                        type: "warning",
                        duration: 5000,
                    });
                })
                .then((ret) => {
                    console.log(ret);
                    if (ret.data.code === 200) {
                        this.$message({
                            showClose: true,
                            message: ret.data.msg,
                            type: "success",
                            duration: 5000,
                        });
                    } else if (ret.data.code === 400) {
                        this.$message({
                            showClose: true,
                            message: ret.data.msg,
                            type: "error",
                            duration: 5000,
                        });
                    } else if (ret.data.code === 401) {
                        this.$message({
                            showClose: true,
                            message: ret.data.msg,
                            type: "error",
                            duration: 5000,
                        });
                    } else if (ret.data.code === 402) {
                        this.$message({
                            showClose: true,
                            message: ret.data.msg,
                            type: "error",
                            duration: 5000,
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: "未知",
                            type: "warning",
                            duration: 5000,
                        });
                    }
                });
        },
        modifyEmail() {
            this.$router.push("/modifyEmail/" + this.email)
        }
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
.tip {
    width: 80%;
    margin: 0 auto;
    h3 {
        text-align: center;
    }
    li {
        margin-bottom: 10px;
    }
}
.btns {
    display: flex;
    justify-content: flex-end;
}
</style>
