<template>
  <naive-ui-upload
    v-model:value="fileList"
    :size="5"
    multiple
    :requestFunc="handleUpload"
    list-type="image-card"
    :cropper="{
      autoCrop: true
    }"
  ></naive-ui-upload>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { NaiveUiUpload } from 'naive-ui-upload'
import { ref } from 'vue'

const fileList = ref<string[]>([
  'http://localhost:3000/1701653775189.jpg',
  'http://localhost:3000/1701653775189.jpg'
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

setTimeout(() => {
  fileList.value.push('http://localhost:3000/1701653775189.jpg')
}, 3000)
</script>

<style scoped></style>
