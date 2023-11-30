<template>
  <naive-ui-upload
    v-model:value="fileList"
    :size="5"
    multiple
    :requestFunc="handleUpload"
    list-type="image-card"
  ></naive-ui-upload>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { generateUploadInfo, NaiveUiUpload } from 'naive-ui-upload'
import { ref } from 'vue'
import type { UploadFileInfo } from 'naive-ui'

const fileList = ref<UploadFileInfo[]>([])

async function handleUpload(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const [err, res] = await to(
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
  )
  if (err) {
    throw err
  }
  const data = await res.json()
  return data.url
}
</script>

<style scoped></style>
