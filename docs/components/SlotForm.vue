<template>
  <BasicForm @register="register">
    <template #username="{ formValue, field }">
      <input
        v-model="formValue[field]"
        type="text"
        placeholder="这是插槽"
        style="border: 1px solid #ccc"
      />
    </template>
  </BasicForm>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register] = useForm({
  schemas: [
    {
      field: 'username',
      type: 'slot',
      label: '用户名',
      required: true,
      slot: 'username'
    }
  ]
})
</script>

<style scoped></style>
