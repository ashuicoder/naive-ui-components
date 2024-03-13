[[toc]]

# 按钮组件

## 介绍

Buttons是基于naive-ui的按钮组件封装的组件，主要区别是使用*配置*渲染组件

功能如下：

- 只需传入一个配置项`config`，即可生成按次序排列的按钮；
- 可以设置按钮的显隐、权限、点击事件等；
- 点击事件增加了配置与事件分离的配置方式。

属性说明：

Buttons有`config`、`btnType`、`param`、`spaceProps`四个自定义属性，同时可传入`naive-ui`的button的所有属性

- **config**：按钮配置，必传（`BtnItem[]`），`BtnItem`里有以下六个自定义属性，同时可配置`naive-ui`的button的所有属性：
  - label：按钮文字（`string`）
  - icon：图标（`Component`）
  - vif：是否显示（`boolean | ((param?: any) => boolean）`）
  - auth：权限（`string[]`）
  - eventName：点击事件名称（`string`）
  - btnType：按钮类型（`'tableBtn' | 'other'`）
- **btnType**：按钮类型（`'tableBtn' | 'other'`）
- **param**：vif函数和点击事件的参数
- **spaceProps**：`n-space`组件的属性

## 基础使用
项目里该组件已全局注册，可直接使用。
```vue
<template>
	<Buttons
		:config="config"
		:param="row"
		btnType="tableBtn"
		@edit="edit"
		@delete="del"
	></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '编辑',
		type: 'primary',
		auth: ['BTN00460'],
		eventName: 'edit'
	},
	{
		label: '删除',
		type: 'error',
		auth: ['BTN00459'],
		eventName: 'delete'
	}
]

function edit(row: any) {
	console.log('编辑')
}
function del(row: any) {
	console.log('删除')
}
</script>

```

## 图标`icon`

`config.icon`，设置按钮图标，直接传入**图标组件**即可。

```vue{13,19,25}
<template>
	<Buttons :config="config"></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'
import { CashOutline, AddCircle, CloseCircle } from '@vicons/ionicons5'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		icon: CashOutline,
		onClick: () => console.log('详情')
	},
	{
		label: '编辑',
		type: 'primary',
		icon: AddCircle,
		onClick: () => console.log('编辑')
	},
	{
		label: '删除',
		type: 'error',
		icon: CloseCircle,
		onClick: () => console.log('删除')
	}
]
</script>
```

## 点击事件

### 方式一：`onClick`

通过`@click`绑定，配置格式为`onClick: Function`

```vue{12,17,22}
<template>
	<Buttons :config="config"></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		onClick: () => console.log('详情')
	},
	{
		label: '编辑',
		type: 'primary',
		onClick: () => console.log('编辑')
	},
	{
		label: '删除',
		type: 'error',
		onClick: () => console.log('删除')
	}
]
</script>

```

### 方式二：`eventName`

自定义事件：将事件通过`v-on`传递给组件，在配置里用`eventName`指定自定义事件的名称。

> 组件内部将`eventName`指定的事件绑定到对应按钮的点击事件上。

> 该方式目的：使配置和事件逻辑分开，方便代码归类整理。

```vue{4-6,17,22,27}
<template>
	<Buttons
		:config="config"
		@details="details"
		@edit="edit"
		@delete="handleDelete"
	></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		eventName: 'details'
	},
	{
		label: '编辑',
		type: 'primary',
		eventName: 'edit'
	},
	{
		label: '删除',
		type: 'error',
		eventName: 'delete'
	}
]

function details() {
	console.log('详情')
}
function edit() {
	console.log('编辑')
}
function handleDelete() {
	console.log('删除')
}
</script>
```

::: tip `eventName`命名：
该名称为`@`符后面的名称，格式不做限制，支持`camelCase`、`kebab-case`、`PascalCase`

例如：自定义事件为`@editData="handleEdit"`，此时`eventName`可以为以下三种：

- `eventName: 'edit-data'`
- `eventName: 'editData'`
- `eventName: 'EditData'`

:::

## 事件参数`param`

点击事件的默认参数是`$event`。

如果给Buttons组件传递了`param`属性：

- 该`param`就为点击事件的第一参数，`$event`为第二参数；**（注意：两种点击事件都有效）**
- `vif`为`Function`时，该`param`为参数。

|          | 不传`param`                 | 传递`param`                             |
| -------- | --------------------------- | --------------------------------------- |
| 点击事件 | `onClick: (e: Event) => {}` | `onClick: (param: any, e: Event) => {}` |
| vif      | `vif: () => {}`             | `vif: (param: any) => {}`               |

完整例子：

```vue{4,16-19,24,28-30}
<template>
	<Buttons
		:config="config"
		:param="{ name: '企安' }"
		@edit-data="edit"
	></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		vif: (param: any) => param.name === '企安',
		onClick: (param: any) => {
			console.log(param) // {name: '企安'}
		}
	},
	{
		label: '编辑',
		type: 'primary',
		eventName: 'edit-data'
	}
]

function edit(param: any) {
	console.log(param) // {name: '企安'}
}
</script>
```

> 该`param`在表格操作列里使用，效果尤为显著。让按钮配置可以不用写在render函数里，vif 和点击事件里也仍然能获取到需要的参数。

## 按钮显隐`vif`

`config.vif`：（`boolean | (param?:object)=>boolean`），按钮是否显示，不传表示显示。

> 若组件上传递了`param`，`vif`为函数时，`param`可作为函数的参数。

```vue{12,18}
<template>
	<Buttons :config="config" :param="{ name: '企安' }"></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		vif: false,
		onClick: () => console.log('详情')
	},
	{
		label: '编辑',
		type: 'primary',
		vif: (param: any) => param.name === '企安',
		onClick: () => console.log('编辑')
	},
	{
		label: '删除',
		type: 'error',
		onClick: () => console.log('删除')
	}
]
</script>
```

## 按钮权限`auth`

`config.auth`：（`string[]`），设置按钮权限。不传，表示显示按钮。

```vue{17,23}
<template>
	<Buttons
		:config="config"
		@details="details"
		@editData="edit"
		@delete="handleDelete"
	></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		auth: ['BTN00459'],
		eventName: 'details'
	},
	{
		label: '编辑',
		type: 'primary',
		auth: ['BTN00460'],
		eventName: 'EditData'
	},
	{
		label: '删除',
		type: 'error',
		eventName: 'delete'
	}
]

function details() {
	console.log('详情')
}
function edit() {
	console.log('编辑')
}
function handleDelete() {
	console.log('删除')
}
</script>
```

## 支持`n-button`的props

### 单独配置每个按钮

**`config`配置支持`naive-ui`的`n-button`所有的props**，例如：

```vue{11,12,16,17,18,22,23}
<template>
	<Buttons :config="config"></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		size: 'small'
	},
	{
		label: '编辑',
		type: 'primary',
		circle: true,
		disabled: true
	},
	{
		label: '删除',
		type: 'error',
		dashed: true
	}
]
</script>
```

### 统一配置所有按钮

**组件上也支持`naive-ui`的`n-button`所有的props。**

如果所有按钮的配置是一样的，就可以统一在组件上配置，例如：

```vue{4-6}
<template>
	<Buttons
		:config="config"
		type="primary"
		size="small"
		dashed
	></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情'
	},
	{
		label: '编辑'
	},
	{
		label: '删除',
		type: 'error'
	}
]
</script>
```

::: tip

- Buttons组件会把除`config`、`btnType`、`param`、`spaceProps`、`@xxx`以外的 **props**，都合并到 config 每一个按钮配置上；
- 若有同名属性，**以`config`里的为主**。

上述例子，等同于以下配置：

```vue{11-13,17-19,23-25}
<template>
	<Buttons :config="config"></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		size: 'small',
		dashed: true
	},
	{
		label: '编辑',
		type: 'primary',
		size: 'small',
		dashed: true
	},
	{
		label: '删除',
		type: 'error',
		size: 'small',
		dashed: true
	}
]
</script>
```

:::

## 按钮类型`btnType`

针对表格写了一组按钮属性，用于统一表格操作列的按钮，传入`btnType="tableBtn"`可设置为表格类型

> btnType默认是`other`，即为空

```vue{2}
<template>
	<Buttons :config="config" btnType="tableBtn"></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		onClick: () => console.log('详情')
	},
	{
		label: '编辑',
		type: 'primary',
		onClick: () => console.log('编辑')
	},
	{
		label: '删除',
		type: 'error',
		onClick: () => console.log('删除')
	}
]
</script>
```

可给单个按钮设置类型（优先级更高）

```vue{12,18}
<template>
	<Buttons :config="config"></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
	{
		label: '详情',
		type: 'primary',
		btnType: 'tableBtn',
		onClick: () => console.log('详情')
	},
	{
		label: '编辑',
		type: 'primary',
		btnType: 'tableBtn',
		onClick: () => console.log('编辑')
	},
	{
		label: '删除',
		type: 'error',
		onClick: () => console.log('删除')
	}
]
</script>
```

后续根据项目UI可在组件内添加其他的风格

## 按钮间距

组件内部使用`n-space`包裹所有按钮，可通过属性`spaceProps`设置`n-space`的属性。

```vue{5}
<template>
  <Buttons
    type="primary"
    :config="config"
    :spaceProps="{ vertical: true, size: 30, class: 'bg-red-200' }"
  ></Buttons>
</template>

<script setup lang="tsx">
import type { BtnItem } from 'comp/Buttons'

const config: BtnItem[] = [
  { label: '详情' },
  { label: '编辑' },
  { label: '删除', type: 'error' }
]
</script>
```

::: info

组件内部：

```vue{2}
<template>
	<n-space v-bind="spaceProps">
		<n-button v-for="item in btnList" ...> ... </n-button>
	</n-space>
</template>
```

:::

## 在`naive-ui-table`中使用

```vue{6,11-18,33-41,43-64,73-84}
<template>
  <n-card>
    <NaiveUiTable :columns="columns" :requestApi="getTableList">
      <!-- 表格header按钮 -->
      <template #tableHeader>
        <Buttons :config="headerBtn" @add="add"></Buttons>
      </template>

      <!-- 表格操作列 -->
      <template #operation="row">
        <Buttons
          :config="operationBtn"
          btnType="tableBtn"
          :param="row"
          @details="details"
          @edit="edit"
          @delete="handleDelete"
        ></Buttons>
      </template>
    </NaiveUiTable>
  </n-card>
</template>

<script setup lang="tsx">
import { CashOutline } from '@vicons/ionicons5'
import { NaiveUiTable, type TableColumns } from 'naive-ui-table'
import 'naive-ui-table/dist/style.css'
import type { BtnItem } from 'comp/Buttons'
import { list } from 'api/user'

type Item = Recordable

const headerBtn: BtnItem[] = [
  {
    label: '新增',
    type: 'primary',
    icon: CashOutline,
    auth: ['BTN00458'],
    eventName: 'add'
  }
]

const operationBtn: BtnItem[] = [
  {
    label: '详情',
    type: 'primary',
    icon: CashOutline,
    vif: (row) => row.age > 20,
    auth: ['BTN00459'],
    eventName: 'details'
  },
  {
    label: '编辑',
    type: 'primary',
    auth: ['BTN00460'],
    eventName: 'edit'
  },
  {
    label: '删除',
    type: 'error',
    auth: ['BTN00461'],
    eventName: 'delete'
  }
]

const columns: TableColumns<Item> = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' },
  { title: '操作', key: 'operation', fixed: 'right', width: 330 }
]

function add() {
  console.log('新增')
}
function details(data: Item) {
  console.log('详情', data)
}
function edit(data: Item) {
  console.log('编辑', data)
}
function handleDelete(data: Item) {
  console.log('删除', data)
}

async function getTableList(params: object) {
  console.log('params: ', params)
  return await list(params)
}
</script>
```

## Props

<table>
	<tr style="font-weight:bold;">
		<td>属性名称</td><td>类型</td><td>是否必须</td><td>描述</td>
	</tr>
	<tr>
		<td>config</td><td class="td">BtnItem[]</td><td>是</td><td>按钮配置</td>
	</tr>
	<tr>
		<td>btnType</td><td class="td">'tableBtn' | 'other'</td><td>否</td><td>按钮类型 （不传默认other，表示为空）</td>
	</tr>
	<tr>
		<td>param</td><td class="td">any</td><td>否</td><td>vif函数和点击事件参数</td>
	</tr>
	<tr>
		<td>spaceProps</td><td class="td">SpaceProps</td><td>否</td><td>n-space组件的属性</td>
	</tr>
	<tr>
		<td>@xxx</td><td class="td">Function</td><td>否</td><td>按钮点击事件，需与 eventName 配合使用</td>
	</tr>
	<tr>
		<td colspan="4" style="color:red;font-size:18px">……支持传入 naive-ui 的 button 的所有属性</td>
	</tr>
</table>

<table>
	<tr style="font-weight:bold;">
		<td>config配置项</td><td>类型</td><td>是否必须</td><td>描述</td>
	</tr>
	<tr>
		<td>label</td><td class="td">string</td><td>否</td><td>按钮内容</td>
	</tr>
	<tr>
		<td>icon</td><td class="td">Component</td><td>否</td><td>图标组件</td>
	</tr>
	<tr>
		<td>vif</td><td class="td">boolean | (param?:any)=>boolean</td><td>否</td><td>按钮是否回显（不传表示回显）</td>
	</tr>
	<tr>
		<td>auth</td><td class="td">string[]</td><td>否</td><td>按钮权限（不传表示回显）</td>
	</tr>
	<tr>
		<td>btnType</td><td class="td">'tableBtn' | 'other'</td><td>否</td><td>按钮类型 （不传默认other，表示为空）</td>
	</tr>
	<tr>
		<td>eventName</td><td class="td">string</td><td>否</td><td>按钮点击事件名称，与@xxx保持一致</td>
	</tr>
	<tr>
		<td colspan="4" style="color:red;font-size:18px">……支持传入 naive-ui 的 button 的所有属性</td>
	</tr>
</table>

<style>
  .td {
    color:#8951b2;
  }
</style>
