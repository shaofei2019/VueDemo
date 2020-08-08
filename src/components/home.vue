<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/logo.png" alt />
                <span>后台管理系统</span>
            </div>
            <el-button v-on:click.prevent="logout" class="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggleMenu" v-on:click.prevent="toggleCollapase">|||</div>
                <el-menu
                    class="el-menu-vertical-demo"
                    background-color="#313743"
                    text-color="#fff"
                    active-text-color="#41B883"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                    :default-active="$route.path"
                >
                    <!-- 一级菜单 -->
                    <el-submenu index="1">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本 -->
                            <span>通用</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/setting">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="/user">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>用户</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="1-3">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本 -->
                            <span>通用</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="2-1">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="2-2">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="2-3">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本 -->
                            <span>通用</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="3-1">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="3-2">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                        <!-- 二级菜单 -->
                        <el-menu-item index="3-3">
                            <!-- 二级菜单模板区域 -->
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-lock"></i>
                                <!-- 文本 -->
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view :testVar="testVar"></router-view>
                <!-- <setting :testVar="testVar" /> -->
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import Setting from '../components/common/setting.vue'

export default {
    components: {
        Setting
    },
    data() {
        return {
            isCollapse: false,
            testVar: "123"
        }
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
            this.$message({
                showClose: true,
                message: "已成功退出",
                type: "success",
            });
        },
        toggleCollapase() {
        this.isCollapse = !this.isCollapse
    }
    }
};
</script>
<style lang="less" scoped>
.home-container {
    height: 100%;
}
.el-header {
    background-color: #363d40;
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        height: 100%;
        display: flex;
        align-items: center;
        img {
            height: 100%;
        }
        span {
            margin-left: 15px;
        }
    }
}
.el-aside {
    background-color: #313743;
    .toggleMenu{
        height: 30px;
        background-color: #475161;
        font-size: 10px;
        color: white;
        line-height: 30px;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
    .el-menu {
        border-right: none;
    }
}
.el-main {
    background-color: #e9edf1;
}
</style>
