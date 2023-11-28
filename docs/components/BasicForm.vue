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
