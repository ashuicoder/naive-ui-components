import type { PropType } from 'vue'
import type { GridProps } from 'naive-ui'
import type { FormSchema } from '../types'

export const props = {
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  grid: {
    type: Object as PropType<GridProps>,
    default: () => ({
      cols: 1,
      xGap: 14
    })
  },
  showActionBtns: {
    type: Boolean,
    default: true
  },
  showSubmitBtn: {
    type: Boolean,
    default: true
  },
  submitBtnText: {
    type: String,
    default: '提交'
  },
  showResetBtn: {
    type: Boolean,
    default: true
  },
  resetBtnText: {
    type: String,
    default: '重置'
  },

  showExpandBtn: {
    type: Boolean,
    default: true
  },

  expandBtnOffText: {
    type: String,
    default: '展开'
  },
  expandBtnOnText: {
    type: String,
    default: '收起'
  },

  defaultExpand: {
    type: Boolean,
    default: false
  },
  defaultShowExpandRows: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  }
}
