import type { App } from 'vue'
import BasicForm from './src/BasicForm.vue'
import ModalForm from './src/ModalForm.vue'
export { useForm } from './src/hooks/useForm'

export { BasicForm, ModalForm }

export type * from './src/types'

export default {
  install(app: App) {
    app.component('BasicForm', BasicForm)
    app.component('ModalForm', ModalForm)
  }
}
