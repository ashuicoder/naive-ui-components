import type { UploadProps } from 'naive-ui'
export interface Props extends /* @vue-ignore */ UploadProps {
  requestFunc?: (file: File) => Promise<any>
}
