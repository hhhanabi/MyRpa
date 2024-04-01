<template>
    <div class="container">
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
            <h1 class="title">MyRPA</h1>
            <el-col :span="10" :push="7">
                <el-form-item prop="username">
                    <el-input size="large" :prefix-icon="User" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="large" type="password" :prefix-icon="Lock" show-password
                        v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login(loginFormRef)" type="primary" class="button" :loading="loading">登录</el-button>
                    <el-button @click="register(loginFormRef)" type="primary" class="button" :loading="loading">注册</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import useUserStore from '../../store/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification, FormInstance } from 'element-plus';
import { getTime } from '../../utils/time'

let loginForm = reactive({
    username: '',
    password: ''
})
const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'change' },
        { min: 3, max: 11, message: '账号长度应为3-11位', trigger: 'change' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'change' }
    ]
}
let loading = ref(false)
let useStore = useUserStore()
let $router = useRouter()
const loginFormRef=ref<FormInstance>()

const login = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    await formEl.validate()
    try {
        await useStore.login(loginForm)
        // await useStore.userInfo()
        $router.push('/app/dev')
        ElNotification({
            type: 'success',
            message: getTime()
        })
    } catch (error) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}

const register = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    await formEl.validate()
    try {
        await useStore.register(loginForm)
        $router.push('/app/dev')
        ElNotification({
            type: 'success',
            message: '注册成功'
        })
    } catch (error) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
    loading.value = false
}


</script>

<style lang="scss" scoped>
.container {
    width: 500px;
    height: 50vh;
    background: white;
    border: 1px solid rgb(180, 169, 169);
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    border-radius: 10px;
    .title {
        margin-bottom: 20%;
    }

    .button {
        margin-top: 40%;
    }
}
</style>