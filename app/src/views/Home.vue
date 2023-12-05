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
  }
]
</script>

<style scoped></style>
