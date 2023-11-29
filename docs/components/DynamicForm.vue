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
          required: true,
          requiredType: 'number'
        }
      ]
    }
  ]
})
</script>

<style scoped></style>
