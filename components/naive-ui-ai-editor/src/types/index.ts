export type RequestFun = (file: File) => Promise<string>

export interface Option {
  requestFunc?: RequestFun
}
