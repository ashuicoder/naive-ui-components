import type { PropType, ExtractPropTypes } from 'vue';
import type { IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

export interface Props {
  value?: string
  mode?: 'default' | 'simple'
  height?: number
  editorConfig?: Partial<IEditorConfig>
  toolbarConfig?: Partial<IToolbarConfig>
  requestFunc?: RequestFun
}
export type Emits = {
  (e: 'update:value', value: string): void
}

export type Recordable<T = any> = Record<string, T>

export type RequestFun = (
  file: File,
  onProgerss?: (e: { percent: number }) => void
) => Promise<string>
