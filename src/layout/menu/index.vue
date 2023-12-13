<template>
    <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.meta.hidden">
            <el-menu-item v-if="!item.children" :index="item.path" @click="goRoute">
                <template #title>
                    <el-icon>
                        <component :is='item.meta.icon'></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <el-sub-menu :index="item.children[0].path" v-else>
                <template #title>
                    <el-icon>
                        <component :is='item.meta.icon'></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
defineProps(['menuList'])
let $router=useRouter()
const goRoute=(vc:any)=>{
    $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped>

</style>