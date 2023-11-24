<template>
  <NUpload
    v-bind="props"
    v-model:file-list="fileList"
    :default-upload="false"
    :custom-request="handleCustomRequest"
  >
    <slot></slot>
  </NUpload>
</template>

<script setup lang="ts">
import { computed, nextTick, inject } from 'vue'
import { NUpload } from 'naive-ui'
import to from 'await-to-js'

import type { UploadCustomRequestOptions } from 'naive-ui'
import type { Props, Emits, RequestFun } from './types'

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  max: 9
})

const emits = defineEmits<Emits>()
const fileList = computed({
  get() {
    return props.value
  },
  set(val) {
    emits('update:value', val)
  }
})

const injectRequestFunc = inject<RequestFun | undefined>('requestFunc')
const uploadApi = props.requestFunc ?? injectRequestFunc

if (!uploadApi) {
  throw new Error('requestFunc is required')
}

async function handleCustomRequest({ file, onError, onFinish }: UploadCustomRequestOptions) {
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
  nextTick(() => {
    const index = fileList.value.findIndex((item) => item.id === file.id)
    fileList.value[index].url = res
  })
}
</script>

<style scoped></style>
