import { reactive, onMounted, type Ref } from 'vue'
import { PageField, SizeField, ListField, TotalField, DefaultPageSize } from '../const'
import type { TableProps, FormInstance } from '../types'

export function useTable(
  { requestApi, requestAuto, initParams, isPageApi, dataCallback, requestError }: TableProps,
  basicForm: Ref<FormInstance | null>,
  clearCheck: () => void
) {
  const state = reactive({
    tableData: [], // 表格数据
    loading: requestApi && requestAuto ? true : false,
    // 分页数据
    pageAble: {
      current: 1,
      size: DefaultPageSize,
      total: 0
    }
  })

  function resetState() {
    state.tableData = []
    state.loading = false
    state.pageAble = {
      current: 1,
      size: DefaultPageSize,
      total: 0
    }
  }

  /* 初始化表格 */
  onMounted(() => {
    requestAuto && refresh()
  })

  // 获取表格数据
  async function refresh() {
    if (!requestApi) return

    try {
      // 分页参数
      const pageParam = isPageApi
        ? {
          [PageField]: state.pageAble.current,
          [SizeField]: state.pageAble.size
        }
        : {}

      // 查询参数
      let searchParam = {}
      if (basicForm.value) {
        await basicForm.value.validate()
        searchParam = basicForm.value?.getValue()
      }

      state.loading = true

      // 总参数
      const totalParam = { ...initParams, ...pageParam, ...searchParam }
      const filterParam = Object.fromEntries(
        Object.entries(totalParam).filter(([_, v]) => v != null)
      )

      let res = await requestApi(filterParam)
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
    clearCheck()
  }

  function closeLoading() {
    state.loading = false
    basicForm.value?.setLoading(false)
  }

  // 查询
  function handleSearch() {
    state.pageAble.current = 1
    refresh()
  }

  // 重置
  function handleReset() {
    state.pageAble.current = 1
    refresh()
  }

  // 当前页改变
  function onUpdatePage(page: number) {
    state.pageAble.current = page
    refresh()
  }
  // 每条页数改变
  function onUpdatePageSize(pageSize: number) {
    state.pageAble.size = pageSize
    state.pageAble.current = 1
    refresh()
  }

  function getTableValue() {
    return state.tableData
  }
  function getPageValue() {
    return state.pageAble
  }
  function setLoading(load: boolean) {
    state.loading = load
  }

  return {
    state,
    refresh,
    resetState,
    handleSearch,
    handleReset,
    onUpdatePage,
    onUpdatePageSize,
    getTableValue,
    getPageValue,
    setLoading
  }
}
