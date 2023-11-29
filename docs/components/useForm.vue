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
