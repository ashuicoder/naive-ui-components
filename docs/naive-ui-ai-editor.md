# naive-ui-ai-editor文档

## 介绍

`naive-ui-ai-editor`是基于[naive-ui](https://ui.naiveadmin.com/zh-CN/os-theme)、[aieditor](https://aieditor.dev/)封装的富文本组件。

## 安装

```bash
npm i naive-ui-ai-editor
```

## 使用

### 全局导入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import NaiveUiAiEditor from 'naive-ui-ai-editor'
import 'naive-ui-ai-editor/dist/index.css'

const app = createApp(App)
app.use(NaiveUiAiEditor, {
  /* options */
})
```

### 局部导入

```vue
<template>
  <NaiveUiAiEditor v-model:value="value" style="height: 600px"></NaiveUiAiEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NaiveUiAiEditor } from 'naive-ui-ai-editor'
import 'naive-ui-ai-editor/dist/style.css'

const value = ref('')
</script>

<style scoped></style>
```

## props

```ts
interface Props {
  value: string
  placeholder?: string
  hideToolbarKeys?: string[] // 隐藏工具栏的按键
  requestFunc?: RequestFun //上传的方法，需要返回Primise<string>
  link?: AiEditorOptions['link'] // https://aieditor.dev/zh/config/link.html
  fontFamily?: AiEditorOptions['fontFamily'] // https://aieditor.dev/zh/config/fontFamily.html
  fontSize?: AiEditorOptions['fontSize'] // https://aieditor.dev/zh/config/fontSize.html
  ai?: AiEditorOptions['ai'] // https://aieditor.dev/zh/ai/base.html
  onMentionQuery?: AiEditorOptions['onMentionQuery'] // https://aieditor.dev/zh/config/mention.html
}
```

`requestFunc`字段定义类型如下：

```ts
type RequestFun = (file: File) => Promise<string>
```

可以在`全局注册`传入`requestFunc`，也可在`naive-ui-ai-editor`的`props`传入。`props`优先级最高。

```ts
app.use(NaiveUiAiEditor, {
  requestFunc: xxx
})
```

也可以通过`provide`注入：

```ts
import { provideKey } from 'naive-ui-ai-editor'
app.provide(provideKey, function)
```

::: danger 提示

如果没有找到`requestFunc`，`naive-ui-ai-editor`会报错

:::
