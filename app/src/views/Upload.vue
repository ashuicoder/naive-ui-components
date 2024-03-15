<template>
  <naive-ui-upload
    v-model:value="fileList"
    :size="5"
    multiple
    accept=".Mp4  ,  .Png"
    :requestFunc="handleUpload"
    list-type="image-card"
    :cropper="{
      autoCrop: true
    }"
  ></naive-ui-upload>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { NaiveUiUpload, type FileInfo } from 'naive-ui-upload'
import { ref } from 'vue'

const fileList = ref<FileInfo[]>([
  {
    id: '1',
    url: 'https://eibp-frontend.oss-cn-hangzhou.aliyuncs.com/portal-website/images1/46.png',
    name: '自定义上传的',
    status: 'finished'
  }
])

console.log(fileList.value)

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
