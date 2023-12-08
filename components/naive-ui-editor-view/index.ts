import NaiveUiEditorView from './src/NaiveUiEditorView.vue'

import type { App } from 'vue'
import type { Props } from './src/types/index'

export type { Props }
export { NaiveUiEditorView }

export default {
  install(app: App) {
    app.component('NaiveUiEditorView', NaiveUiEditorView)
  }
}
