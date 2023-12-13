<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Logo></Logo>
        </div>
        <div class="tabbar_right">
            <el-button size="small" icon="Refresh" circle></el-button>
            <el-button size="small" icon="FullScreen" circle></el-button>
            <el-popover placement="top-start" :width="200" trigger="hover">
                <template #reference>
                    <el-button size="small" icon="Setting" circle></el-button>
                </template>
                <el-form>
                    <el-form-item label="暗黑模式">
                        <el-switch @change="changeDark" v-model="dark" class="mt-2" style="margin-left: 24px" inline-prompt
                            active-icon="MoonNight" inactive-icon="Sunny" />
                    </el-form-item>
                </el-form>
            </el-popover>

            <img src="/110168986_p0.png" alt="">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ store.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Logo from '../logo/index.vue'
import { ref } from 'vue';
import userStore from '../../store/modules/user'
import { useRouter } from 'vue-router';
const store = userStore()
let $router = useRouter()
const dark = ref(false)
const logout = async () => {
    await store.userLogout()
    $router.push({ path: '/login' })
}

const changeDark=()=>{
    const html = document.documentElement
    dark.value?html.className='dark':html.className=''
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
        margin: 30px;

        img {
            width: 24px;
            height: 24px;
            margin-left: 20px;
            border-radius: 50%;
        }
    }
}
html.dark .tabbar{
    background-color: black;
}
</style>