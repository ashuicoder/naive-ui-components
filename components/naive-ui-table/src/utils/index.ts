import { isRef, type Slots } from 'vue'
import type { TableColumns, Column } from '../types'

/**
 * @description:  是否为函数
 */
export function isFunction(x: unknown): x is Function {
  return typeof x === 'function'
}

// 防抖
export function debounce(fn: Function, delay: number) {
  let timer: any = null
  return function (...args: any[]) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

function copyColumns(columns: Column[]) {
  const data: Column[] = []
  columns?.forEach((column: Column) => {
    data.push({ ...column })
  })
  return data
}

function checkIfShow(action: Column): boolean {
  if (isRef(action.vif)) return action.vif.value
  if (typeof action.vif === 'boolean') return action.vif
  if (typeof action.vif === 'function') return action.vif()
  return true
}

function generateColumn(item: any, slot: Slots) {
  item._show = true
  if (item.ellipsis === undefined) {
    item.ellipsis = { tooltip: true }
  }
  if (item.type === 'selection' && !item.title) {
    item.title = '勾选'
  }
  if (Array.isArray(item.children)) {
    item.children = createInitColumns(item.children, slot)
  }
  if (item.render) return item
  if (slot[item.key] && isFunction(slot[item.key])) {
    item.render = (row: object, index: number) => slot[item.key]!({ row, index })
  }
  return item
}

/* 初始化列 */
export function createInitColumns(columns: TableColumns<any>, slot: Slots) {
  return (
    copyColumns(columns)
      .filter(checkIfShow)
      .map((item: any) => generateColumn(item, slot)) || []
  )
}
