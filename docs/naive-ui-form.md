

<script setup lang="ts">
  import BasicForm from './components/BasicForm.vue'
  import CustomForm from './components/CustomForm.vue'
</script>
# naive-ui-form文档

## 简介

::: info

`naive-ui-form`是基于`naive-ui`封装的表单组件。**一个配置，生成一个表单**。支持`typescript`。

:::

`naive-ui-form`相比于使用`n-form`原生表单有如下优势：

- 无需手动布局，组件内部使用`n-grid`自动布局，只需传入props参数即可，灵活配置。
- 无需手写校验`rules`，大部分场景下只需要传一个`required:true`就可以了。
- 支持`动态表单`，减少开发时间和复杂度。
- 内置了`文件上传（支持图片裁剪）`、`富文本`等插件，方便开发
- 完整的`ts`类型提示

---



**下面是`naive-ui-form`的一个完整表单的示例：**




<BasicForm></BasicForm>

```vue
<template>
  <BasicForm @register="register"></BasicForm>
</template>

<script setup lang="tsx">
import { BasicForm, useForm, type Recordable } from 'naive-ui-form'

const [register] = useForm({
  schemas: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      required: true,
      labelPlacement: 'left',
      defaultValue: '张三',
      componentProps: {
        onUpdateValue(value: string) {
          console.log(value)
        }
      },
      style: {
        width: '200px'
      }
    },
    {
      field: 'sex',
      type: 'radio',
      label: '性别',
      required: true,
      componentProps: {
        options: [
          {
            label: '男',
            value: 'male'
          },
          {
            label: '女',
            value: 'female'
          }
        ]
      }
    },
    {
      field: 'hobbies',
      type: 'checkbox',
      label: '爱好',
      required: true,
      requiredType: 'array',
      componentProps: {
        options: [
          {
            label: '吃饭',
            value: 'eat'
          },
          {
            label: '睡觉',
            value: 'sleep'
          },
          {
            label: '打豆豆',
            value: 'play'
          }
        ]
      }
    },
    {
      field: 'birthday',
      type: 'date-picker',
      label: '生日'
    },
    {
      field: 'school',
      type: 'custom',
      label: '学校',
      required: true,
      render(formValue: Recordable, field: string) {
        return <input v-model={formValue[field]} style={{ border: '1px solid #ccc' }} />
      }
    },
    {
      field: 'family',
      label: '家庭成员',
      type: 'dynamic',
      dynamicOptions: [
        {
          field: 'name',
          label: '姓名',
          type: 'input',
          required: true
        },
        {
          field: 'age',
          label: '年龄',
          type: 'input-number',
          rules: {
            required: true,
            message: ''
          }
        },
        {
          field: 'sex',
          label: '性别',
          type: 'radio',
          componentProps: {
            options: [
              {
                label: '男',
                value: 'male'
              },
              {
                label: '女',
                value: 'female'
              }
            ]
          }
        }
      ]
    }
  ]
})
</script>

<style scoped></style>

```

## 安装

```shel
pnpm add naive-ui-form 
```

也可以使用`npm` 、`yarn`等安装。

::: danger 注意

必须安装了以下依赖才能使用`naive-ui-form`

```json
{
    "vue": ">=3.2.0",
    "naive-ui": ">=2.34.0",
    "@vicons/ionicons5": ">=0.12.0"
}
```

`naive-ui`已经配置到项目中：

```vue
<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <router-view></router-view>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN, NMessageProvider } from 'naive-ui'
</script>

<style scoped></style>

```

:::



## 基本使用

```vue
<template>
  <BasicForm></BasicForm>
</template>

<script setup lang="ts">
import { BasicForm } from 'naive-ui-form'
</script>
```

给组件传递`props`有两种方法：

1. 受用经典传值方式:

   ```vue
   <template>
     <BasicForm :schemas="schemas"></BasicForm>
   </template>
   ```

2. 使用`useForm`：

   ```vue
   <template>
     <BasicForm @register="register"></BasicForm>
   </template>
   
   <script setup lang="ts">
   import { BasicForm, useForm } from 'naive-ui-form'
   
   const [register] = useForm({
     schemas: []
   })
   </script>
   
   ```



::: tip 提示

如果`props`和`useForm()`传值有冲突，以`useForm`的值为准。

:::



## props说明



| 字段                    | 类型         | 描述                                                         | 必传 | 默认值 |
| ----------------------- | ------------ | ------------------------------------------------------------ | ---- | ------ |
| schemas                 | FormSchema[] | 表单配置，详见[schemas](#schemas)                            | 是   | -      |
| grid                    | Object       | `<n-grid>`的props，详见[n-grid](https://ui.naiveadmin.com/zh-CN/os-theme/components/grid) | 否   | -      |
| showActionBtns          | Boolean      | 是否展示表单的操作按钮(提交、重置、展开)，优先级最高         | 否   | true   |
| showSubmitBtn           | Boolean      | 是否展示提交按钮                                             | 否   | true   |
| submitBtnText           | String       | 提交按钮文字                                                 | 否   | "提交" |
| showResetBtn            | Boolean      | 是否展示重置按钮                                             | 否   | true   |
| resetBtnText            | String       | 重置按钮文字                                                 | 否   | "重置" |
| showExpandBtn           | Boolean      | 是否展示展开/折叠按钮                                        | 否   | true   |
| expandBtnOffText        | String       | ”折叠“状态时候的文字                                         | 否   | ”展开“ |
| expandBtnOnText         | String       | ”展开“状态时候的文字                                         | 否   | ”收起“ |
| defaultExpand           | Boolean      | 是否默认折叠                                                 | 否   | false  |
| defaultShowExpandColumn | Number       | 默认展开的行数                                               | 否   | 2      |

::: tip 提示

支持传入[n-form](https://ui.naiveadmin.com/zh-CN/os-theme/components/form)的props。组件内部重写了部分props，即使你手动传入也是无效的，如`model`、`rules`

:::

## schemas

`schemas`是`naive-ui-form`中重要的配置，如果你使用了`typescript`，你可以从`naive-ui-form`中导入`FormSchema `类型

```vue
<template>
  <BasicForm @register="register"></BasicForm>
</template>

<script setup lang="ts">
import { BasicForm, useForm, type FormSchema } from 'naive-ui-form'

const schemas: FormSchema[] = []

const [register] = useForm({
  schemas
})
</script>

```



### FormSchema字段说明

| 字段            | 类型                                            | 描述                                                         | 是否必填 |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------ | -------- |
| tip             | `string`或`() => VNode`                         | 填写此字段会在label后面出现一个“问号”，鼠标移入就会显示该字段 | 否       |
| tipIconProps    | Object                                          | 在label后面”问号“的props，可以传入[n-icon](https://ui.naiveadmin.com/zh-CN/os-theme/components/icon)的props | 否       |
| field           | string                                          | 整个表单的值是一个对象，该字段就是描述需要v-model到该字段上，如该字段设置为"name"，那么表单的值就是{name: xxx} | 是       |
| type            | string                                          | 见[type字段说明](#type字段说明)                              | 是       |
| defaultValue    | any                                             | 该项的默认值                                                 | 否       |
| componentProps  | Object                                          | `naive-ui`原生表单项(如`n-input`、`n-select`等)的props，通过该字段传入 | 否       |
| required        | boolean                                         | 该项是否必填，如果设置为`true`组件内部会自动校验必填，优先级最高 | 否       |
| requiredType    | string                                          | `required`为`true`时校验的特殊类型，如`array`、`number`      | 否       |
| requiredMessage | string                                          | `required`为`true`校验未通过的信息                           | 否       |
| requiredTrigger | `string` 或`string[]`                           | `required`为`true`校验的出发方式                             | 否       |
| rules           | `FormItemRule`或`FormItemRule[]`                | `required`为`true`时无效，自定义表单校验，同[n-form-item](https://ui.naiveadmin.com/zh-CN/os-theme/components/form#FormItem-Props)的`rule`属性 | 否       |
| style           | Object                                          | 设置`n-form-item`的style                                     | 否       |
| vif             | (value:Recordable) => boolean                   | 动态显示该表单，需要返回一个布尔值，`value`是表单的值        | 否       |
| render          | (formValue: Recordable, filed: string) => VNode | 当[type](#type字段说明)字段为`custom`的时候必传，自定义渲染表单项 | 否       |
| slot            | string                                          | 当[type](#type字段说明)字段为`slot`的时候必传，插槽名称      | 否       |
| dynamicOptions  | FormSchema[]                                    | 动态表单的配置，当[type](#type字段说明)字段为`dynamic`的时候必传 | 否       |



### type字段说明

`type`字段映射了`naive-ui`的表单组件，映射关系如下：

| 字段          | 映射的组件                  |
| ------------- | --------------------------- |
| auto-complete | NAutoComplete               |
| cascader      | NCascader                   |
| color-picker  | NColorPicker                |
| checkbox      | NCheckboxGroup              |
| date-picker   | NDatePicker                 |
| dynamic-input | NDynamicInput               |
| dynamic-tags  | NDynamicTags                |
| input         | NInput                      |
| input-number  | NInputNumber                |
| mention       | NMention                    |
| radio-single  | NRadio                      |
| radio         | NRadioGroup                 |
| rate          | NRate                       |
| select        | NSelect                     |
| slider        | NSlider                     |
| switch        | NSwitch                     |
| time-picker   | NTimePicker                 |
| transfer      | NTransfer                   |
| tree-select   | NTreeSelect                 |
| custom        | 见[自定义组件](#自定义组件) |
| slot          | 见[插槽](#插槽)             |
| dynamic       | 见[动态表单](#动态表单)     |

### 自定义组件

当`naive-ui`的表单组件不满足需求的时候，可自定义组件，`type`设置为`custom`，`render`函数返回自定义组件示例如下：

<CustomForm></CustomForm>

```vue{12,15-23}
<template>
  <BasicForm @register="register"></BasicForm>
</template>

<script setup lang="tsx">
import { BasicForm, useForm } from 'naive-ui-form'

const [register] = useForm({
  schemas: [
    {
      field: 'username',
      type: 'custom',
      label: '用户名',
      required: true,
      render(formValue, field) {
        return (
          <input
            v-model={formValue[field]}
            placeholder="请输入用户名"
            style={{ border: '1px solid #ccc' }}
          />
        )
      }
    }
  ]
})
</script>

<style scoped></style>

```



### 插槽



### 动态表单



## ModalForm

