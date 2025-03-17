<template>
  <div>
    <BasicForm :schemas="schemas"></BasicForm>

    <button @click="handleClick">回显示</button>
  </div>
</template>

<script setup lang="ts">
import { BasicForm, type Recordable, type FormSchema } from 'naive-ui-form'
import { ref } from 'vue'

const radioOptions = ref<Recordable[]>([])

const schemas: FormSchema[] = [
  {
    label: '性别',
    field: 'sex',
    type: 'radio',
    componentProps: {
      options: radioOptions
    }
  },
  {
    label: '性别',
    field: 'sex1',
    type: 'checkbox',
    componentProps: {
      options: radioOptions
    }
  }
]

function handleClick() {
  radioOptions.value = [
    {
      label: '男',
      value: '1'
    },
    {
      label: '女',
      value: '2'
    }
  ]
}
</script>

<style scoped></style>
