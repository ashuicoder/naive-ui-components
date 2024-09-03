import type { ComputedRef, Ref } from 'vue'
import type { DataTableColumn, DataTableRowKey } from 'naive-ui'
import type { Props as FormProps, FormInstance } from 'naive-ui-form'

export type { FormProps, FormInstance }

export type Recordable<T = any> = Record<string, T>

type CustomColumn<T> = {
  vif?: boolean | (() => boolean) | Ref<boolean>
}
export type TableColumn<T = Recordable> = CustomColumn<T> & DataTableColumn<T>
export type TableColumns<T = Recordable> = TableColumn<T>[]

export type Column<T = Recordable> = TableColumn<T>
export type Columns<T = Recordable> = TableColumns<T>

export interface TableProps {
  columns: TableColumns<any> // 列配置项
  searchProps?: FormProps // 传给BasicForm的属性
  requestApi?: (params: any) => Promise<any> // 请求表格数据的 api
  requestAuto?: boolean // 是否自动执行请求 api（默认为true）
  pagination?: boolean | object // 表格分页配置
  isPageApi?: boolean // 接口是否为分页接口 （默认为true）
  size?: 'small' | 'medium' | 'large' // 表格尺寸
  remote?: boolean // 是否异步
  maxHeight?: number | string // 表格最大高度
  scrollX?: number | string // 表格横向宽度
  resizeHeightOffset?: number // 表格底下留白距离 （默认为0）
  toolButton?: ('refresh' | 'size' | 'setting')[] | boolean // 是否显示表格功能按钮
  initParams?: Recordable // 初始化请求参数 ==> 非必传（默认为{}）
  dataCallback?: (data: Recordable) => Recordable // 返回数据的回调函数，可以对数据进行处理
  requestError?: (params: any) => void // 表格 api 请求错误监听
  showOrderColumn?: boolean // 是否显示序号列
}

export interface TableInstance {
  basicForm: FormInstance | null
  tableRef: any
  tableColumns: ComputedRef<any[]>
  refresh(): Promise<any>
  resetState(): void
  openDrawer(bool: boolean): void
  height: ComputedRef<number>
  scrollWidth: ComputedRef<number>
  clearCheck(): void
  getCheckValue(): { keys: DataTableRowKey[]; rows: object[] }
  getTableValue(): any
  getPageValue(): any
  setLoading(loading: boolean): void
  reset: FormInstance['reset']
  getValue: FormInstance['getValue']
  setValue: FormInstance['setValue']
  getFieldValue: FormInstance['getFieldValue']
}
