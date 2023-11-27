import NaiveUiUpload from './src/NaiveUiUpload.vue'

import type { App } from 'vue'
import type { Option } from './src/types'

export { NaiveUiUpload }
export { generateUploadInfo, getUploadedUrlList } from './src'

export default {
  install(app: App, option?: Option) {
    app.component('NaiveUiUpload', NaiveUiUpload)
    if (option?.requestFunc) {
      app.provide('requestFunc', option.requestFunc)
    }
  }
}
