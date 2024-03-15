import { reactive, computed } from 'vue'
import type { DataTableRowKey } from 'naive-ui'

export function useCheck(emit: { (event: 'update:checked-row-keys', ...args: any[]): void }) {
  // 勾选状态
  function initCheck() {
    return {
      keys: [],
      rows: []
    }
  }
  const checkState = reactive<{ keys: DataTableRowKey[]; rows: object[] }>(initCheck())

  // 清除勾选
  function clearCheck() {
    Object.assign(checkState, initCheck())
  }

  /* 勾选回调 */
  function handleCheck(
    keys: DataTableRowKey[],
    rows: object[],
    meta: { row: object | undefined; action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll' }
  ) {
    checkState.keys = keys
    checkState.rows = rows
    emit('update:checked-row-keys', keys, rows, meta)
  }

  /* 获取勾选的数据 */
  function getCheckValue() {
    return checkState
  }

  return {
    checkState,
    clearCheck,
    handleCheck,
    getCheckValue
  }
}
