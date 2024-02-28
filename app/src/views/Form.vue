<template>
  <div>
    <BasicForm @register="register"></BasicForm>
  </div>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register] = useForm({
  grid: {
    cols: 12
  },
  schemas: [
    {
      label: '姓名',
      field: 'name',
      type: 'input',
      groupName: '分组1'
    },
    {
      label: '年龄',
      field: 'age',
      type: 'input-number',
      groupName: '分组2'
    },
    {
      label: '信息',
      field: 'info',
      type: 'text',
      defaultValue: '信息展示'
    }
  ]
})
</script>

<style scoped></style>
