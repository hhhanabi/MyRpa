<template>
    <div class="logo">
        <img src="../../../public/110168986_p0.png">
    </div>
</template>

<script lang="ts" setup>



</script>

<style lang="scss">
.logo{
    width:100%;
    height:50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
    background-color: white;
    img{
        width: 100px;
    }
    span{
        margin-right: 20px;
    }
}

html.dark{
    .logo{
        background-color: black;
    }
}
</style>