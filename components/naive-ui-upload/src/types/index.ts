import type { UploadFileInfo } from 'naive-ui'

export type RequestFun = (file: File) => Promise<any>
export interface Props {
  requestFunc?: RequestFun
  value: UploadFileInfo[]
  max?: number
  multiple?: boolean
  accept?: string
  size?: number
  cropper?: boolean | Record<string, any>
  fileType?: 'image' | 'file'
}

export interface Emits {
  (e: 'update:value', value: UploadFileInfo[]): void
}

export interface Option {
  requestFunc?: RequestFun
}
