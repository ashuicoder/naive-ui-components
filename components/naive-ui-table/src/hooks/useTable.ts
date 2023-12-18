import { reactive } from 'vue'
import { PageField, SizeField, ListField, TotalField, DefaultPageSize } from '../const'
import type { Props } from '../types'

export function useTable(
  api?: Props['requestApi'],
  initParams?: Props['initParams'],
  isPage?: Props['pagination'],
  dataCallBack?: Props['dataCallback'],
  requestError?: Props['requestError'],
  search?: Props['search'],
  setLoading?: (load: boolean) => void
) {
  const state = reactive({
    tableData: [], // 表格数据
    loading: true,
    // 分页数据
    pageAble: {
      current: 1,
      size: DefaultPageSize,
      total: 0
    },
    searchParam: {} // 查询参数（只包括查询）
  })

  init()
  async function init() {
    state.searchParam = {}
    if (search?.schemas?.length) {
      search.schemas.forEach((item) => {
        state.searchParam[item.field] = item.defaultValue
      })
    }
  }

  // 获取表格数据
  async function getTableList() {
    if (!api) return
    state.loading = true
    try {
      // 分页参数
      const pageParam = isPage
        ? {
            [PageField]: state.pageAble.current,
            [SizeField]: state.pageAble.size
          }
        : {}

      // 总参数
      const totalParam = { ...initParams, ...pageParam, ...state.searchParam }
      let res = await api(totalParam)
      dataCallBack && (res = dataCallBack(res))
      state.tableData = isPage ? res[ListField] : res
      if (isPage) {
        Object.assign(state.pageAble, {
          current: res[PageField],
          size: res[SizeField],
          total: res[TotalField]
        })
      }
    } catch (err) {
      requestError && requestError(err)
    }
    state.loading = false
    setLoading && setLoading(false)
  }

  // 查询
  function handleSearch(param) {
    state.searchParam = param
    state.pageAble.current = 1
    getTableList()
  }

  // 重置
  function handleReset(param) {
    state.pageAble.current = 1
    init()
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
    getTableList()
  }

  return { state, getTableList, handleSearch, handleReset, onUpdatePage, onUpdatePageSize }
}
