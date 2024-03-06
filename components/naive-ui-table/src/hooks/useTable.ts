import { reactive, type Ref } from 'vue'
import { PageField, SizeField, ListField, TotalField, DefaultPageSize } from '../const'
import type { TableProps, FormInstance } from '../types'

export function useTable(
  api: TableProps['requestApi'],
  requestAuto: TableProps['requestAuto'],
  initParams: TableProps['initParams'],
  isPageApi: TableProps['isPageApi'],
  dataCallback: TableProps['dataCallback'],
  requestError: TableProps['requestError'],
  basicForm: Ref<FormInstance | null>
) {
  const state = reactive({
    tableData: [], // 表格数据
    loading: api && requestAuto ? true : false,
    // 分页数据
    pageAble: {
      current: 1,
      size: DefaultPageSize,
      total: 0
    }
  })

  // 获取表格数据
  async function getTableList() {
    if (!api) return
    state.loading = true
    try {
      // 分页参数
      const pageParam = isPageApi
        ? {
            [PageField]: state.pageAble.current,
            [SizeField]: state.pageAble.size
          }
        : {}

      // 查询参数
      const searchParam = basicForm.value?.getValue() || {}

      // 总参数
      const totalParam = { ...initParams, ...pageParam, ...searchParam }
      const filterParam = Object.fromEntries(
        Object.entries(totalParam).filter(([_, v]) => v != null)
      )
      let res = await api(filterParam)
      dataCallback && (res = dataCallback(res))
      state.tableData = isPageApi ? res[ListField] : res
      if (isPageApi) {
        Object.assign(state.pageAble, {
          current: res[PageField],
          size: res[SizeField],
          total: res[TotalField]
        })
      }
    } catch (err: any) {
      closeLoading()
      if (requestError) return requestError(err)
      else throw new Error(err || '请求失败！')
    }
    closeLoading()
  }

  function closeLoading() {
    state.loading = false
    basicForm.value?.setLoading(false)
  }

  // 查询
  function handleSearch() {
    state.pageAble.current = 1
    getTableList()
  }

  // 重置
  function handleReset() {
    state.pageAble.current = 1
    getTableList()
  }

  // 当前页改变
  function onUpdatePage(page: number) {
    state.pageAble.current = page
    getTableList()
  }
  // 每条页数改变
  function onUpdatePageSize(pageSize: number) {
    state.pageAble.size = pageSize
    state.pageAble.current = 1
    getTableList()
  }

  return { state, getTableList, handleSearch, handleReset, onUpdatePage, onUpdatePageSize }
}
