<template>
  <BasicForm @register="register"></BasicForm>
</template>

<script setup lang="ts">
import { BasicForm, useForm, type FormSchema } from 'naive-ui-form'

const schemas: FormSchema[] = []

const [register] = useForm({
  schemas
})
</script>
