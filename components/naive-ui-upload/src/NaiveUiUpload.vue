<template>
  <div>
    <NUpload
      style="width: 100%"
      v-bind="getProps()"
      v-model:file-list="fileList"
      :on-before-upload="handleBeforeUpload"
      :on-remove="handleRemove"
      :custom-request="handleCustomRequest"
    >
      <slot>
        <NButton v-if="getProps()['list-type'] === 'text' || getProps()['listType'] === 'text'">{{
          uploadText
        }}</NButton>
      </slot>
    </NUpload>
    <div v-if="accept || size" style="margin-top: 8px">
      <template v-if="accept"
        >支持<NText type="info">{{ accept }}</NText
        >格式&nbsp;&nbsp;</template
      >
      <template v-if="size"
        >单个文件不超过<NText type="info">{{ size }}M</NText></template
      >
    </div>
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
            v-bind="getCropperProps()"
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
import { useAttrs, nextTick, inject, ref, watch } from 'vue'
import { NUpload, useMessage, NModal, NButton, NText } from 'naive-ui'
import to from 'await-to-js'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'Vue-Cropper'
import { provideKey } from './const'

import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import type { RequestFun, FileInfo } from './types'

const attrs = useAttrs()
const message = useMessage()

interface Props {
  requestFunc?: RequestFun
  value: FileInfo[]
  size?: number
  cropper?: boolean | Record<string, any>
  showInfo?: boolean
  uploadText?: string
}
const props = withDefaults(defineProps<Props>(), {
  showInfo: true,
  uploadText: '上传文件'
})

function getProps() {
  return { ...attrs, ...props }
}

function getCropperProps() {
  if (!props.cropper || typeof props.cropper === 'boolean') return {}
  return props.cropper
}

const emits = defineEmits<{
  'update:value': [value: FileInfo[]]
}>()
const fileList = ref<UploadFileInfo[]>([])

const injectRequestFunc = inject<RequestFun | undefined>(provideKey, undefined)
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

const accept = attrs.accept ? (attrs.accept as string).replace(/\s/g, '').toLowerCase() : undefined

function verifyType(file: File) {
  if (!accept) return true
  const ext = file.name.substring(file.name.lastIndexOf('.'))
  if (!accept.includes(ext)) {
    message.error(`“${file.name}”格式不正确`)
    return false
  }
  return true
}

let isChangeFromProps = true
watch(
  () => props.value,
  (val) => {
    if (!isChangeFromProps) return
    fileList.value = val.map((item) => {
      return {
        id: item.id || Math.random().toString(36).substring(2, 9),
        url: item.url,
        name: item.name,
        status: 'finished'
      }
    })
    isChangeFromProps = true
  },
  {
    immediate: true,
    deep: true
  }
)

function handleBeforeUpload({ file }: { file: UploadFileInfo }) {
  if (!file.file) return false
  if (!verifyType(file.file)) return false
  if (!verifySize(file.file)) return false
  if (props.cropper) {
    handleCropperInit(file)
    return false
  }

  return true
}

const cropperRef = ref<any>(null)
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
  nextTick(() => handleFileListChange())
}

function handleCloseCropper() {
  currentCropperFile.value = null
  previewUrl.value = ''
  currentBlob.value = null
  cropperLoading.value = false
}

async function handleCustomRequest({
  file,
  onError,
  onFinish,
  onProgress
}: UploadCustomRequestOptions) {
  if (!uploadApi) {
    onError()
    throw new Error('requestFunc is required')
  }
  const [err, res] = await to(uploadApi(file.file as File, onProgress))
  if (err) {
    onError()
    return
  }
  onFinish()
  nextTick(() => {
    const index = fileList.value.findIndex((item) => item.id === file.id)
    fileList.value[index].url = res
    handleFileListChange()
  })
}

function handleRemove({ file }: { file: UploadFileInfo }) {
  const _fileLIst = fileList.value
    .filter((item) => item.id !== file.id && item.status === 'finished')
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
        url: item.url as string,
        status: 'finished'
      }
    })
  isChangeFromProps = false
  emits('update:value', _fileLIst)
  return true
}

function handleFileListChange() {
  const uploadFileList = fileList.value
    .filter((item) => item.status === 'finished')
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
        url: item.url as string,
        status: 'finished'
      }
    })
  isChangeFromProps = false
  emits('update:value', uploadFileList)
}
</script>

<style scoped></style>
