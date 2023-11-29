<template>
  <BasicForm @register="register"></BasicForm>
</template>

<script setup lang="tsx">
import { BasicForm, useForm } from 'naive-ui-form'

const [register] = useForm({
  schemas: [
    {
      field: 'username',
      type: 'custom',
      label: '用户名',
      required: true,
      render(formValue, field) {
        return (
          <input
            v-model={formValue[field]}
            placeholder="这是原生的input输入框"
            style={{ border: '1px solid #ccc' }}
          />
        )
      }
    }
  ]
})
</script>

<style scoped></style>
