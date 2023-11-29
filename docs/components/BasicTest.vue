<template>
  <BasicForm @register="register"></BasicForm>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register, { submit }] = useForm()
</script>
