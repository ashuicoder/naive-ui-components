import { ref, shallowRef, inject, computed, onBeforeUnmount } from 'vue'
import { useFile } from './useFile'
import { provideKey, formKey } from '../const'

import type { Props, Emits, RequestFun, InjectForm } from '../types'

export const useEditor = ({ props, emits }: { props: Props; emits: Emits }) => {
  const loading = ref(false)
  const editorRef = shallowRef()

  const injectRequestFunc = inject<RequestFun | undefined>(provideKey, undefined)
  const injectForm = inject<InjectForm | undefined>(formKey, undefined)
  const requestFunc = props.requestFunc ?? injectRequestFunc
  const isDisabled = props.disabled || injectForm?.props?.disabled

  if (!requestFunc) {
    throw new Error('requestFunc is required')
  }

  const { getElementLen, formatConfig, customPaste } = useFile({ loading, requestFunc })

  const style = computed(() => ({ height: props.height + 'px', overflowY: 'hidden' }))
  const customConfig = computed(() => formatConfig(props.editorConfig))

  // 编辑器回调函数
  const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例
    toggleDisable(isDisabled)
  }

  // 启用禁用
  const toggleDisable = (disabled?: boolean) => {
    disabled ? editorRef.value?.disable() : editorRef.value?.enable() // 禁用启用
  }

  // 编辑器change
  const handleChange = (editor) => {
    const isEmpty =
      editor.isEmpty() ||
      (!editor
        .getText()
        .replace(/[\r\n]/g, '')
        .replace(/&nbsp;/gi, '')
        .trim() &&
        !getElementLen(editor))
    emits('update:value', isEmpty ? null : editor.getHtml())
  }

  // 组件销毁时，及时销毁编辑器
  onBeforeUnmount(() => {
    editorRef.value?.destroy()
  })

  return {
    loading,
    editorRef,
    style,
    customConfig,
    customPaste,
    handleCreated,
    handleChange
  }
}
