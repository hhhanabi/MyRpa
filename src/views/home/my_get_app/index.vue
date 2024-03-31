<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <div class="left">
                        <el-upload class="upload-demo" action="http://localhost:8080/file/upload" multiple
                            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="10"
                            :headers="headers" :on-exceed="handleExceed" :data="formData" :before-upload="beforeUpload"
                            :show-file-list=false>
                            <el-button type="primary" round>上传</el-button>
                            <template #tip>
                                <div class="el-upload__tip">

                                </div>
                            </template>
                        </el-upload>
                    </div>
                    <el-input v-model="keyword" placeholder="搜索应用" @blur="getFilterApps" @keyup.enter="getFilterApps" />
                </div>
            </template>
            <el-table :data="filterApps" style="width: 100%">
                <el-table-column prop="name" label="应用名称" width="300px">
                </el-table-column>
                <el-table-column label="应用描述" prop="description"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template #="{ row }">
                        <el-button icon="Download" circle @click="download(row)" />
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
import { onMounted, ref } from 'vue';
import { ElNotification } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'
import useUserStore from '@/store/modules/user';
import { reqGetFileList } from '@/api/app/get_app';
const fs = require('fs');


const formData = ref<Record<string, any>>({});
let dialogVisible = ref<boolean>(false)
let keyword = ref<string>();
type file = {
    name: '',
    description: '',
    url:'',
    id:''
}
let totalApps = ref<file[]>([]);

let filterApps = ref<file[]>([]);
const setFolderName = (file: File) => {
    // 获取第一个文件的名称作为文件夹名称
    const folderName = file.name.split('.')[0];
    formData.value.folderName = folderName;
};

const beforeUpload = (file: File) => {
    if (file.name.endsWith('.py')) {
        setFolderName(file);
      }
};
const headers = {
    Authorization: `Bearer ${useUserStore().token}`
}
const getFilterApps = () => {
    if (!keyword.value) {
        filterApps.value = totalApps.value
        return
    }
    else {
        filterApps.value = totalApps.value.filter(v => v.name.includes(keyword.value as string))
    }
}
const appInfo = ref<file>({
    name: '',
    description: '',
    url:'',
    id:''
})
const baseDir = "r://test//"
const addApp = () => {
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
        message: '创建成功'
    })
    totalApps.value.push(appInfo.value)
    dialogVisible.value = false
}
const getFileList = async () => {
    const result = await reqGetFileList()
    if (result.code == 200) {
        //存储已有品牌总个数
        totalApps.value = result.data;
        filterApps.value = result.data;
    } 
}
import request from "@/utils/request";
const download = async (row:any) => {
    const url = `/uploadFile/${row.url}/${row.url}.py`
    const result =await request.get(url,{ responseType: 'arraybuffer'})
    const codes =await request.get(`/uploadFile/${row.url}/${row.url}codes.json`,{ responseType: 'arraybuffer'})
    const codeList =await request.get(`/uploadFile/${row.url}/${row.url}codeList.json`,{ responseType: 'arraybuffer'})
    console.log(result);
    try {
        fs.mkdirSync(`${baseDir}/${row.url}`)
        fs.writeFileSync(`${baseDir}/${row.url}/${row.url}.py`, Buffer.from(result))
        fs.writeFileSync(`${baseDir}/${row.url}/description.txt`, `${row.description}`)
        fs.writeFileSync(`${baseDir}/${row.url}/${row.url}codes.json`, `${Buffer.from(codes)}`)
        fs.writeFileSync(`${baseDir}/${row.url}/${row.url}codeList.json`, `${Buffer.from(codeList)}`)
    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as NodeJS.ErrnoException).message
        })
        console.log(error);
        return
    }
    ElNotification({
        type: 'success',
        message: '创建成功'
    })
}
onMounted(() => {
    getFileList()
});


const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
        } totally`
    )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
        `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
        () => true,
        () => false
    )
}
</script>

<style  lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;

    .left {
        display: flex;
        justify-content: space-between;
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