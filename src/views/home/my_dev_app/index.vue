<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <div class="left">
                        <span>我开发的应用</span>
                        <el-button icon="Plus" type="danger" round @click="dialogVisible = !dialogVisible">新建应用</el-button>
                    </div>
                    <el-input v-model="keyword" placeholder="搜索应用" @blur="getFilterApps" @keyup.enter="getFilterApps" />
                </div>
            </template>
            <el-table :data="filterApps" style="width: 100%">
                <el-table-column prop="name" label="应用名称" width="300px">
                </el-table-column>
                <el-table-column label="应用描述" prop="description"></el-table-column>
                <el-table-column label="更新时间" prop="updated_time">
                </el-table-column>
                <el-table-column label="操作" width="300px">
                    <template #="{ row }">
                        <el-button icon="VideoPlay" circle />
                        <el-button icon="Edit" circle @click="editApp" />
                        <el-button icon="Delete" circle @click="deleteApp(row.name)" />
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="Tips" width="30%">
            <el-form style="width: 80%;" :model="appInfo">
                <el-form-item label="应用名称" label-width="80px">
                    <el-input v-model="appInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="应用描述" label-width="80px">
                    <el-input type="textarea" v-model="appInfo.description"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false;">取消</el-button>
                    <el-button type="primary" @click="addApp">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { app } from '@/api/app/type';
import { onMounted, ref } from 'vue';
import useLayoutStore from '@/store/modules/layout';
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus';
const fs =require('fs');
const $router = useRouter()

let dialogVisible = ref<boolean>(false)
let keyword = ref<string>();

let totalApps = ref<app[]>([]);

let filterApps = ref<app[]>([]);

const getFilterApps = () => {
    if (!keyword.value) {
        filterApps.value = totalApps.value
        return
    }
    else {
        filterApps.value = totalApps.value.filter(v => v.name.includes(keyword.value as string))
    }
}
const appInfo = ref<app>({
    name: '',
    description: '',
    updated_time: ''
})
const addApp = () => {
    const baseDir="d://test//"
    try {
        fs.mkdirSync(`${baseDir}/${appInfo.value.name}`)
        fs.writeFileSync(`${baseDir}/${appInfo.value.name}/${appInfo.value.name}.py`, '')
        fs.writeFileSync(`${baseDir}/${appInfo.value.name}/description.txt`, `${appInfo.value.description}`)
    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as NodeJS.ErrnoException).message
        })
        return
    }
    ElNotification({
        type: 'success',
        message:'创建成功'
    })
    totalApps.value.push(appInfo.value as app)
    dialogVisible.value = false
}
const deleteApp = (id: string) => {
    totalApps.value = totalApps.value.filter(v => v.name !== id)
    filterApps.value = totalApps.value
}
const editApp = () => {
    useLayoutStore().changeMenu()
    $router.push('edit')
}
onMounted(() => {
    totalApps.value = [
        {
            name: 'test1',
            description: 'test1',
            updated_time: '2023-07-08'
        },
        {
            name: 'test2',
            description: 'test1',
            updated_time: '2023-07-08'
        },
        {
            name: 'test3',
            description: 'test1',
            updated_time: '2023-07-08'
        }
    ]
    filterApps.value = totalApps.value
});


</script>

<style  lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;

    .left {
        span {
            margin-right: 10px;
        }
    }

    .el-input {
        width: 200px
    }

    .el-input__wrapper {
        border-radius: 20px;
        margin-right: 20px
    }
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>