import type { DataTableColumns } from 'naive-ui'
import { type FormSchema } from 'naive-ui-form'

export type Recordable<T = any> = Record<string, T>

export interface Props {
  columns: DataTableColumns<Recordable> // 列配置项  ==> 必传
  search?: { schemas: FormSchema[] } // 列配置项
  requestApi?: (params: any) => Promise<any> // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean // 是否自动执行请求 api ==> 非必传（默认为true）
  pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
  maxHeight?: number | string // 表格最大高度 ==> 非必传
  scrollX?: number // 表格横向宽度
  resizeHeightOffset?: number // 表格底下留白距离 ==> 非必传（默认为0）
  toolButton?: ('refresh' | 'size' | 'setting')[] | boolean // 是否显示表格功能按钮 ==> 非必传
  initParam?: Recordable // 初始化请求参数 ==> 非必传（默认为{}）
  dataCallback?: (data: Recordable) => Recordable // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  requestError?: (params: any) => void // 表格 api 请求错误监听 ==> 非必传
}
