import type { App } from 'vue'
import BasicForm from './src/BasicForm.vue'
import ModalForm from './src/ModalForm.vue'
export { useForm } from './src/hooks/useForm'

export { BasicForm, ModalForm }

import type { FormSchema, Recordable, FormInstance } from './src/types'

export type { FormSchema, Recordable, FormInstance }

export default {
  install(app: App) {
    app.component('BasicForm', BasicForm)
    app.component('ModalForm', ModalForm)
  }
}
