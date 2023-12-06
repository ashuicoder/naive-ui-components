<script lang="ts" setup>
import { NSpin } from 'naive-ui'

import '@wangeditor/editor/dist/css/style.css'
import './styles/index.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import { useEditor } from './hooks'
import type { Props, Emits } from './types'

const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
  height: 500,
})

const emits = defineEmits<Emits>()

const {
  loading,
  editorRef,
  style,
  customConfig,
  customPaste,
  handleCreated,
  handleChange
} = useEditor({ props, emits })
</script>

<template>
  <n-spin :show="loading">
    <Toolbar
      :editor="editorRef"
      :mode="mode"
      :defaultConfig="toolbarConfig"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      class="editor-content-view"
      :defaultConfig="customConfig"
      :mode="mode"
      :modelValue="value"
      :style="style"
      @customPaste="customPaste"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </n-spin>
</template>
