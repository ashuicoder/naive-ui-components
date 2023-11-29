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
