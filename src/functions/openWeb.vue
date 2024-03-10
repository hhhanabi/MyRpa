<script setup lang="ts">

import functionStore from '@/store/modules/function';
let params:string[] = []
let result:string[] = []
const store = functionStore();
const addFunction = ()=>{
  result.push("driver = webdriver.Chrome(options=chrome_options)")
  result.push("driver.get("+params[0]+")")
  result.push(params[1]+"=driver")
  store.addToCurrentCodes(result);
}
</script>

<template>
  <el-dialog v-model="functionStore().visible['openWeb']" title="openWeb" width="30%">
    <el-form style="width: 80%;" :model="params">
      <el-form-item label="网址" label-width="80px">
        <el-input v-model="params[0]"></el-input>
      </el-form-item>
      <el-form-item label="保存网页对象至" label-width="80px">
        <el-input type="textarea" v-model="params[1]"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
                <span class="dialog-footer">
                    <el-button @click="functionStore().disableVisibility('openWeb')">取消</el-button>
                    <el-button type="primary" @click="addFunction()">
                        确定
                    </el-button>
                </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>