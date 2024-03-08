<template>
  <div>
    <BasicForm @register="register"></BasicForm>
    <ModalForm v-model:show="showModal" :schemas="schemas" title="2333"></ModalForm>
  </div>
</template>

<script setup lang="ts">
import { BasicForm, useForm, type Recordable, type FormSchema, ModalForm } from 'naive-ui-form'
import { ref } from 'vue'
const selectList = ref<Recordable[]>([])
const schemas: FormSchema[] = [
  {
    label: '姓名',
    field: 'name',
    type: 'input'
    // groupName: '分组1'
  },
  {
    label: '年龄',
    field: 'age',
    type: 'input-number'
    // groupName: '分组2'
  },
  {
    label: '信息',
    field: 'info',
    type: 'text',
    defaultValue: '信息展示'
  },
  {
    type: 'radio',
    field: 'sex',
    label: '姓别',
    componentProps: {
      options: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ]
    },
    defaultValue: 0
  },
  {
    label: '上传',
    field: 'avatar',
    type: 'upload',
    componentProps: {
      'list-type': 'text'
    }
  },
  {
    label: '爱好',
    field: 'hobbies',
    type: 'select',
    componentProps: {
      options: selectList
    }
  },
  {
    label: '参考教程',
    type: 'dynamic',
    field: 'teachingMaterials',
    // labelPlacement: 'top',
    dynamicOptions: [
      {
        label: '教程封面',
        field: 'cover',
        type: 'upload',
        required: true,
        requiredType: 'array',
        // labelPlacement: 'top',
        componentProps: {
          max: 1
        }
      },
      {
        label: '教程名称',
        type: 'input',
        field: 'name',
        required: true
        // labelPlacement: 'top'
      },
      {
        label: '出版社',
        type: 'input',
        field: 'publisher',
        required: true
        // labelPlacement: 'top'
      }
    ]
  },
  {
    label: '内容',
    field: 'content',
    type: 'editor',
    defaultValue: '信息展示',
    componentProps: {}
  }
]

const showModal = ref(false)
const [register] = useForm({
  grid: {
    cols: 1,
    xGap: 14
  },
  schemas
})

setTimeout(() => {
  selectList.value = [
    {
      label: '男',
      value: 1
    },
    {
      label: '女',
      value: 2
    }
  ]
}, 3000)
</script>

<style scoped></style>
