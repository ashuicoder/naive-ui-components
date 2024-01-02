<template>
  <div ref="editorRef">
    <div class="aie-container" style="height: 100%; display: flex; flex-direction: column">
      <div class="aie-container-header"></div>
      <div
        class="aie-container-main"
        style="flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column"
      ></div>
      <div class="aie-container-footer" style="display: none"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, onUnmounted } from 'vue'
import { AiEditor, type AiEditorOptions } from 'aieditor'
import 'aieditor/dist/style.css'
import { useMessage, useOsTheme } from 'naive-ui'

import { provideKey } from './const'
import type { RequestFun } from './types'

const injectRequestFunc = inject<RequestFun | undefined>(provideKey, undefined)

const tookbarKeys = [
  'undo',
  'redo',
  'brush',
  'eraser',
  '|',
  'heading',
  'font-family',
  'font-size',
  '|',
  'bold',
  'italic',
  'underline',
  'strike',
  'link',
  'code',
  'subscript',
  'superscript',
  'hr',
  'todo',
  'emoji',
  '|',
  'highlight',
  'font-color',
  '|',
  'align',
  'line-height',
  '|',
  'bullet-list',
  'ordered-list',
  'indent-decrease',
  'indent-increase',
  'break',
  '|',
  'image',
  'video',
  'attachment',
  'quote',
  'code-block',
  'table',
  '|',
  'printer',
  'fullscreen',
  'ai'
]

interface Props {
  value: string
  placeholder?: string
  hideToolbarKeys?: string[]
  requestFunc?: RequestFun
  theme?: AiEditorOptions['theme']
  link?: AiEditorOptions['link']
  fontFamily?: AiEditorOptions['fontFamily']
  fontSize?: AiEditorOptions['fontSize']
  ai?: AiEditorOptions['ai']
}

interface Emits {
  (e: 'update:value', val: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入内容'
})
const emits = defineEmits<Emits>()

const uploadApi = props.requestFunc ?? injectRequestFunc

if (!uploadApi) {
  throw new Error('requestFunc is required')
}

const editorRef = ref<Element | null>(null)
let aiEditor: AiEditor | null = null
onMounted(() => {
  initAiEdior()
})

onUnmounted(() => {
  aiEditor?.destroy()
})

const message = useMessage()
function initAiEdior() {
  const theme = useOsTheme()
  const aieditorConfig: AiEditorOptions = {
    theme: theme.value === 'dark' ? 'dark' : 'light',
    element: editorRef.value as Element,
    placeholder: props.placeholder,
    content: props.value || '',
    toolbarKeys: getToolbarKeys(),
    onChange(_aiEditor) {
      emits('update:value', _aiEditor.getHtml())
    },
    image: {
      allowBase64: true,
      uploader: uploadApi as any,
      uploaderEvent: {
        onUploadBefore: (file, uploadUrl, headers) => {
          return false
        },
        onSuccess: (file, response) => {
          return {
            errorCode: 0,
            data: {
              src: response,
              alt: file.name
            }
          }
        },
        onFailed: () => {
          message.error('上传失败')
        },
        onError: () => {
          message.error('上传失败')
        }
      }
    },

    video: {
      uploader: uploadApi as any,
      uploaderEvent: {
        onUploadBefore: (file, uploadUrl, headers) => {
          return false
        },
        onSuccess: (file, response) => {
          return {
            errorCode: 0,
            data: {
              src: response
            }
          }
        },
        onFailed: () => {
          message.error('上传失败')
        },
        onError: () => {
          message.error('上传失败')
        }
      }
    },
    attachment: {
      uploader: uploadApi as any,
      uploaderEvent: {
        onUploadBefore: (file, uploadUrl, headers) => {
          return false
        },
        onSuccess: (file, response) => {
          return {
            errorCode: 0,
            data: {
              href: response,
              fileName: file.name
            }
          }
        },
        onFailed: () => {
          message.error('上传失败')
        },
        onError: () => {
          message.error('上传失败')
        }
      }
    }
  }

  if (props.link) {
    aieditorConfig.link = props.link
  }
  if (props.fontFamily) {
    aieditorConfig.fontFamily = props.fontFamily
  }
  if (props.fontSize) {
    aieditorConfig.fontSize = props.fontSize
  }
  if (props.ai) {
    aieditorConfig.ai = props.ai
  }

  aiEditor = new AiEditor(aieditorConfig)
}

function getToolbarKeys() {
  if (!Array.isArray(props.hideToolbarKeys)) return tookbarKeys
  return tookbarKeys.filter((key) => !props.hideToolbarKeys?.includes(key))
}
</script>

<style scoped></style>
