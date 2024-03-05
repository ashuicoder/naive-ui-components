import NaiveUiAiEditor from './src/NaiveUiAiEditor.vue'

import type { App } from 'vue'
import type { Option, RequestFun } from './src/types/index'

export type { RequestFun }
export { NaiveUiAiEditor }

import { provideKey } from './src/const'

export { provideKey }

export default {
  install(app: App, option?: Option) {
    app.component('NaiveUiAiEditor', NaiveUiAiEditor)
    if (option?.requestFunc) {
      app.provide(provideKey, option.requestFunc)
    }
  }
}
