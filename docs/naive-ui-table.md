# naive-ui-table文档

## 介绍

**naive-ui-table**是基于[naive-ui的table组件](https://www.naiveui.com/zh-CN/light/components/data-table)封装的组件，主要区别是内置了很多常用功能，但配置非常简单，更能满足多种情况的开发需求。且支持`naive-ui`的`data-table`的所有属性。

功能如下：

- 表格列`columns`配置与`naive-ui`一致（增加了`vif`），且自定义列增加了插槽配置；
- 自带分页：若接口可以分页查询，则分页配置与接口相结合；若接口不分页，则由表格自动分页。
- 自带搜索：只需要传入`search-props`配置，即可实现搜索功能；
- 自带列设置：可设置列显隐、列固定，可拖拽排序列顺序；
- 表格高度自适应，避免数据过多时页面出现滚动条。

::: tip 提示

**`naive-ui-table`支持`naive-ui`的`data-table`的所有属性**。

:::

## 安装、使用

```bash
# 安装
pnpm add naive-ui-table

# 更新
pnpm update naive-ui-table
```

全局注册

```ts
import { createApp } from 'vue'
import NaiveUiTable from 'naive-ui-table'
import 'naive-ui-table/dist/style.css'

const app = createApp(App)
app.use(NaiveUiTable)
```

局部引入

```vue
<template>
  <NaiveUiTable></NaiveUiTable>
</template>

<script setup lang="ts">
import { NaiveUiTable } from 'naive-ui-table'
import 'naive-ui-table/dist/style.css'
</script>
```

## 基础用法

只需传入两个参数`columns`和`requestApi`，即可实现异步分页请求数据展示表格。

```vue
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList"></NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' }
]

// 返回带结果的promise对象
async function getTableList(params: any) {
  return await api(params)
}
</script>
```

::: info 注意
该 columns 配置除`vif`外，与`naive-ui`的`data-table`的`columns`完全一致。具体属性参考[naive-ui的columns](https://www.naiveui.com/zh-CN/light/components/data-table#DataTable-Props)
:::

::: tip 是否分页：

- 默认接口是分页接口（`isPageApi: true`），即：
  - 接口参数包含`current,size`
  - 接口返回数据格式为`{ current: 1, size: 10, total: 100, records: [...] }`；
- **若接口不分页，需将`isPageApi`设为`false`**，即：
  - 接口参数里没有`current,size`
  - 接口返回数据格式为`{ [...] }`；

:::

## 表格列权限`vif`

- `columns.vif`：（`boolean | ((column?: Columns) => boolean`）动态显示该列。
- 类型为返回布尔值的表达式或函数。不传默认显示。

```vue{12,17}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList"></NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  {
    title: '姓名',
    key: 'name',
    vif: true
  },
  {
    title: '年龄',
    key: 'age',
    vif: () => true
  }
]

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

## 表格左上角-自定义按钮

- `tableHeader`插槽，用于自定义表格左上角的内容，例如标题、按钮等。

```vue{3-6}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList">
    <template #tableHeader>
      <n-button type="primary">新增</n-button>
      <n-button>导出</n-button>
    </template>
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' }
]

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

## 表格右上角-工具按钮

`toolButton`属性：控制右上角工具按钮；默认为`true`，表示展示全部按钮：

- 【刷新】：刷新当前页数据
- 【密度】：也就是表格的`size`属性
- 【列设置】：列设置抽屉里，可拖拽改变列的顺序、设置列的显隐、固定右侧列或固定左侧列

```ts
// 是否显示表格功能按钮
toolButton?: ('refresh' | 'size' | 'setting')[] | boolean
```

---

若只想展示【刷新】【密度】两个按钮：

```vue{5}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    :toolButton="['refresh', 'size']"
  >
  </NaiveUiTable>
</template>
```

---

若不展示所有按钮，则传入空数组`[]`或`false`：

```vue{5}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    :toolButton="false"
  >
  </NaiveUiTable>
</template>
```

---

`toolButton`插槽：若要增加内容，通过该插槽可以写入自定义内容

```vue{6-8}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
  >
    <template #toolButton>
      <n-button>其他工具按钮</n-button>
    </template>
  </NaiveUiTable>
</template>
```

## 表格列自定义

### 方式一：用`render`函数

按原来的属性，在`columns`里用`render`函数自定义列的内容。

```vue{12}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList"></NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  {
    title: '姓名',
    key: 'name',
    render: (row) => <n-tag type="primary">{row.name}</n-tag>
  },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

### 方式二：用插槽自定义列

用插槽自定义列，**插槽名需与该列的`key`保持一致**，接收数据`row`为每一行数据，`index`为索引值。

```vue{3-5}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList">
    <template #name="row, index">
      <n-tag type="primary">{{ row.name }}</n-tag>
    </template>
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

## 表格操作列

操作列的 **key** 和 **插槽名** 固定为 **`operation`**。

### 方式一：用`render`函数

可在 columns 的`operation`列配置里，用`render`函数自定义列。

```vue{18-26}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList"></NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 330,
    render(row) {
      return (
        <>
          <NButton type="primary" ghost onClick={() => fun('查看', row)}>查看</NButton>
          <NButton type="primary" ghost onClick={() => fun('编辑', row)}>编辑</NButton>
          <NButton type="error" ghost onClick={() => fun('删除', row)}>删除</NButton>
        </>
      )
    }
  }
]

function fun(type, row) {
  console.log(type, row)
}

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

### 方式二：用插槽`operation`

也可用插槽`operation`自定义列，接收`row`为每一行的数据，`index`为索引值。

```vue{4-8,19}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList">
    <!-- 表格操作列 -->
    <template #operation="row, index">
      <n-button type="primary" ghost @click="fun('查看', row)">查看</n-button>
      <n-button type="primary" ghost @click="fun('编辑', row)">编辑</n-button>
      <n-button type="error" ghost @click="fun('删除', row)">删除</n-button>
    </template>
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name'},
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' },
  { title: '操作', key: 'operation', fixed: 'right', align: 'center', width: 330 }
]

function fun(type, row) {
  console.log(type, row)
}

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

## 查询表单

传入`search-props`配置将开启查询表单：

- 查询表单调用[**`naive-ui-form`**](/naive-ui-form)组件，`search-props`配置自行参考表单组件；
- 查询、重置功能已内置在表格组件里，无需额外传输；
- 查询参数，已经与表格接口的参数合并；如需额外处理，可在`requestApi`接口请求之前处理。

```vue{5,20-33}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    :search-props="search"
  ></NaiveUiTable>
</template>

<script setup lang="ts">
import { NaiveUiTable } from 'naive-ui-table'
import type { TableColumns, FormProps } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

// 搜索栏配置
const search: FormProps = {
  schemas: [
    {
      label: '姓名',
      field: 'name',
      type: 'input',
    },
    {
      label: '年龄',
      field: 'age',
      type: 'input-number',
    }
  ]
}

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

::: info 组件内部：`search-props`对象将全部传递给useForm

```js
const [register] = useForm(props.searchProps)
```

:::

## 查询表单-插槽

- 查询表单也可以使用插槽，用法与`naive-fi-form`组件的插槽完全一致，自行参考`naive-fi-form`的插槽用法。

::: danger 注意：
slot插槽名不能与`columns`的`key`重复。否则该插槽会同时作为表格的自定义列的内容。
:::

```vue{8-15,34-35}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    :search-props="search"
  >
    <!-- 查询表单插槽 -->
    <template #username="{ formValue, field }">
      <input
        v-model="formValue[field]"
        type="text"
        placeholder="这是插槽"
        style="border: 1px solid #ccc"
      />
    </template>
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import type { TableColumns, FormProps } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

// 搜索栏配置
const search: FormProps = {
  schemas: [
    {
      label: '姓名',
      field: 'name',
      type: 'slot',
      slot: 'username'
    },
    {
      label: '年龄',
      field: 'age',
      type: 'input-number'
    }
  ]
}

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

## 获取勾选数据

### 方式一：`@update:checked-row-keys`回调

传入`@update:checked-row-keys`回调函数，可**实时获取**到已勾选的`keys, rows, meta`。
::: tip 注意

- 该`@update:checked-row-keys`与naive-ui的`@update:checked-row-keys`完全一致；
- 默认的 row-key 是`(row) => row.id`，可自行传入`row-key`属性将其覆盖。

:::

```vue{5,13,20-22}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    @update:checked-row-keys="handleCheck"
  ></NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { type: 'selection', multiple: true }, // 勾选列
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

// 勾选回调
function handleCheck(keys: Array<string | number>) {
  console.log('param: ', keys)
}

async function getTableList(params: any) {
  return await api(params)
}
</script>
```

### 方式二：`getCheckValue`方法

```vue{29}
<template>
  <NaiveUiTable
    :ref="tableRef"
    :columns="columns"
    :requestApi="getTableList"
  ></NaiveUiTable>
  <button @click="func">获取勾选的数据</button>
</template>

<script setup lang="tsx">
import type { TableColumns, TableInstance } from 'naive-ui-table'

// 表格配置项
const columns: TableColumns = [
  { type: 'selection', multiple: true }, // 勾选列
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

async function getTableList(params: any) {
  return await api(params)
}

const tableRef = ref<TableInstance>()

// 获取勾选的数据信息
function func() {
  const checkInfo = tableRef.value?.getCheckValue()
}
</script>
```

## 表格高度自适应

- 当窗口size改变时，会自动调整表格高度。避免页面出现滚动条。
- **前提：该表格组件为页面的最底部的组件**。
- 若表格下面有内容要展示，则需要传入该内容的高度，表格底部就会留出相应的空间。

```ts
// 表格底部留白距离。非必传（默认：25）
resizeHeightOffset?: number
```

```vue{5}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    :resizeHeightOffset="100"
  >
  </NaiveUiTable>
</template>
```

---

若需要固定高度，不需要自适应，则自行传入`maxHeight`将其覆盖

```vue{5}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    :maxHeight="500"
  >
  </NaiveUiTable>
</template>
```

## 增加接口请求的参数

### 方式一：传入`initParams`对象

- 要额外增加接口请求的参数，可传入`initParams`对象，该对象将会与接口请求的参数合并。

```vue{5-8,23}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    :initParams="{
      type: 1,
      id: 'xxxxxx'
    }"
  >
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

async function getTableList(params: any) {
  console.log(params) // {type: 1, id: 'xxxxxx', current: 1, size: 10}
  return await api(params)
}
</script>
```

### 方式二：在`requestApi`接口请求之前处理

- 在`requestApi`接口请求之前，可在`params`对象上增加额外的参数。

```vue{15-16}
<template>
  <NaiveUiTable :columns="columns" :requestApi="getTableList"> </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

async function getTableList(params: any) {
  params.type = 1
  params.id = 'xxxxxx'
  return await api(params)
}
/* 参数：{current: 1, size: 10, type: 1, id: 'xxxxxx'} */
</script>
```

## 数据处理回调`dataCallback`

- 该函数**接收接口返回的原始数据，返回目标表格数据**。
- 如果数据格式不符合要求、或者接口请求后立马需要执行某些逻辑，有两种解决方式：
  - 方式一：在`requestApi`接口请求里处理；
  - 方式二：在`dataCallback`回调函数里处理。

```vue{5,24-31}
<template>
  <NaiveUiTable
    :columns="columns"
    :requestApi="getTableList"
    :dataCallback="dataCallback"
  >
  </NaiveUiTable>
</template>

<script setup lang="tsx">
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'

const columns: TableColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]

// 方式一：接口请求里。返回正确的表格数据，或增加其他逻辑
async function getTableList(params: any) {
  return await api(params)
}

// 方式二：dataCallback。返回正确的表格数据，或增加其他逻辑
function dataCallback(data) {
  data.records = data.records.map((item, index) => {
    item.name = item.name + index
    return item
  })
  return data
}
</script>
```

::: tip 返回正确的数据格式：

- 若接口为分页接口，则需要返回`{ current: 1, size: 10, total: 100, records: [...] }`格式的数据；
- 若接口为非分页接口，则直接返回`[...]`表格数据。

:::

## Props

- 必传项只有`columns`，除`vif`外，与naive-ui的`columns`完全一致，具体配置参考[naive-ui的table组件](https://www.naiveui.com/zh-CN/light/components/data-table)
- 自定义属性如下：

| 属性               | 类型                                              | 描述                                                                               | 必传 | 默认值 |
| ------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------- | ---- | ------ |
| columns            | `DataTableColumns`                                | 表格列配置，除`vif`外，与naive-ui的完全一致                                        | 是   | -      |
| requestApi         | `(params: any) => Promise<any>`                   | 请求接口，返回带结果的Promise                                                      | 否   | -      |
| search-props       | `FormProps`                                       | 顶部查询表单配置                                                                   | 否   | -      |
| requestAuto        | `boolean`                                         | 是否初始化自动请求接口                                                             | 否   | true   |
| isPageApi          | `boolean`                                         | 接口是否为分页接口（为true，接口参数里添加分页参数，且分页变化会重新查询表格数据） | 否   | true   |
| initParams         | `object`                                          | 额外的请求接口的参数                                                               | 否   | -      |
| dataCallback       | `(data: object) => object`                        | 接收接口返回的原始数据，返回目标表格数据。（数据格式不符合要求时使用）             | 否   | -      |
| requestError       | `(error: Error) => void`                          | 请求接口出错时回调                                                                 | 否   | -      |
| toolButton         | `('refresh' \| 'size' \| 'setting')[] \| boolean` | 是否显示工具栏按钮                                                                 | 否   | true   |
| resizeHeightOffset | `number`                                          | 表格高度自适应变化时，底部留白距离                                                 | 否   | 25     |

- 其余属性：**支持naive-ui的`data-table`组件的全部属性**。组件内部已经对`data-table`配置了以下属性，均可传入将其覆盖：

| 内置属性    | 描述                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| data        | 表格数据。内部由 requestApi 请求接口返回。_传入可覆盖_                                          |
| loading     | loading状态。内部跟随接口请求而变化。_传入可覆盖_                                               |
| pagination  | 表格分页配置。接口为分页接口时，页码与接口相结合；反之由表格内部自动分页。_传入可覆盖_          |
| remote      | 分页是否异步。接口为分页接口时，值为true，反之为false。_传入可覆盖_                             |
| row-key     | 行key。内部该值为：`(row) => row.id`。_传入可覆盖_                                              |
| max-height  | 最大高度。内部已通过计算得出自适应的最大高度。_传入可覆盖_                                      |
| scroll-x    | 横向宽度。内部已根据columns计算出横向宽度。_传入可覆盖_                                         |
| size        | 表格尺寸。默认值为`'medium'`，可点击【工具栏-密度】切换。_传入可覆盖_                           |
| single-line | 列分割线。内部该值为true。_传入可覆盖_                                                          |
| ...         | <div style="color: red;font-size:18px">......支持传入naive-ui的 data-table 组件的全部属性</div> |

## Methods

通过ref调用以下方法：

| 名称          | 类型                                                     | 说明                       |
| ------------- | -------------------------------------------------------- | -------------------------- |
| refresh       | `() => void`                                             | 刷新表格数据               |
| openDrawer    | `(bool: boolean) => void`                                | 打开列设置抽屉             |
| clearCheck    | `() => void`                                             | 清除选中                   |
| setLoading    | `(bool: boolean) => void`                                | 设置表格loading            |
| getTableValue | `() => any[]`                                            | 获取表格数据               |
| getPageValue  | `() => { current: number, size: number, total: number }` | 获取分页数据               |
| getCheckValue | `() => { keys: DataTableRowKey[]; rows: object[] }`      | 获取勾选数据               |
| reset         | `() => void`                                             | 搜索表单：手动调用重置按钮 |
| getValue      | `() => Recordable`                                       | 搜索表单：获取值           |
| setValue      | `(value: Recordable) => void`                            | 搜索表单：设置值           |
| getFieldValue | `(field: string) => any`                                 | 搜索表单：获取指定字段的值   |

## States

通过ref调用以下状态：

| 名称         | 类型               | 说明                                    |
| ------------ | ------------------ | --------------------------------------- |
| basicForm    | `FormInstance`     | 查询表单组件`BasicForm`的ref实例        |
| tableRef     | `DataTableInst`    | `naive-ui`的`n-data-table`组件的ref实例 |
| tableColumns | `DataTableColumns` | 最终传入`n-data-table`组件的columns属性 |
| height       | `number`           | 最终传入`n-data-table`组件的maxHeight   |
| scrollWidth  | `number`           | 最终传入`n-data-table`组件的scrollX     |

## Slots

| 名称           | 参数                                | 说明                            |
| -------------- | ----------------------------------- | ------------------------------- |
| tableHeader    | ()                                  | 表格左上角的内容展示            |
| toolButton     | ()                                  | 表格右上角的内容展示            |
| operation      | (rowData: object, rowIndex: number) | 表格操作列的内容展示            |
| [columns.key]  | (rowData: object, rowIndex: number) | 表格[columns.key]列的自定义内容 |
| [schemas.slot] | (formValue: object, field: string)  | 表单[schemas.slot]的自定义内容  |

## TS类型

**TableColumns：**

```ts
import type { TableColumns } from 'naive-ui-table'

const columns: TableColumns<any> = [{ title: '姓名', key: 'name' }]
```

**TableInstance：**

```ts
import type { TableInstance } from 'naive-ui-table'

const tableRef = ref<TableInstance>()
```

**其他：来自`naive-ui-form`**

```ts
import type { FormProps, FormInstance } from 'naive-ui-table'

const search: FormProps = {
  schemas: [
    {
      label: '关键词',
      field: 'name',
      type: 'input'
    }
  ]
}

const formRef = ref<FormInstance>()
```
