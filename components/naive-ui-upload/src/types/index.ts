import type { UploadFileInfo } from 'naive-ui'

export type RequestFun = (
  file: File,
  onProgerss?: (e: { percent: number }) => void
) => Promise<string>

export interface Props {
  requestFunc?: RequestFun
  value: UploadFileInfo[]
  size?: number
  cropper?: boolean | Record<string, any>
}

export interface Emits {
  (e: 'update:value', value: UploadFileInfo[]): void
}

export interface Option {
  requestFunc?: RequestFun
}
