<template>
    <div class="flex">
        <VueDraggable ref="el" v-model="codeListStore().codeList" :animation="150"
        @start="onStart"
        @end="onEnd"
        target=".list">
            <TransitionGroup type="transition" :name="!drag?'fade':undefined">
                <div class="list">
                    <el-card shadow="hover" v-for="item in codeListStore().codeList" :key="item.id">
                        {{ item.name }}
                    </el-card>
                </div>
            </TransitionGroup>
        </VueDraggable>
    </div>
</template>
  
<script setup lang="ts">
import { nextTick,ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import codeListStore from "@/store/modules/codeList.ts";
const drag = ref(false)



function onStart() {
  drag.value = true
}
function onEnd() {
  console.log('onEnd')
  nextTick(() => {
    drag.value = false
  })
}

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
  