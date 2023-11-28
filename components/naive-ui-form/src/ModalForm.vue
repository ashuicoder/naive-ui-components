<template>
  <NModal
    v-model:show="showModal"
    preset="dialog"
    positive-text="确定"
    negative-text="取消"
    :onPositiveClick="handleConfirm"
    :onAfterLeave="handleClose"
  >
    <BasicForm
      v-bind="getProps()"
      :show-action-btns="false"
      style="width: 100%; margin: 40px 0"
      @register="register"
    ></BasicForm>
  </NModal>
</template>

<script setup lang="ts">
import { NModal } from 'naive-ui'
import { computed, useAttrs } from 'vue'

import BasicForm from './BasicForm.vue'
import { useForm } from './hooks/useForm'

import type { ModalFormProps, Recordable } from './types'
import to from 'await-to-js'

interface Emits {
  (e: 'update:show', val: boolean): void
  (e: 'submit', val: Recordable): void
  (e: 'cancel')
}

const attrs = useAttrs()
const props = defineProps<ModalFormProps>()
const emit = defineEmits<Emits>()

function getProps() {
  return {
    ...attrs,
    ...props
  }
}

const [register, { submit, reset }] = useForm()

const showModal = computed({
  get() {
    return props.show
  },
  set(val) {
    emit('update:show', val)
  }
})

async function handleConfirm() {
  const [err, res] = await to<Recordable>(submit())
  if (err) return false
  emit('submit', res)
  return false
}

function handleClose() {
  reset()
}
</script>

<style scoped></style>
