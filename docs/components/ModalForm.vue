<template>
  <div>
    <NButton type="primary" @click="showModal = true">显示弹窗</NButton>
    <ModalForm
      v-model:show="showModal"
      :schemas="schemas"
      title="新增用户"
      :loading="loading"
      @submit="handleSubmit"
      @cancel="handleCancel"
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

function handleCancel() {
  console.log('点击了取消按钮')
}
</script>

<style scoped></style>
