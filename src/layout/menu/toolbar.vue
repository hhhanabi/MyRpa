<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" id="el-tree" node-key="label" :default-expanded-keys="data.map(tree => tree.label)"/>
    <open-web></open-web>
    <close-web></close-web>
    <set-variable></set-variable>
    <click></click>
    <clear></clear>
    <save-element></save-element>
    <Input></Input>
    <DeleteFile></DeleteFile>
    <ReadFile></ReadFile>
    <WriteFile></WriteFile>
    <MouseClick></MouseClick>
    <MoveMouse></MoveMouse>
    <GetCurrentMousePosition></GetCurrentMousePosition>
    <CreateRandomNumber></CreateRandomNumber>
    <KeyboardInput></KeyboardInput>
  </div>
</template>
  
<script lang="ts" setup>
import Node from 'element-plus/es/components/cascader-panel/src/node.mjs';
import functionStore from '@/store/modules/function';
import OpenWeb from '@/functions/openWeb.vue';
import CloseWeb from '@/functions/closeWeb.vue';
import setVariable from '@/functions/setVariable.vue';
import click from '@/functions/click.vue';
import Clear from '@/functions/clear.vue';
import SaveElement from '@/functions/saveElement.vue';
import Input from '@/functions/input.vue';
import DeleteFile from '@/functions/deleteFile.vue';
import ReadFile from '@/functions/readFile.vue';
import WriteFile from '@/functions/writeFile.vue';
import MouseClick from '@/functions/mouseClick.vue';
import MoveMouse from '@/functions/moveMouse.vue';
import GetCurrentMousePosition from '@/functions/getCurrentMousePosition.vue';
import CreateRandomNumber from '@/functions/createRandomNumber.vue';
import KeyboardInput from '@/functions/keyboardInput.vue';


interface Tree {
  label: string
  name: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree, node: Node) => {
  if (!node.isLeaf) return
  functionStore().enableVisibility(data.name)

}

const data: Tree[] = [
  // {
  //   label: '条件判断',
  //   name:'my_if',
  //   children: [
  //     {
  //       label: 'IF条件',
  //       name:'my_if'
  //     },
  //     {
  //       label: 'Else IF',
  //       name:'my_if'
  //     },
  //     {
  //       label: 'END IF',
  //       name:'my_if'
  //     },
  //     {
  //       label: 'IF 文件存在',
  //       name:'my_if'
  //     },
  //     {
  //       label: 'IF 文件夹存在',
  //       name:'my_if'
  //     },
  //   ],
  // },
  // {
  //   label: '循环',
  //   name:'my_if',
  //   children: [
  //     {
  //       label: 'For次数循环',
  //       name:'my_if'
  //     },
  //     {
  //       label: 'While条件循环',
  //       name:'my_if'
  //     },
  //     {
  //       label: 'ForEach列表循环',
  //       name:'my_if'
  //     },
  //     {
  //       label: '退出循环',
  //       name:'my_if'
  //     },
  //     {
  //       label: '循环结束',
  //       name:'my_if'
  //     },
  //   ],
  // },
  {
    label: '网页操作',
    name:'my_if',
    children: [
      {
        label: '打开网页',
        name:'openWeb'
      },
      {
        label: '保存元素',
        name:'saveElement'
      },
      {
        label: '点击元素',
        name:'click'
      },
      {
        label: '填写输入框',
        name:'input'
      },
      {
        label: '关闭网页',
        name:'closeWeb'
      },
      {
        label: '清空元素',
        name:'clear'
      }
    ],
  },
  {
    label: '鼠标键盘',
    name:'keyboardAndMouse',
    children: [
      {
        label: '键盘输入',
        name:'keyboardInput'
      },
      {
        label: '鼠标点击',
        name:'mouseClick'
      },
      {
        label: '移动鼠标',
        name:'moveMouse'
      },
      {
        label: '获取鼠标当前位置',
        name:'getCurrentMousePosition'
      },
    ]
  },
  // {
  //   label: 'Excel',
  //   name:'my_if',
  //   children:[
  //     {
  //       label:'打开/新建Excel',
  //       name:'my_if'
  //     },
  //     {
  //       label:'保存/另存Excel',
  //       name:'my_if'
  //     },
  //     {
  //       label:'关闭Excel',
  //       name:'my_if'
  //     },
  //     {
  //       label:'读取Excel',
  //       name:'my_if'
  //     },
  //     {
  //       label:'写入内容至Excel工作表',
  //       name:'my_if'
  //     }
  //   ]
  // },
  {
    label: '数据处理',
    name:'dataProcess',
    children:[
      {
        label:'设置变量',
        name:'setVariable'
      },
      {
        label:'产生随机数',
        name:'createRandomNumber'
      }
    ]
  },
  {
    label: '文件',
    name:'file',
    children:[
      {
        label:'删除文件',
        name:'deleteFile'
      },
      {
        label:'读取文件',
        name:'readFile'
      },
      {
        label:'写入文件',
        name:'writeFile'
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label',
}


</script>
  
<style lang="scss" scoped>
#el-tree {
  height: 100%;
}
</style>