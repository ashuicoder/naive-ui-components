<template>
  <naive-ui-upload
    v-model:value="fileList"
    :size="5"
    multiple
    list-type="text"
    @update:value="handleChange"
  ></naive-ui-upload>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { NaiveUiUpload, type FileInfo } from 'naive-ui-upload'
import { ref } from 'vue'

const fileList = ref<FileInfo[]>([
  {
    id: '88ae79b0',
    name: '微信截图_20250421181445.png',
    url: 'http://localhost:3000/1746609828451.png',
    status: 'finished',
    fileName: '微信截图_20250421181445.png'
  }
])

function handleChange(value) {
  console.log(value)
}

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
  return data
}
</script>

<style scoped></style>
