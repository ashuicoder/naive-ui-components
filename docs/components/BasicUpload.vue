<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <NaiveUiUpload
        v-model:value="fileList"
        list-type="image-card"
        :requestFunc="handleUpload"
      ></NaiveUiUpload>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN, NMessageProvider, type UploadFileInfo } from 'naive-ui'
import { NaiveUiUpload } from 'naive-ui-upload'
import { ref } from 'vue'

const fileList = ref<UploadFileInfo[]>([])
function handleUpload() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://picsum.photos/200/300')
    }, 1000)
  })
}
</script>

<style scoped></style>
