<template>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <span>是否离开？未保存的更改将会被丢弃</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false;functionStore().clear();layoutStore.isMenu=true;$router.push('/app/dev')">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import useLayoutStore from '@/store/modules/layout';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import functionStore from '@/store/modules/function';
const $router = useRouter()
const dialogVisible = ref(false)
const layoutStore = useLayoutStore()
const switchVisible = () => {
    dialogVisible.value = !dialogVisible.value
}

defineExpose({switchVisible})
</script>

<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
  