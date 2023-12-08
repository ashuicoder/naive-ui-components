export type RequestFun = (
  file: File,
  onProgerss?: (e: { percent: number }) => void
) => Promise<string>

export interface Option {
  requestFunc?: RequestFun
}
