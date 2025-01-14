<template>
  <div>
    <BasicForm @register="register"></BasicForm>
    <ModalForm
      v-model:show="showModal"
      :schemas="schemas"
      title="2333"
      style="width: 800px"
      :loading="loading"
      @submit="handleSubmit"
    >
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
import to from 'await-to-js'
import { BasicForm, useForm, type Recordable, type FormSchema, ModalForm } from 'naive-ui-form'
import { ref } from 'vue'
const schemas: FormSchema[] = [
  {
    label: 'a：为1时展示',
    field: 'x1',
    type: 'input',
    required: true,
    vif: (value) => value.developmentType === 1
  },

  {
    label: 'b：为1时展示',
    field: 'x2',
    type: 'input',
    required: true,
    vif: (value) => value.developmentType === 1
  },
  {
    groupName: '分组',
    label: 'c',
    field: 'x3',
    type: 'input',
    required: true
  },
  {
    label: 'd',
    field: 'developmentType',
    type: 'radio',
    required: true,
    requiredType: 'number',
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '为1',
          value: 1
        },
        {
          label: '为2',
          value: 2
        }
      ]
    }
  },
  {
    label: 'e：为2时展示',
    field: 'x4',
    type: 'input',
    required: true,
    vif: (value) => value.developmentType === 2
  }
]

const showModal = ref(false)
const [register] = useForm({
  labelWidth: undefined,
  grid: {
    cols: 1,
    xGap: 14
  },
  schemas
})

const loading = ref(false)
async function handleSubmit(params: Recordable) {
  loading.value = true
  const [err] = await to(Promise.reject(new Error('error')))
  loading.value = false
  if (err) return
  console.log('成功')
}
</script>

<style scoped></style>
