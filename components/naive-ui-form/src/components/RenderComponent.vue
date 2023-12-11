<template>
  <NCheckbox
    v-if="schema.type === 'checkbox-single'"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:checked="record[schema.field]"
    >{{ schema.componentProps?.text }}</NCheckbox
  >
  <NCheckboxGroup
    v-else-if="schema.type === 'checkbox'"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  >
    <NSpace>
      <NCheckbox
        v-for="item in schema.componentProps?.options"
        v-bind="item"
        :value="item.value"
        :label="item.label"
      ></NCheckbox>
    </NSpace>
  </NCheckboxGroup>

  <NDatePicker
    v-else-if="schema.type === 'date-picker'"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:formatted-value="record[schema.field]"
    :valueFormat="schema.componentProps?.valueFormat || 'yyyy-MM-dd'"
  ></NDatePicker>
  <NRate
    v-else-if="schema.type === 'radio-single'"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  >
  </NRate>

  <NRadioGroup
    v-else-if="schema.type === 'radio'"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  >
    <NSpace>
      <NRadio
        v-for="item in schema.componentProps?.options"
        :key="item.label"
        v-bind="item"
        :value="item.value"
        >{{ item.label }}</NRadio
      >
    </NSpace>
  </NRadioGroup>

  <NTimePicker
    v-else-if="schema.type === 'time-picker'"
    :style="schema?.style"
    v-bind="schema.componentProps"
    :valueFormat="schema.componentProps?.valueFormat || 'HH:mm:ss'"
    v-model:formatted-value="record[schema.field]"
  ></NTimePicker>

  <UploadComponent
    v-else-if="schema.type === 'upload'"
    list-type="image-card"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  ></UploadComponent>
  <EditorComponent
    v-else-if="schema.type === 'editor'"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  ></EditorComponent>

  <template v-else-if="schema.type === 'slot'">
    <slot :name="schema.slot" :formValue="record" :field="schema.field"></slot>
  </template>

  <component
    v-else
    :is="`n-${schema.type}`"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  ></component>
</template>

<script setup lang="ts">
import {
  NSpace,
  NAutoComplete,
  NCascader,
  NCheckbox,
  NCheckboxGroup,
  NColorPicker,
  NDatePicker,
  NDynamicInput,
  NDynamicTags,
  NInput,
  NInputNumber,
  NMention,
  NRadio,
  NRadioGroup,
  NRate,
  NSelect,
  NSlider,
  NSwitch,
  NTimePicker,
  NTransfer,
  NTreeSelect
} from 'naive-ui'

import type { FormSchema, Recordable } from '../types'
import { defineAsyncComponent } from 'vue'

defineOptions({
  components: {
    NAutoComplete,
    NCascader,
    NCheckbox,
    NCheckboxGroup,
    NColorPicker,
    NDatePicker,
    NDynamicInput,
    NDynamicTags,
    NInput,
    NInputNumber,
    NMention,
    NRadio,
    NRadioGroup,
    NRate,
    NSelect,
    NSlider,
    NSwitch,
    NTimePicker,
    NTransfer,
    NTreeSelect
  }
})

interface Props {
  schema: FormSchema
  record: Recordable
}
const props = defineProps<Props>()

const EditorComponent = defineAsyncComponent(() => import('naive-ui-editor/src/NaiveUiEditor.vue'))
const UploadComponent = defineAsyncComponent(() => import('naive-ui-upload/src/NaiveUiUpload.vue'))
</script>

<style scoped></style>
