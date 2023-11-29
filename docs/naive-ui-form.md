

<script setup lang="ts">
  import BasicForm from './components/BasicForm.vue'
  import CustomForm from './components/CustomForm.vue'
  import SlotForm from './components/SlotForm.vue'
  import DynamicForm from './components/DynamicForm.vue'
  import ModalForm from './components/ModalForm.vue'
  import UseForm from './components/useForm.vue'
  import InstanceForm from './components/InstanceForm.vue'
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

### props



传递`props`有两种方法：

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



### 注册事件

`naive-ui-form`注册了以下事件：

- register： 使用`useForm`注册的时候用到
- submit：表单提交出发（**只有表单校验成功后才会触发**）
- reset：表单重置的时候触发



### useForm

`naive-ui-form`为了方便对表单的操作，封装了一些方法。

::: danger 注意

在使用这些方法之前，一定要先注册`register`到`naive-ui-form`上

```vue{2,8}
<template>
  <BasicForm @register="register"></BasicForm>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register, { submit }] = useForm()
</script>

```



:::

```ts
interface FormInstance {
  // 重置表单
  reset(): void
  // 提交表单，返回Promise<Recordable>,校验通过后返回表单的值，校验失败后返回校验的Error
  submit(): Promise<Recordable>
  // 校验表单，返回Primise，校验通过后进入resolve状态
  validate(nameList?: string[]): Promise<any>
  // 清空校验
  clearValidate(): void
  // 获取表单的值
  getValue(): Recordable
  // 获取表单某个项的值
  getFieldValue(field: string): any
  // 设置表单的值
  setValue(value: Recordable): void
  // 动态设置表单的Props
  setProps(props: Props): void
  // 手动设置表单提交按钮的加载状态
  setLoading(loading: boolean): void
}

```



<UseForm></UseForm>

```vue
<template>
  <div>
    <BasicForm @register="register" :show-action-btns="false"></BasicForm>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">提交</NButton>
      <NButton type="primary" @click="handleReset">重置</NButton>
      <NButton type="primary" @click="handleVerify">校验</NButton>
      <NButton type="primary" @click="handleClearVerify">清空校验</NButton>
      <NButton type="primary" @click="handleGetValue">获取表单值</NButton>
      <NButton type="primary" @click="handleGetFieldValue">获取某个值</NButton>
      <NButton type="primary" @click="handleSetValue">手动赋值</NButton>
    </NSpace>
  </div>
</template>

<script setup lang="tsx">
import { NSpace, NButton } from 'naive-ui'
import { BasicForm, useForm, type Recordable } from 'naive-ui-form'

const [
  register,
  { submit, reset, validate, clearValidate, getValue, getFieldValue, setValue, setProps }
] = useForm({
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
    }
  ]
})

function handleSubmit() {
  submit()
    .then((res: Recordable) => {
      console.log(`表单校验成功`)
      console.log(res)
    })
    .catch((err) => {
      console.log('表单校验失败失败', err)
    })
}

function handleReset() {
  reset()
  console.log('表单已重置')
}

function handleVerify() {
  validate()
    .then(() => console.log('校验通过'))
    .catch(() => console.log('校验失败'))
}

function handleClearVerify() {
  clearValidate()
  console.log('校验已清空')
}

function handleGetValue() {
  console.log(getValue())
}

function handleGetFieldValue() {
  console.log(getFieldValue('name'))
}

function handleSetValue() {
  setValue({
    name: '李四',
    school: '北京大学',
    sex: 'male',
    hobbies: ['eat', 'sleep'],
    birthday: '2000-01-01'
  })
}
</script>

<style scoped></style>

```



### 组件api

如果不想使用[useForm](#useForm)，也可以直接通过`naive-form-ui`组件自身调用上面的方法：

<InstanceForm></InstanceForm>

```vue
<template>
  <div>
    <BasicForm ref="formRef" :schemas="schemas" :show-action-btns="false"></BasicForm>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">提交</NButton>
      <NButton type="primary" @click="handleReset">重置</NButton>
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import { NSpace, NButton } from 'naive-ui'
import { BasicForm, type FormSchema, type FormInstance } from 'naive-ui-form'
import { ref } from 'vue'
const formRef = ref<FormInstance | null>(null)
const schemas: FormSchema[] = [
  {
    field: 'name',
    label: '姓名',
    type: 'input',
    required: true
  }
]

function handleSubmit() {
  formRef.value?.submit()
}

function handleReset() {
  formRef.value?.reset()
}
</script>

<style scoped></style>

```







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

::: tip 提示

一些特`type`的说明:

- `radio`： 需要在`componentProps`传入`options`字段，如果是异步数据可以定义为`ref`响应数据。

  ```ts{3,6-17}
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
      }
  ```

- `checkbox`：同上`radio`

- `date-picker`： 默认的格式为`yyyy-MM-dd`，格式请参考[这里](https://ui.naiveadmin.com/zh-CN/os-theme/components/date-picker#datetimeformat.vue)修改方式如下：

  ```ts{6}
      {
        field: 'birthday',
        type: 'date-picker',
        label: '生日',
        componentProps: {
          valueFormat: 'xxxxx'
        }
      }
  ```

- `time-picker`:  默认的格式为`HH:mm:ss`，修改同上。

:::

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

除了[](#自定义组件)外，你也可以使用插槽。`type`设置为`slot`， 再加一个`slot`名称，示例如下：
<SlotForm></SlotForm>

```vue{3-10,21,24}
<template>
  <BasicForm @register="register">
    <template #username="{ formValue, field }">
      <input
        v-model="formValue[field]"
        type="text"
        placeholder="这是插槽"
        style="border: 1px solid #ccc"
      />
    </template>
  </BasicForm>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register] = useForm({
  schemas: [
    {
      field: 'username',
      type: 'slot',
      label: '用户名',
      required: true,
      slot: 'username'
    }
  ]
})
</script>

<style scoped></style>

```



### 动态表单

`动态表单`需要将`type `设置为`dynamic`，再新增一个`dynamicOptions`配置，示例如下：

<DynamicForm></DynamicForm>

```vue{13-27}
<template>
  <BasicForm @register="register"></BasicForm>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register] = useForm({
  schemas: [
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
          required: true
        }
      ]
    }
  ]
})
</script>

<style scoped></style>

```

## ModalForm

`ModalForm`是`BasicForm`的封装，主要是为了方便在弹窗中使用。您可以直接传入`BasicForm`、[n-modal](https://ui.naiveadmin.com/zh-CN/os-theme/components/modal)、[dialog](https://ui.naiveadmin.com/zh-CN/os-theme/components/dialog)支持的`props`。`ModalForm`会在校验通过后出发`submit`事件，参数就是表单的值。点击`取消按钮`时还会触发`cancel`事件。

<ModalForm></ModalForm>

```vue
<template>
  <div>
    <NButton type="primary" @click="showModal = true">显示弹窗</NButton>
    <ModalForm
      v-model:show="showModal"
      :schemas="schemas"
      title="新增用户"
      :loading="loading"
      @submit="handleSubmit"
    ></ModalForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import { ModalForm, type FormSchema, type Recordable } from 'naive-ui-form'

const showModal = ref(false)
const schemas: FormSchema[] = [
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
    required: true,
    requiredType: 'number'
  }
]

const loading = ref(false)
function handleSubmit(values: Recordable) {
  console.log(values)
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showModal.value = false
  }, 2000)
}
</script>

<style scoped></style>

```





