import { createApp } from 'vue'
import { createPinia } from 'pinia'

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
    return data.url
  }
})

app.use(createPinia())
app.use(router)

app.mount('#app')
