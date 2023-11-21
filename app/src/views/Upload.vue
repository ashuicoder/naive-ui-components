<template>
  <NaiveUiUpload list-type="image-card" :requestFunc="handleUpload"></NaiveUiUpload>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { NaiveUiUpload } from 'naive-ui-upload'

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
