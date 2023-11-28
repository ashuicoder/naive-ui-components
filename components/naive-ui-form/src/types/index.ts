import type { FormItemRule, NIcon, FormItemGiProps, FormProps, GridProps } from 'naive-ui'
import { componentMapInfo } from '../const'
import type { CSSProperties, VNode } from 'vue'

export type Recordable<T = any> = Record<string, T>
type CompentType = keyof typeof componentMapInfo | 'dynamic'
type FormItemProps = 'feedback' | 'first' | 'igno'

export interface FormSchema extends Omit<FormItemGiProps, 'labelProps'> {
  tip?: string | (() => VNode)
  tipIconProps?: InstanceType<typeof NIcon>['$props']
  field: string
  type: CompentType
  defaultValue?: any
  componentProps?: Recordable
  required?: boolean
  requiredType?: string
  requiredMessage?: string
  requiredTrigger?: FormItemRule['trigger']
  rules?: FormItemRule | FormItemRule[]
  style?: CSSProperties
  vif?: (value: Recordable) => boolean
  render?: (formValue: Recordable, filed: string) => VNode
  slot?: string
  dynamicOptions?: FormSchema[]
}

export interface Props extends FormProps {
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
  defaultShowExpandColumn?: number
}

export interface FormInstance {
  reset(): void
  submit(): Promise<any>
  validate(nameList?: string[]): Promise<any>
  clearValidate(): void
  getValue(): Recordable
  getFieldValue(field: string): any
  setValue(value: Recordable): void
  setProps(props: Props): void
  setLoading(loading: boolean): void
}
