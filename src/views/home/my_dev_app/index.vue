<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <div class="left">
                        <el-button icon="Plus" type="danger" round @click="dialogVisible = !dialogVisible">新建应用</el-button>
                    </div>
                    <el-input v-model="keyword" placeholder="搜索应用" @blur="getFilterApps" @keyup.enter="getFilterApps" />
                </div>
            </template>
            <el-table :data="filterApps" style="width: 100%">
                <el-table-column prop="name" label="应用名称" width="300px">
                </el-table-column>
                <el-table-column label="应用描述" prop="description"></el-table-column>
                <el-table-column label="创建时间" prop="updated_time">
                </el-table-column>
                <el-table-column label="操作" width="300px">
                    <template #="{ row }">
                        <el-button icon="VideoPlay" circle @click="playApp(row.path)" />
                        <el-button icon="Edit" circle @click="editApp(row)" />
                        <el-button circle icon="Upload" @click="uploadApp(row)"></el-button>
                        <el-button icon="Delete" circle @click="deleteApp(row)" />
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="10" />
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
import functionStore from '@/store/modules/function'
import request from '@/utils/request';
import useUserStore from '@/store/modules/user';
const fs = require('fs');
const path = require('path')
const { exec } = require('child_process');
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
    updated_time: '',
    path: '',
    folderPath:''
})
const baseDir = "d://test//"
const addApp = () => {
    try {
        fs.mkdirSync(`${baseDir}/${appInfo.value.name}`)
        fs.writeFileSync(`${baseDir}/${appInfo.value.name}/${appInfo.value.name}.py`, '')
        fs.writeFileSync(`${baseDir}/${appInfo.value.name}/${appInfo.value.name}currentId.json`, `1`)
        fs.writeFileSync(`${baseDir}/${appInfo.value.name}/${appInfo.value.name}codeList.json`, ``)
        const currentCodes = [
            {
                id: 0,
                codes: [
                    'import time',
                    "from selenium import webdriver",
                    "from selenium.webdriver.chrome.options import Options",
                    "from selenium.webdriver.common.by import By",
                    'from selenium.webdriver import ActionChains',
                    `import pyautogui`,
                    "chrome_options = Options()",
                    `chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")`,
                ],
            },
        ]
        fs.writeFile(`${baseDir}/${appInfo.value.name}/${appInfo.value.name}codes.json`, JSON.stringify(currentCodes, null, 4), (err: any) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
            console.log('Data has been written to data.json');
        });
        fs.writeFileSync(`${baseDir}/${appInfo.value.name}/${appInfo.value.name}codes.json`, ``)
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
    dialogVisible.value = false
    loadInfo()
}
const deleteApp = (row: any) => {
    console.log(row.path)
    const folderPath = path.dirname(row.path)
    try {
        // 删除文件夹及其内容
        fs.rmdirSync(folderPath, { recursive: true });
        console.log(`文件夹 ${folderPath} 已成功删除`);
    } catch (error: any) {
        console.error(`删除文件夹时出错: ${error.message}`);
    }
    totalApps.value = totalApps.value.filter(v => v.name !== row.name)
    filterApps.value = totalApps.value
}
const editApp = (row: any) => {
    useLayoutStore().changeMenu()
    functionStore().setCurrentFilePath(row.path)
    functionStore().recoverState()
    $router.push('edit')
}
const uploadApp = (row: any) => {

    // 创建 FormData 对象，并将文件添加到其中
    const formDataPy = new FormData();
    formDataPy.append('file', `${row.path}.py`);
    const formDataId = new FormData();
    formDataId.append('file', `${row.path}currentId.json`);
    const formDataCodes = new FormData();
    formDataCodes.append('file', `${row.path}codes.json`);
    const formDataCodeList = new FormData();
    formDataCodeList.append('file', `${row.path}codeList.json`);
    const formDataDescription = new FormData();
    const fileDescription =new Blob(fs.readFileSync(`${row.folderPath}/description.txt`));
    formDataDescription.append('file', fileDescription,'description.txt')
    formDataDescription.append('folderName', row.name)
    formDataDescription.append('uploader', useUserStore().username)
    // 使用 Axios 发送 POST 请求
    request.post('/file/upload', formDataDescription, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

}
const playApp = (pythonFilePath: string) => {
    // 构建要执行的命令
    const command = `python ${pythonFilePath}.py`;

    // 执行命令
    exec(command, (error: any, stdout: any) => {
        if (error) {
            console.error(`执行命令时出错: ${error}`);
            return;
        }
        ElNotification({
            type: 'error',
            message: stdout
        })
    })
}
const loadInfo = () => {
    try {
        const folders = fs.readdirSync(baseDir, { withFileTypes: true })
            .filter((dirent: { isDirectory: () => any; }) => dirent.isDirectory())
            .map((dirent: { name: any; }) => dirent.name);

        totalApps.value = folders.map((folder: any) => {
            const folderPath = path.join(baseDir, folder);
            const descriptionPath = path.join(folderPath, 'description.txt');

            let description = '';
            let updatedTime = '';

            try {
                // 读取description.txt文件内容
                description = fs.readFileSync(descriptionPath, 'utf-8');

                // 获取文件的创建时间
                const stats = fs.statSync(folderPath);
                updatedTime = stats.birthtime.toISOString();  // 使用ISO格式的时间

            } catch (error) {
                console.error(`Error reading description.txt in ${folder}:`, error);
            }

            return {
                name: folder,
                description: description,
                updated_time: updatedTime.slice(0, 10),
                path: path.join(folderPath, folder),
                folderPath:folderPath
            };
        });

        filterApps.value = totalApps.value;
    } catch (error) {
        console.error('Error reading directories:', error);
    }
}
onMounted(() => {
    loadInfo()
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

.el-pagination {
    justify-content: center
}
</style>