<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <router-view></router-view>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui'
</script>

<style scoped></style>
