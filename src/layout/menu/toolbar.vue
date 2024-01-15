<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" id="el-tree" />
</template>
  
<script lang="ts" setup>
import Node from 'element-plus/es/components/cascader-panel/src/node.mjs';

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree, node: Node) => {
  if (!node.isLeaf) return
  console.log(data)
}

const data: Tree[] = [
  {
    label: '条件判断',
    children: [
      {
        label: 'IF条件',
      },
      {
        label: 'Else IF',
      },
      {
        label: 'END IF',
      },
      {
        label: 'IF 文件存在',
      },
      {
        label: 'IF 文件夹存在',
      },
    ],
  },
  {
    label: '循环',
    children: [
      {
        label: 'For次数循环',
      },
      {
        label: 'While条件循环',
      },
      {
        label: 'ForEach列表循环',
      },
      {
        label: '退出循环',
      },
      {
        label: '循环结束',
      },
    ],
  },
  {
    label: '网页操作',
    children: [
      {
        label: '打开网页',
      },
      {
        label: '点击元素',
      },
      {
        label: '填写输入框',
      },
      {
        label: '关闭网页',
      },
    ],
  },
  {
    label: '鼠标键盘',
    children: [
      {
        label: '键盘输入',
      },
      {
        label: '鼠标点击',
      },
      {
        label: '移动鼠标',
      },
      {
        label: '获取鼠标当前位置',
      },
    ]
  },
  {
    label: 'Excel',
    children:[
      {
        label:'打开/新建Excel'
      },
      {
        label:'保存/另存Excel'
      },
      {
        label:'关闭Excel'
      },
      {
        label:'读取Excel'
      },
      {
        label:'写入内容至Excel工作表'
      }
    ]
  },
  {
    label: '数据处理',
    children:[
      {
        label:'设置变量'
      },
      {
        label:'产生随机数'
      }
    ]
  },
  {
    label: '操作系统',
    children:[
      {
        label:'获取文件列表'
      },
      {
        label:'拷贝文件'
      },
      {
        label:'移动文件'
      },
      {
        label:'文件重命名'
      },
      {
        label:'删除文件'
      },
      {
        label:'读取文件'
      },
      {
        label:'写入文件'
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