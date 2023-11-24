import NaiveUiUpload from './src/NaiveUiUpload.vue'
import UploadImage from './src/UploadImage.vue'
import type { App } from 'vue'
import type { Option } from './src/types'

export { NaiveUiUpload, UploadImage }
export { generateUploadInfo, getUploadedUrlList } from './src/utils'

export default {
  install(app: App, option?: Option) {
    app.component('NaiveUiUpload', NaiveUiUpload)
    app.component('UploadImage', UploadImage)
    if (option?.requestFunc) {
      app.provide('requestFunc', option.requestFunc)
    }
  }
}
