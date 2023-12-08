# naive-ui-table文档

## 介绍

naive-ui-table是基于naive-ui的表格组件，主要用于展示大量结构化的数据，配置简单，功能齐全，且支持naive-ui所有属性。

功能如下：

- 表格列`columns`配置与`naive-ui`完全一致，且自定义列增加了插槽配置
- 自带分页，只需要传入异步请求接口api，即可实现分页查询功能
- 自带搜索，只需要传入`search`配置，即可实现搜索功能
- 自带列设置，可设置列显隐，列固定，拖拽排序列顺序
- 表格高度自适应，避免数据过多时页面出现滚动条

::: info 提示

`naive-ui-table`支持`naive-ui`的所有属性，因此可在`naive-ui-table`传递`naive-ui`属性，将其传递到`naive-ui`组件上，覆盖内部封装的属性。

:::

## 安装、使用

### 安装

```bash
pnpm add naive-ui-table
```

> 也可以使用`npm`、`yarn`等安装。

### 局部导入

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList"></NaiveUiTable>
</template>

<script setup lang="ts">
import { NaiveUiTable } from 'naive-ui-table'

const columns = [
  { type: 'selection', multiple: true },
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' }
  // ...
]

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

### 全局导入

```ts
import { createApp } from 'vue'
import NaiveUiTable from 'naive-ui-table'

const app = createApp(App)
app.use(NaiveUiTable)
```

## 基础用法

只需传入两个参数`columns`和`requestApi`，即可实现异步请求数据展示表格。

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList"></NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable } from 'naive-ui-table'
import type { DataTableColumns } from 'naive-ui'

const columns: DataTableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' }
]

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

::: danger 注意
该`columns`配置与`naive-ui`的`columns`完全一致。因此按照`naive-ui`的`columns`来配置就好。
:::

## 表格左上角-自定义按钮

- `tableHeader`插槽，可以自定义表格左上角按钮。

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList">
    <template #tableHeader>
      <n-button type="primary">新增</n-button>
      <n-button>导出</n-button>
    </template>
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable } from 'naive-ui-table'
import type { DataTableColumns } from 'naive-ui'

const columns: DataTableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' }
]

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

## 表格右上角-工具按钮

左上角工具按钮，由`toolButton`属性控制，默认为`true`，展示全部：

- 刷新：刷新当前页数据；
- 密度：也就是表格的`size`属性；
- 列设置：
  - 列设置抽屉里，可拖拽改变列的顺序，可设置列的显隐、固定右侧列或固定左侧列。

```ts
// 是否显示表格功能按钮
toolButton?: ('refresh' | 'size' | 'setting')[] | boolean
```

---

若只想展示【刷新】【密度】两个功能：

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList" :toolButton="['refresh', 'size']">
  </NaiveUiTable>
</template>
```

---

若不展示所有按钮，则传入空数组或false：

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList" :toolButton="false"> </NaiveUiTable>
</template>
```

---

若要增加自定义内容，通过插槽`toolButton`写入自定义内容

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList" :toolButton="false">
    <template #toolButton>
      <n-button>工具按钮</n-button>
    </template>
  </NaiveUiTable>
</template>
```

## 表格列自定义

- 按原来属性，在`columns`里用`render`函数自定义列；
- 同时可在插槽里进行自定义列，接收数据`row`为每一行数据，插槽名需与该列的`key`保持一致

```vue{4-8,17}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList">
    <!-- 表格单元格 -->
    <template #address="row">
      <n-button type="primary">
        {{ row.address }}
      </n-button>
    </template>
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable } from 'naive-ui-table'
import type { DataTableColumns } from 'naive-ui'

const columns: DataTableColumns = [
  { title: '姓名', key: 'name', render: (row) => <n-tag type="primary">{row.name}</n-tag> },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

async function getTableList(params: any) {
  return await api(params)
}

</script>
```

## 表格操作列

- 操作列的 key 固定为`operation`；
- 同样可在 columns 的`operation`列，用`render`函数自定义该列的按钮；
- **也可在`operation`插槽里自定义按钮，接收`row`为每一行的数据**。

```vue{4-9,21}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList">
    <!-- 表格操作 -->
    <template #operation="row">
      <n-button type="primary" ghost @click="fun('查看', row)">查看</n-button>
      <n-button type="primary" ghost @click="fun('编辑', row)">编辑</n-button>
      <n-button type="primary" ghost @click="fun('重置密码', row)">重置密码</n-button>
      <n-button type="error" ghost @click="fun('删除', row)">删除</n-button>
    </template>
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable } from 'naive-ui-table'
import type { DataTableColumns } from 'naive-ui'

const columns: DataTableColumns = [
  { title: '姓名', key: 'name'},
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' },
  { title: '操作', key: 'operation', fixed: 'right', width: 330 }
]

async function getTableList(params: any) {
  return await api(params)
}

function fun(type, row) {
  console.log(type, row)
}

</script>
```

## 顶部带查询表单

- 查询表单调用`naive-ui-form`组件，因此`search`配置与**传入useForm的参数对象**完全一致；
- 查询、重置功能已内置在表格组件里，无需额外传输；
- 查询参数，已经与表格接口的参数合并；如需额外处理，可在`requestApi`接口请求之前处理。

```vue
<template>
  <NaiveUiTable :columns="columns" :search="search" :requestApi="getTableList"> </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable } from 'naive-ui-table'
import type { DataTableColumns } from 'naive-ui'
import { type FormSchema } from 'naive-ui-form'

const columns: DataTableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

// 搜索栏配置
const search: { schemas: FormSchema[] } = {
  schemas: [
    {
      label: '姓名',
      field: 'name',
      type: 'input',
      labelPlacement: 'left'
    },
    {
      label: '年龄',
      field: 'age',
      type: 'input-number',
      labelPlacement: 'left'
    }
  ]
}

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

## 可勾选

- `@update:checked-row-keys`与naive-ui的`@update:checked-row-keys`完全一致；只需要传入该回调函数，就可获取到已勾选的`keys`。
- 默认的 row-key 是`(row) => row.id`，可自行传入`row-key`属性将其覆盖。

```vue{5,15}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    @update:checked-row-keys="handleCheck"
  >
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable } from 'naive-ui-table'
import type { DataTableColumns } from 'naive-ui'

const columns: DataTableColumns = [
  { type: 'selection', multiple: true }, // 勾选列
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

async function getTableList(params: any) {
  return await api(params)
}

// 勾选回调
function handleCheck(keys: Array<string | number>) {
  console.log('param: ', keys)
}
</script>
```

## 表格高度自适应

- 当窗口size改变时，会自动调整表格高度。避免页面出现滚动条。
- **前提：该表格组件为页面的最底部的组件**。
- 若表格底部需要放置内容，则需要传入该内容的高度。则表格底部就会留出相应的空间。

```ts
// 表格底部留白距离
// 非必传（默认为0）
resizeHeightOffset?: number
```

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList" :resizeHeightOffset="100">
  </NaiveUiTable>
</template>
```

---

若需要固定高度，则自行传入`maxHeight`将其覆盖

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList" :maxHeight="500"> </NaiveUiTable>
</template>
```

## Props

- 前四个`columns`、`maxHeight`、`scrollX`、`pagination`，与naive-ui的一致，从外部传进去可覆盖内部的

| 属性               | 类型                            | 描述                               | 必传 | 默认值 |
| ------------------ | ------------------------------- | ---------------------------------- | ---- | ------ |
| columns            | `DataTableColumns`              | 表格列配置                         | 是   | -      |
| maxHeight          | `number`                        | 表格最大高度                       | 否   | -      |
| scrollX            | `number`                        | 表格最大宽度                       | 否   | -      |
| pagination         | `boolean \| object`             | 是否显示分页                       | 否   | true   |
| requestApi         | `(params: any) => Promise<any>` | 请求接口，返回Promise              | 否   | -      |
| search             | `{ schemas: FormSchema[] }`     | 顶部查询表单配置                   | 否   | -      |
| requestAuto        | `boolean`                       | 是否自动请求接口                   | 否   | true   |
| initParams         | `object`                        | 初始化请求参数                     | 否   | -      |
| dataCallback       | `(data: object) => object`      | 处理接口请求回来的数据，返回该数据 | 否   | -      |
| requestError       | `(error: Error) => void`        | 请求接口出错时回调                 | 否   | -      |
| toolButton         | `boolean`                       | 是否显示工具栏按钮                 | 否   | true   |
| resizeHeightOffset | `number`                        | 表格高度变化时，底部留白距离       | 否   | 0      |
