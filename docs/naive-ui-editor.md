<script setup lang="ts">
  import NaiveUiEditor from './components/NaiveUiEditor.vue'
</script>

# naive-ui-editor文档

## 介绍
`naive-ui-editor`是基于`wangEditor 5`封装的一个富文本组件，另有用到`naive-ui`的`n-spin`

`wangEditor 5`开源 Web 富文本编辑器，开箱即用，配置简单。支持 JS Vue React 。
- [wangEditor 5文档](https://www.wangeditor.com/)
- [wangEditor 5示例](https://www.wangeditor.com/demo/)

## 安装
```bash
pnpm add naive-ui-editor

```
也可以使用`npm`、`yarn`等安装。

## 使用

### 局部导入

<NaiveUiEditor></NaiveUiEditor>

```vue{4-8,15}
<template>
  <NaiveUiEditor
    v-model:value="content"
    :requestFunc="handleUpload"
  ></NaiveUiUpload>
</template>

<script setup lang="ts">
import { NaiveUiEditor } from 'naive-ui-editor'
import { ref } from 'vue'

const content = ref<string>('')
function handleUpload() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://picsum.photos/200/300')
    }, 1000)
  })
}
</script>

<style scoped></style>


```

### 全局导入

```ts
import { createApp } from 'vue'
import NaiveUiEditor from 'naive-ui-editor'

const app = createApp(App)
app.use(NaiveUiEditor, {
  requestFunc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('https://picsum.photos/200/300')
      }, 1000)
    })
  }
})
```

## props

| 字段          | 类型                        | 描述                             | 必传 | 默认值 |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---- | ------ |
| mode          | string                | 富文本模式                                   | 否   |    default    |
| height        | number                                              | 富文本高度                                   | 否   |    500    |
| requestFunc   | Function，见下方说明                                 | 上传文件的函数                                           | 否   | -      |
| v-model:value | string                                             | 富文本内容，需要双向绑定                                   | 是   |        |
| toolbarConfig  | Object，见下方说明 | 菜单栏配置 | 否   |        |
| editorConfig   | Object，同上              | 富文本配置 | 否   | 见下方 |

`requestFunc`字段定义类型如下：

```ts
type RequestFun = (
  file: File
) => Promise<string>
```

`toolbarConfig`和`editorConfig`字段定义类型如下：<br/>
具体见[wangEditor](https://github.com/wangeditor-team/wangEditor/blob/master/packages/core/src/config/interface.ts

`editorConfig`字段默认值如下：
```ts
editorConfig: {
  placeholder: '请输入内容...',
  MENU_CONF: {},
}
```

可以在`全局注册`传入`requestFunc`，也可在`naive-ui-editor`的`props`传入。`props`优先级最高。

也可以通过`provide`注入：

```ts
app.provide('requestFunc', function)
```

::: danger 提示

如果没有找到`requestFunc`，`naive-ui-editor`会报错

:::
