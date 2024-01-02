<template>
  <NSpace>
    <router-link v-for="item in menuList" :key="item.name" :to="item.url">{{
      item.name
    }}</router-link>
  </NSpace>
</template>

<script setup lang="ts">
import { NSpace } from 'naive-ui'

const menuList = [
  {
    name: '表单',
    url: '/form'
  },
  {
    name: '上传',
    url: '/upload'
  },
  {
    name: '表格',
    url: '/table'
  },
  {
    name: '富文本',
    url: '/editor'
  },
  {
    name: 'ai-editor',
    url: '/ai-editor'
  },
  {
    name: '富文本内容展示',
    url: '/editor-view'
  }
]
</script>

<style scoped></style>
