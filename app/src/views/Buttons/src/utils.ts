/*
 * @Author: autumnLeaves-lady
 * @Date: 2025-01-17 09:52:24
 * @LastEditors: autumnLeaves-lady
 * @LastEditTime: 2025-01-17 10:30:46
 * @Description: 该组件引入项目后，替换掉真正的权限判断hooks和图标渲染函数后，将该文件删除
 */

import { NIcon } from 'naive-ui'
import { type Component, h } from 'vue'

export function useAuth() {
  function hasAuth(codes: string | string[]) {
    return true
  }

  return {
    hasAuth
  };
}

export function useSvgIcon() {
  function SvgIconVNode({ icon }: { icon: Component }): any {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }

  return {
    SvgIconVNode
  }
}
