<template>
  <NModal
    v-model:show="showModal"
    preset="dialog"
    positive-text="确定"
    negative-text="取消"
    :onPositiveClick="handleConfirm"
    :on-negative-click="handleCancel"
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
import to from 'await-to-js'

import BasicForm from './BasicForm.vue'
import { useForm } from './hooks/useForm'

import type { Recordable } from './types'

export interface Props {
  show: boolean
}

interface Emits {
  (e: 'update:show', val: boolean): void
  (e: 'submit', val: Recordable): void
  (e: 'cancel'): void
}

const attrs = useAttrs()
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function getProps() {
  return {
    ...attrs,
    ...props
  }
}

const showModal = computed({
  get() {
    return props.show
  },
  set(val) {
    emit('update:show', val)
  }
})

const [register, { submit, reset }] = useForm()
async function handleConfirm() {
  const [err, res] = await to<Recordable>(submit())
  if (err) return false
  emit('submit', res)
  return false
}

function handleClose() {
  reset()
}

function handleCancel() {
  emit('cancel')
}
</script>

<style scoped></style>
