import type { FormItemRule, FormItemGiProps, FormProps, GridProps } from 'naive-ui'
import { componentMapInfo } from '../const'
import type { CSSProperties, VNode } from 'vue'

export type Recordable<T = any> = Record<string, T>
type CompentType = keyof typeof componentMapInfo | 'dynamic'

export interface FormSchema extends Omit<FormItemGiProps, 'labelProps'> {
  tip?: string | (() => VNode)
  field: string
  type: CompentType
  defaultValue?: any
  componentProps?: Recordable
  required?: boolean
  requiredType?: string
  requiredMessage?: string
  requiredTrigger?: FormItemRule['trigger']
  rules?: FormItemRule | FormItemRule[]
  style?: CSSProperties | string
  vif?: (value: Recordable) => boolean
  slot?: string
  dynamicOptions?: FormSchema[]
  groupName?: string
}

export interface BasicProps {
  schemas?: FormSchema[]
  grid?: GridProps
  showActionBtns?: boolean
  showSubmitBtn?: boolean
  submitBtnText?: string
  showResetBtn?: boolean
  resetBtnText?: string
  showExpandBtn?: boolean
  expandBtnOffText?: string
  expandBtnOnText?: string
  defaultExpand?: boolean
  defaultShowExpandRows?: number
  disabled?: boolean
}

export interface Props extends BasicProps, FormProps {}

export interface FormInstance {
  reset(): void
  submit(): Promise<Recordable>
  validate(nameList?: string[]): Promise<any>
  clearValidate(): void
  getValue(): Recordable
  getFieldValue(field: string): any
  setValue(value: Recordable): void
  setProps(props: Props): void
  setLoading(loading: boolean): void
}

export interface ModalFormInstance {
  getValue(): Recordable
  getFieldValue(field: string): any
  setValue(value: Recordable): void
}
