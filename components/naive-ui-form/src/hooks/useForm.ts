import type { FormInstance, Recordable, Props } from '../types'
export function useForm(props?: Props): [(formIns: FormInstance) => void, FormInstance] {
  let formInstance: FormInstance | null = null
  const register = async (formIns: FormInstance) => {
    formInstance = formIns
    if (!props) return
    formInstance?.setProps(props)
  }

  function handleNoInit() {
    if (!formInstance) {
      throw new Error('Form instance is not initialized, please use after initialized.')
    }
  }

  const methods: FormInstance = {
    getValue() {
      handleNoInit()
      return formInstance!.getValue() || {}
    },
    getFieldValue(field: string) {
      handleNoInit()
      return formInstance!.getFieldValue(field)
    },
    setValue(value: Recordable) {
      handleNoInit()
      formInstance!.setValue(value)
    },
    validate() {
      handleNoInit()
      return new Promise((resolve, reject) => {
        formInstance
          ?.validate()
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      })
    },
    clearValidate() {
      handleNoInit()
      formInstance?.clearValidate()
    },
    submit() {
      handleNoInit()
      return formInstance!.submit()
    },
    reset() {
      handleNoInit()
      formInstance?.reset()
    },
    setProps(props: Props) {
      handleNoInit()
      formInstance?.setProps(props)
    },
    setLoading(loading: boolean) {
      formInstance?.setLoading(loading)
    }
  }

  return [register, methods]
}
