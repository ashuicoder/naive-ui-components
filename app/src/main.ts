import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NaiveuiEditor from 'naive-ui-editor'
import NaiveUiUpload from 'naive-ui-upload'

import App from './App.vue'
import router from './router'
import to from 'await-to-js'

const app = createApp(App)

app.use(NaiveUiUpload, {
  async requestFunc(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const [err, res] = await to(
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      })
    )
    if (err) {
      throw err
    }
    const data = await res.json()
    return data
  },
  params: ['filename']
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
