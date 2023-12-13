<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <div class="left">
                        <span>我获取的应用</span>
                    </div>
                    <el-input v-model="keyword" placeholder="搜索应用" @blur="getFilterApps" @keyup.enter="getFilterApps"/>
                </div>
            </template>
            <el-table :data="filterApps" style="width: 100%">
                <el-table-column prop="name" label="应用名称" width="300px">
                </el-table-column>
                <el-table-column label="应用描述" prop="description"></el-table-column>
                <el-table-column label="更新时间" prop="updated_time">
                </el-table-column>
                <el-table-column  label="操作" width="300px">
                    <template #="{ row }">
                        <el-button icon="VideoPlay" circle />
                        <el-button icon="Edit" circle />
                        <el-button icon="Delete" circle @click="deleteApp(row.name)"/>
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
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="addApp">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { app } from '@/api/app/type';
import {  onMounted, ref } from 'vue';


let dialogVisible = ref<boolean>(false)
let keyword = ref<string>();
// let pageNo = ref<number>(1);
// //每一页展示多少条数据
// let limit = ref<number>(5);
// //数据总数
// let total = ref<number>(0);
//存储已有应用的数据
let totalApps = ref<app[]>([]);

let filterApps = ref<app[]>([]);

// const getHasApps = async (pager = 1) => {
//     //当前页码
//     pageNo.value = pager;
//     let result: any = await reqHasApps(pageNo.value, limit.value);
//     if (result.code == 200) {

//         total.value = result.data.total;
//         totalApps.value = result.data.records;
//     }
// }
// //组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有应用数据

const getFilterApps = ()=>{
    if(!keyword.value){
        filterApps.value=totalApps.value
        return
    }
    else{
        filterApps.value = totalApps.value.filter(v=>v.name.includes(keyword.value as string))
    }
}
const appInfo = ref<app>({
    name:'',
    description:'',
    updated_time:''
})
const addApp = ()=>{
    totalApps.value.push(appInfo.value as app)
    dialogVisible.value = false
}
const deleteApp = (id:string)=>{
    totalApps.value=totalApps.value.filter(v=>v.name!==id)
    filterApps.value=totalApps.value
}
onMounted(() => {
    totalApps.value = [
        {
            name:'test1',
            description:'test1',
            updated_time:'2023-07-08'
        },
        {
            name:'test2',
            description:'test1',
            updated_time:'2023-07-08'
        },
        {
            name:'test3',
            description:'test1',
            updated_time:'2023-07-08'
        }
    ]
    filterApps.value=totalApps.value
    // getHasApps();
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