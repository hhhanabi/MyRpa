<template>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" id="el-tree"/>
  </template>
  
  <script lang="ts" setup>
import Node from 'element-plus/es/components/cascader-panel/src/node.mjs';


  interface Tree {
    label: string
    children?: Tree[]
  }
  
  const handleNodeClick = (data: Tree,node:Node) => {
      if(!node.isLeaf) return
  }
  
  const data: Tree[] = [
    {
      label: '条件判断',
      children: [
        {
          label: 'Level two 1-1',
        }
      ],
    },
    {
      label: '循环',
      children: [
        {
          label: 'Level two 2-1',
          children: [
            {
              label: 'Level three 2-1-1',
            },
          ],
        },
        {
          label: 'Level two 2-2',
          children: [
            {
              label: 'Level three 2-2-1',
            },
          ],
        },
      ],
    },
    {
      label: '等待',
      children: [
        {
          label: 'Level two 3-1',
          children: [
            {
              label: 'Level three 3-1-1',
            },
          ],
        },
        {
          label: 'Level two 3-2',
          children: [
            {
              label: 'Level three 3-2-1',
            },
          ],
        },
      ],
    },
    {
      label:'网页自动化'
    },
    {
      label:'Excel'
    },
    {
      label:'数据处理'
    },
    {
      label:'操作系统'
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