<template>
  <NUpload v-bind="props" v-model:file-list="fileList" :custom-request="handleCustomRequest">
    <slot></slot>
  </NUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NUpload } from 'naive-ui'
import to from 'await-to-js'
import type { UploadFileInfo, UploadCustomRequestOptions, UploadProps } from 'naive-ui'
import type { Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  max: 1
})
const fileList = ref<UploadFileInfo[]>([])

console.log(props)
const uploadApi = props.requestFunc

async function handleCustomRequest({ data, file, onError, onFinish }: UploadCustomRequestOptions) {
  if (!uploadApi) {
    onError()
    throw new Error('requestFunc is required')
  }
  const [err, res] = await to(uploadApi(file.file as File))
  if (err) {
    onError()
    return
  }

  onFinish()
}
</script>

<style scoped></style>
