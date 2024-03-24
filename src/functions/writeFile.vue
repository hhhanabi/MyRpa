<script setup lang="ts">

import functionStore from '@/store/modules/function';
import { ref } from 'vue';
import codeListStore from '@/store/modules/codeList';
let params = ref<string[]>([])
let result: string[] = []
const name = 'writeFile'
const addFunction = () => {
  result.push(`with open('${params.value[0]}', 'r',encoding='utf-8') as file:`)
  result.push(`\tfile.write('${params.value[1]}')`)
  functionStore().addToCurrentCodes(result);
  codeListStore().addWriteFile(params.value?.[0],params.value[1])
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
      <el-form-item label="文件路径" label-width="80px">
        <el-input v-model="params[0]"></el-input>
      </el-form-item>
      <el-form-item label="文件内容" label-width="80px">
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