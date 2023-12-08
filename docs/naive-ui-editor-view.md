

# naive-ui-editor-view文档

## 介绍
`naive-ui-editor-view`是基于`vue-dompurify-html`封装的一个富文本内容渲染组件

## 安装
```bash
pnpm add naive-ui-editor-view vue-dompurify-html
```
也可以使用`npm`、`yarn`等安装。

## 使用

### 局部导入

```vue{4-8,15}
<template>
  <NaiveUiEditorView :value="content"></NaiveUiEditorView>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NaiveUiEditorView } from 'naive-ui-editor-view'

const content = ref<string | null>('<h2 style="text-align: center;">富文本示例</h2><p> &nbsp; &nbsp; &nbsp; 这是富文本示例，这是富文本示例示例😁😀</p><p> &nbsp; &nbsp; &nbsp; 这是富文本示例，这是富文本示例示例😁😀</p><p> &nbsp; &nbsp; &nbsp;<img src="https://picsum.photos/200/300" alt="" data-href="" style=""/></p><p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容，内容内容，内容内容，内容内容，内容内容内容内容内容内容内容内容内容内容。内容内容内容内容内容内容。</p>')
</script>
```

### 全局导入

```ts
import { createApp } from 'vue'
import NaiveUiEditorView from 'naive-ui-editor-view'

const app = createApp(App)
app.use(NaiveUiEditorView)
```

## props

| 字段          | 类型                        | 描述                             | 必传 | 默认值 |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---- | ------ |
| value | string null                                             | 富文本内容                                   | 是   |        |
