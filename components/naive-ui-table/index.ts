import type { App } from 'vue'
import NaiveUiTable from './src/NaiveUiTable.vue'
export * from './src/types'

export { NaiveUiTable }

export default {
  install(app: App) {
    app.component('NaiveUiTable', NaiveUiTable)
  }
}
