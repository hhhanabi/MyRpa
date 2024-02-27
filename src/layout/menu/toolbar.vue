<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" id="el-tree" />
    <my_if></my_if>
  </div>
</template>
  
<script lang="ts" setup>
import Node from 'element-plus/es/components/cascader-panel/src/node.mjs';
import my_if from '@/functions/condition/if.vue'

import functionStore from '@/store/modules/function';
interface Tree {
  label: string
  name: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree, node: Node) => {
  if (!node.isLeaf) return
  functionStore().visible[data.name]=true
}

const data: Tree[] = [
  {
    label: '条件判断',
    name:'my_if',
    children: [
      {
        label: 'IF条件',
        name:'my_if'
      },
      {
        label: 'Else IF',
        name:'my_if'
      },
      {
        label: 'END IF',
        name:'my_if'
      },
      {
        label: 'IF 文件存在',
        name:'my_if'
      },
      {
        label: 'IF 文件夹存在',
        name:'my_if'
      },
    ],
  },
  {
    label: '循环',
    name:'my_if',
    children: [
      {
        label: 'For次数循环',
        name:'my_if'
      },
      {
        label: 'While条件循环',
        name:'my_if'
      },
      {
        label: 'ForEach列表循环',
        name:'my_if'
      },
      {
        label: '退出循环',
        name:'my_if'
      },
      {
        label: '循环结束',
        name:'my_if'
      },
    ],
  },
  {
    label: '网页操作',
    name:'my_if',
    children: [
      {
        label: '打开网页',
        name:'my_if'
      },
      {
        label: '点击元素',
        name:'my_if'
      },
      {
        label: '填写输入框',
        name:'my_if'
      },
      {
        label: '关闭网页',
        name:'my_if'
      },
    ],
  },
  // {
  //   label: '鼠标键盘',
  //   children: [
  //     {
  //       label: '键盘输入',
  //     },
  //     {
  //       label: '鼠标点击',
  //     },
  //     {
  //       label: '移动鼠标',
  //     },
  //     {
  //       label: '获取鼠标当前位置',
  //     },
  //   ]
  // },
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
  // {
  //   label: '数据处理',
  //   children:[
  //     {
  //       label:'设置变量'
  //     },
  //     {
  //       label:'产生随机数'
  //     }
  //   ]
  // },
  // {
  //   label: '操作系统',
  //   children:[
  //     {
  //       label:'获取文件列表'
  //     },
  //     {
  //       label:'拷贝文件'
  //     },
  //     {
  //       label:'移动文件'
  //     },
  //     {
  //       label:'文件重命名'
  //     },
  //     {
  //       label:'删除文件'
  //     },
  //     {
  //       label:'读取文件'
  //     },
  //     {
  //       label:'写入文件'
  //     }
  //   ]
  // }
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