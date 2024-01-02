import type { UploadFileInfo } from 'naive-ui'
export function generateUploadInfo(url: string): UploadFileInfo {
  return {
    id: window.crypto?.randomUUID() || Math.random().toString(36).substring(2, 9),
    url,
    name: 'file',
    status: 'finished'
  }
}

export function generateUploadInfoList(list: string[]): UploadFileInfo[] {
  return list.map((url) => generateUploadInfo(url))
}

export function getUploadedUrlList(list: UploadFileInfo[]) {
  return list.filter((item) => item.status === 'finished').map((item) => item.url)
}
