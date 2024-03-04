<template>
  <div>
    <BasicForm @register="register"></BasicForm>
  </div>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register] = useForm({
  disabled: true,
  grid: {
    cols: 1,
    xGap: 14
  },
  schemas: [
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
      label: '上传',
      field: 'avatar',
      type: 'upload'
    },
    {
      label: '内容',
      field: 'content',
      type: 'editor',
      defaultValue: '信息展示'
    }
  ]
})
</script>

<style scoped></style>
