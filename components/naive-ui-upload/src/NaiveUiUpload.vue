<template>
  <div>
    <NUpload
      v-bind="getProps()"
      v-model:file-list="fileList"
      list-type="image-card"
      ref="uploadRef"
      @before-upload="handleBeforeUpload"
      @custom-request="handleCustomRequest"
    >
      <slot></slot>
    </NUpload>

    <NModal
      v-model:show="showCropper"
      preset="dialog"
      title="图片裁剪"
      type="info"
      positiveText="确定"
      negativeText="取消"
      style="width: 900px"
      :loading="cropperLoading"
      :onPositiveClick="handleConfirmCropper"
      :onClose="handleCloseCropper"
      :onNegativeClick="handleCloseCropper"
    >
      <div style="display: flex; align-items: center">
        <div style="width: 400px; height: 400px">
          <VueCropper
            ref="cropperRef"
            :img="cropperUrl"
            v-bind="cropper"
            @realTime="handlePreview"
          ></VueCropper>
        </div>
        <div style="flex: 1; margin-left: 20px">
          <img :src="previewUrl" style="width: 100%" />
        </div>
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, nextTick, inject, ref } from 'vue'
import { NUpload, useMessage, NModal } from 'naive-ui'
import to from 'await-to-js'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import type { Props, Emits, RequestFun } from './types'

const uploadRef = ref<InstanceType<typeof NUpload> | null>(null)
const attrs = useAttrs()
const message = useMessage()
const props = defineProps<Props>()

function getProps() {
  return { ...attrs, ...props }
}

console.log(getProps())

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

function verifySize(file: File) {
  if (props.size && file.size > props.size * 1024 * 1024) {
    message.error(`文件大小不能超过${props.size}M`)
    return false
  }
  return true
}

function handleBeforeUpload({ file }: { file: UploadFileInfo }) {
  if (!file.file) return false
  if (props.cropper) {
    handleCropperInit(file)
    return false
  }
  if (!verifySize(file.file)) return false

  return true
}

const cropperRef = ref<InstanceType<typeof VueCropper> | null>(null)
const showCropper = ref(false)
const cropperUrl = ref('')
const cropperLoading = ref(false)
const currentCropperFile = ref<UploadFileInfo | null>(null)
const currentBlob = ref<Blob | null>(null)
function handleCropperInit(file: UploadFileInfo) {
  currentCropperFile.value = file
  cropperUrl.value = URL.createObjectURL(file.file as File)
  showCropper.value = true
}

const previewUrl = ref('')
function handlePreview() {
  cropperRef.value?.getCropBlob((data: Blob) => {
    currentBlob.value = data
    previewUrl.value = URL.createObjectURL(data)
  })
}

async function handleConfirmCropper() {
  if (!uploadApi) {
    throw new Error('requestFunc is required')
  }
  if (!currentCropperFile.value || !currentBlob.value) return false
  const file = new File([currentBlob.value], currentCropperFile.value.name, {
    type: currentCropperFile.value.type as string
  })
  if (!verifySize(file)) return false
  cropperLoading.value = true
  const [err, res] = await to<string>(uploadApi(file))
  cropperLoading.value = false
  if (err) {
    return false
  }
  currentCropperFile.value.file = file
  currentCropperFile.value.url = res
  currentCropperFile.value.status = 'finished'
  fileList.value.push(currentCropperFile.value)
}

function handleCloseCropper() {
  currentCropperFile.value = null
  previewUrl.value = ''
  currentBlob.value = null
  cropperLoading.value = false
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
