import type { App } from 'vue'
import BasicForm from './src/BasicForm.vue'
import ModalForm from './src/ModalForm.vue'
export { useForm } from './src/hooks/useForm'

export { BasicForm, ModalForm }

import type { FormSchema, Recordable, FormInstance, Option } from './src/types'

export type { FormSchema, Recordable, FormInstance, Option }

export default {
  install(app: App, option?: Option) {
    app.component('BasicForm', BasicForm)
    app.component('ModalForm', ModalForm)
    if (option?.upload?.requestFunc) {
      app.provide('requestFunc', option.upload.requestFunc)
    }
  }
}
