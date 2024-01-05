import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NaiveuiEditor from 'naive-ui-editor'
import NaiveUiAiEditor from 'naive-ui-ai-editor'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(NaiveuiEditor, {
  requestFunc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://picsum.photos/200/300')
      }, 1000)
    })
  }
})

app.use(NaiveUiAiEditor, {
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
