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
