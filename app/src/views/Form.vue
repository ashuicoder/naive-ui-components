<template>
  <div>
    <BasicForm @register="register"></BasicForm>
    <ModalForm v-model:show="showModal" :schemas="schemas" title="2333" style="width: 800px">
      <template #name="{ field, formValue }">
        <input v-model="formValue[field]" type="text" />
      </template>
      <template #age>
        <input type="text" />
      </template>
    </ModalForm>
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
    type: 'slot',
    slot: 'name',
    required: true
    // groupName: '分组1'
  },
  {
    label: '年龄',
    field: 'age',
    type: 'slot',
    slot: 'age'
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
    label: '内容',
    field: 'content',
    type: 'editor',
    defaultValue: '信息展示',
    componentProps: {}
  }
]

const showModal = ref(true)
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
