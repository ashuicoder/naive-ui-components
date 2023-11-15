<template>
  <div>
    <NaiveUiForm :schemas="schemas" style="width: 800px" size="small" @register="register">
      <template #address="{ formValue, field }">
        <input v-model="formValue[field]" />
      </template>
    </NaiveUiForm>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">提交</NButton>
      <NButton type="primary" @click="getFormValue">取值</NButton>
      <NButton type="primary" @click="getFormFieldValue">取单个值</NButton>
    </NSpace>
  </div>
</template>

<script setup lang="tsx">
import { computed, ref } from 'vue'
import { NSpace, NButton } from 'naive-ui'
import { NaiveUiForm, type FormSchema, useForm } from 'naive-ui-form'

const schemas: FormSchema[] = [
  // {
  //   label: '自动填充',
  //   type: 'auto-complete',
  //   field: 'autoComplete',
  //   componentProps: {
  //     options: [
  //       {
  //         label: '111111',
  //         value: 1
  //       },
  //       {
  //         label: '2222222',
  //         value: 2
  //       }
  //     ]
  //   }
  // },
  // {
  //   label: '取色',
  //   field: 'color',
  //   type: 'color-picker',
  //   componentProps: {
  //     onUpdateValue(value: string) {
  //       console.log(value)
  //     }
  //   }
  // }
]

const [register, { getValue, getFieldValue, submit, setLoading }] = useForm({
  size: 'large',
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
      render(formValue, field) {
        return <input v-model={formValue[field]} />
      }
    },
    {
      field: 'address',
      label: '地址',
      type: 'slot',
      required: true,
      slot: 'address'
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
  ],

  grid: {
    cols: 1,
    xGap: 14
  }
})

function getFormValue() {
  console.log(getValue())
}

function getFormFieldValue() {
  console.log(getFieldValue('name'))
}

async function handleSubmit() {
  const res = await submit()

  setTimeout(() => {
    setLoading(false)
  }, 1000)
}
</script>

<style scoped></style>
