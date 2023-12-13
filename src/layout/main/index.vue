<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component"></component>
        </transition>
    </router-view>
</template>

<script lang="ts" setup>



</script>

<style lang="scss">
.fade-enter-from {
    opacity:0;
}
.fade-enter-active{
    transition:all 1s;
}
.fade-enter-to{
    opacity:1;
}
</style>