<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Logo></Logo>
        </div>
        <div class="tabbar_right noDrag">
            <el-popover placement="top-start" :width="200" trigger="hover">
                <template #reference>
                    <el-button icon="Setting" circle class="noDrag"></el-button>
                </template>
                <el-form>
                    <el-form-item label="暗黑模式">
                        <el-switch @change="changeDark" v-model="dark" class="mt-2" style="margin-left: 24px" inline-prompt
                            active-icon="MoonNight" inactive-icon="Sunny" />
                    </el-form-item>
                </el-form>
            </el-popover>
            <img src="/110168986_p0.png" alt="">
            <el-dropdown trigger="hover">
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <el-divider direction="vertical" />

            <el-button icon="Refresh" circle @click="setWin('refresh')"></el-button>
            <el-button icon="Minus" circle @click="setWin('min')"></el-button>
            <el-button icon="FullScreen" circle @click="setWin('max')"></el-button>
            <el-button icon="Close" circle @click="setWin('close')"></el-button>

        </div>
    </div>
</template>

<script lang="ts" setup>
import Logo from '../logo/index.vue'
import { ref } from 'vue';
import userStore from '../../store/modules/user'
import { useRouter } from 'vue-router';

const { ipcRenderer } = require("electron");

const store = userStore()
let $router = useRouter()
const dark = ref(false)

const setWin = (type: string) => {
    ipcRenderer.send(type)
}

const logout = async () => {
    await store.userLogout()
    $router.push({ path: '/login' })
}

const changeDark = () => {
    const html = document.documentElement
    dark.value ? html.className = 'dark' : html.className = ''
}
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    .tabbar_right {
        display: flex;
        align-items: center;
        margin: 10px;

        .el-icon--right {
            margin-right: 20px;
        }

        img {
            width: 36px;
            height: 36px;
            margin-left: 20px;
            border-radius: 50%;
        }
    }
}

html.dark .tabbar {
    background-color: black;
}

.tabbar {
    -webkit-app-region: drag;

    .noDrag {
        -webkit-app-region: no-drag;
    }
}
</style>