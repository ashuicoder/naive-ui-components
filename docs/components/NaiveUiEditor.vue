<template>
  <NaiveUiEditor v-model:value="content" :requestFunc="handleUpload" />
</template>

<script setup lang="ts">
import { NaiveUiEditor } from 'naive-ui-editor'
import { ref } from 'vue'

const content = ref<string>('')
function handleUpload(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://picsum.photos/200/300')
    }, 1000)
  })
}
</script>
