<template>
    <div class="flex">
        <VueDraggable ref="el" v-model="list" :animation="150" target=".list">
            <TransitionGroup type="transition" :name="!drag?'fade':undefined">
                <div class="list">
                    <el-card shadow="hover" v-for="item in list" :key="item.id">
                        {{ item.name }}
                    </el-card>
                </div>
            </TransitionGroup>
        </VueDraggable>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const drag = ref(false)
const list = ref([
    {
        name: 'Joao',
        id: 1
    },
    {
        name: 'Jean',
        id: 2
    },
    {
        name: 'Johanna',
        id: 3
    },
    {
        name: 'Juan',
        id: 4
    }
])


</script>
  
<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
  