<template>
    <div class="container">
        <div class="tabbar">
            <Tabbar></Tabbar>
        </div>
        <div class="slider">
            <el-menu v-if="useLayoutStore().isMenu">
                <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu>
            <ToolBar v-else></ToolBar>
        </div>
        
        <div class="main">
            <Main></Main>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useUserStore from '../store/modules/user';
import useLayoutStore from '../store/modules/layout';
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import ToolBar from './menu/toolbar.vue'

let userStore=useUserStore()

</script>

<style lang="scss" scoped>

.container{
    width: 100%;
    height: 100vh;
    background-color: rgb(230, 226, 226);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .slider{
        width: 260px;
        height: 100%;
        background-color: white;
    }
    .tabbar{
        width: 100%;
        height: 50px;
        position: relative;
        z-index: 3;
        box-shadow: 0px 2px 5px rgb(158, 153, 153);
    }
    .main{
        position: absolute;
        top:50px;
        right:0;
        width: calc(100% - 300px);
        height: calc(100vh - 80px);
        overflow: auto;
        margin-top: 20px;
        margin-right: 20px;
        background-color: white;
        border-radius: 20px;
    }
}
html.dark{
    .container{
        background-color: rgb(67, 64, 64);
        .slider{
            background-color: black;
        }
    }
    .main{
        background-color: black;
    }
}
</style>