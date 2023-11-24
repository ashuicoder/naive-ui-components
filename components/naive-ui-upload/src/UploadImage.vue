<template>
  <div>
    <input ref="inputRef" type="file" style="display: none" @change="handleChange" />
    <NSpace>
      <div
        v-for="item in imgList"
        :key="item"
        style="width: 94px; height: 94px; border: 1px dashed #ccc"
      >
        <img :src="item" style="object-fit: contain; width: 100%; height: 100%" />
      </div>
      <div class="n-upload-box" @click="handleSelectFile">
        <NIcon :size="30">
          <AddIcon></AddIcon>
        </NIcon>
      </div>
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import { NSpace, NIcon, useMessage, NSpin } from 'naive-ui'
import { Add as AddIcon } from '@vicons/ionicons5'
import type { RequestFun } from './types'
import to from 'await-to-js'

export interface Props {
  value: string[]
  requestFunc: RequestFun
  max?: number
  size?: number
  multipe?: boolean
}

interface Emits {
  (e: 'update:value', value: string[]): void
}

const message = useMessage()

const props = withDefaults(defineProps<Props>(), {
  max: 1,
  size: 2,
  multipe: true
})

const emits = defineEmits<Emits>()

const imgList = computed({
  get() {
    return props.value
  },
  set(val) {
    emits('update:value', val)
  }
})

const inputRef = ref<HTMLInputElement | null>(null)

function handleSelectFile() {
  inputRef.value?.click()
}

function handleChange() {
  const fileList = inputRef.value!.files
  if (!fileList) return
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]
    if (handleBeforeUpload(file)) {
      handleUpload(file)
    }
  }
}

function handleBeforeUpload(file: File): boolean {
  if (file.size > props.size * 1024 * 1024) {
    message.error(`“${file.name}”文件大小不能超过${props.size}M`)
    return false
  }

  return true
}

const injectRequestFunc = inject<RequestFun | undefined>('requestFunc')
const uploadApi = props.requestFunc ?? injectRequestFunc
if (!uploadApi) {
  throw new Error('requestFunc is required')
}
async function handleUpload(file: File) {
  const [err, res] = await to(uploadApi(file))
  if (err) return
  imgList.value.push(res)
}
</script>

<style lang="scss" scoped>
.n-upload-box {
  width: 94px;
  height: 94px;
  border: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
