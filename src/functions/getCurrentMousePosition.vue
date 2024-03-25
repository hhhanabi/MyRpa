<script setup lang="ts">

import functionStore from '@/store/modules/function';
import { ref } from 'vue';
import codeListStore from '@/store/modules/codeList';
let params = ref<string[]>([])
let result: string[] = []
const name = 'getCurrentMousePosition'
const addFunction = () => {
  result.push(`${params.value[0]},${params.value[1]} = pyautogui.position()`)
  functionStore().addToCurrentCodes(result);
  codeListStore().addGetCurrentMousePosition(params.value?.[0],params.value[1])
  cancelFunction();
}
const cancelFunction = () => {
  functionStore().disableVisibility(name)
  result = []
  params.value.forEach((_, index) => {
    params.value[index] = "";
  });
}
</script>

<template>
  <el-dialog v-model="functionStore().visible[name]" :title=name width="30%">
    <el-form style="width: 80%;" :model="params">
      <el-form-item label="保存横坐标至" label-width="80px">
        <el-input v-model="params[0]"></el-input>
      </el-form-item>
      <el-form-item label="保存纵坐标至" label-width="80px">
        <el-input v-model="params[1]"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelFunction()">取消</el-button>
        <el-button type="primary" @click="addFunction()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>