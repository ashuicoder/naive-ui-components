import type { Ref } from 'vue'
import type { IEditorConfig, IToolbarConfig, IDomEditor } from '@wangeditor/editor'
import type { FormProps } from 'naive-ui'

export interface Props {
  value?: string | null
  mode?: 'default' | 'simple'
  height?: number
  disabled?: boolean
  editorConfig?: Partial<IEditorConfig>
  toolbarConfig?: Partial<IToolbarConfig>
  requestFunc?: RequestFun
}

export type Emits = {
  (e: 'update:value', value: string): void
}

export interface InjectForm {
  props: FormProps
} 

export type RequestFun = (
  file: File,
  onProgerss?: (e: { percent: number }) => void
) => Promise<string>

export type InsertFnType = (url: string, poster?: string) => void

export type UseFile = (e: UseFileProps) => {
  getElementLen: (editor: IDomEditor) => number
  formatConfig: (editorConfig: Partial<IEditorConfig> | undefined) => Partial<IEditorConfig>
  customPaste: (editor: IDomEditor, event: ClipboardEvent) => Promise<boolean | void>
}
export interface UseFileProps {
  loading: Ref<boolean>
  requestFunc: RequestFun
}

export interface HexSource extends File {
  hex: string
}
