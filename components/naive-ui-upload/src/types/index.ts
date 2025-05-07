interface Res {
  url: string
  [key: string]: any
}

export type RequestFun = (file: File, onProgerss?: (e: { percent: number }) => void) => Promise<Res>

export interface Option {
  requestFunc?: RequestFun
  params?: string[]
}

export interface FileInfo {
  name: string
  url: string
  status?: string
  id: string
  [key: string]: any
}
