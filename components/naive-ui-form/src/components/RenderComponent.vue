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

  <NaiveUiUpload
    v-else-if="schema.type === 'upload'"
    list-type="image-card"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  ></NaiveUiUpload>
  <NaiveUiEditor
    v-else-if="schema.type === 'editor'"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  ></NaiveUiEditor>

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

import { NaiveUiUpload } from 'naive-ui-upload'
import { NaiveUiEditor } from 'naive-ui-editor'

import type { FormSchema, Recordable } from '../types'

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
defineProps<Props>()
</script>

<style scoped></style>
