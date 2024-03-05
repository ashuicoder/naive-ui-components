import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NaiveuiEditor from 'naive-ui-editor'
import NaiveuiAiEditor from 'naive-ui-ai-editor'
import NaiveUiUpload from 'naive-ui-upload'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(NaiveUiUpload, {
  requestFunc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://picsum.photos/200/300')
      }, 1000)
    })
  }
})

app.use(NaiveuiAiEditor, {
  requestFunc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://picsum.photos/200/300')
      }, 1000)
    })
  }
})

app.use(NaiveuiEditor, {
  requestFunc() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('https://picsum.photos/200/300')
      }, 1000)
    })
  }
})

app.use(createPinia())
app.use(router)

app.mount('#app')
