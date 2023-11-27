<template>
  <NModal
    v-model:show="showModal"
    preset="dialog"
    type="info"
    positive-text="确定"
    negative-text="取消"
  >
    <BasicForm v-bind="getProps()"></BasicForm>
  </NModal>
</template>

<script setup lang="ts">
import { NModal } from 'naive-ui'
import { computed, useAttrs } from 'vue'

import BasicForm from './BasicForm.vue'

import type { ModalFormProps } from './types'

interface Emits {
  (e: 'update:show', val: boolean): void
}

const attrs = useAttrs()
const props = defineProps<ModalFormProps>()
console.log(props)
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
</script>

<style scoped></style>
