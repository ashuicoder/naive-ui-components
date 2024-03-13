# naive-ui-upload文档

## 介绍

`naive-ui-upload`是基于`naive-ui`的`n-upload`封装的一个文件上传组件。支持**图片裁剪**功能。

## 安装

```bash
pnpm add naive-ui-upload

```

也可以使用`npm`、`yarn`等安装。

## 使用

### 局部导入

```vue{4-8,15}
<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <NaiveUiUpload
        v-model:value="fileList"
        list-type="image-card"
        :requestFunc="handleUpload"
      ></NaiveUiUpload>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN, NMessageProvider } from 'naive-ui'
import { NaiveUiUpload } from 'naive-ui-upload'
import { ref } from 'vue'

const fileList = ref<string[]>([])
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
import NaiveUiUpload from 'naive-ui-upload'

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
```

## props

| 字段          | 类型                                                         | 描述                                                     | 必传 | 默认值   |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---- | -------- |
| requestFunc   | Function，见下发说明                                         | 上传文件的方法                                           | 否   | -        |
| v-model:value | string[]                                                     | 文件列表，需要双向绑定                                   | 是   |          |
| size          | number                                                       | 单个文件上传的限制大小（单位：M）                        | 否   |          |
| cropper       | Objec，具体参数见[vue-cropper](https://github.com/xyxiao001/vue-cropper) | 是否需要裁剪（**设置该值时确保上传的是图片格式的文件**） | 否   |          |
| showInfo      | boolean                                                      | 是否显示提示信息                                         | 否   | 是       |
| uploadText    | string                                                       | 默认插槽按钮文字                                         | 否   | 上传文件 |

此外，还可以传入[n-upload](https://ui.naiveadmin.com/zh-CN/os-theme/components/upload)的大部分`props`。

`requestFunc`字段定义类型如下：

```ts
type RequestFun = (file: File, onProgerss?: (e: { percent: number }) => void) => Promise<string>
```

可以在`全局注册`传入`requestFunc`，也可在`naive-ui-upload`的`props`传入。`props`优先级最高。

```ts
app.use(NaiveUiUpload, {
  requestFunc: xxx
})
```

也可以通过`provide`注入：

```ts
import { provideKey } from 'naive-ui-upload'
app.provide(provideKey, function)
```

::: danger 提示

如果没有找到`requestFunc`，`naive-ui-upload`会报错

:::
