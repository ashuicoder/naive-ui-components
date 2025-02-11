<template>
  <NCheckbox
    v-if="schema.type === 'checkbox-single'"
    style="width: 100%"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:checked="record[schema.field]"
    >{{ schema.componentProps?.text }}</NCheckbox
  >
  <NCheckboxGroup
    v-else-if="schema.type === 'checkbox'"
    style="width: 100%"
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
    style="width: 100%"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:formatted-value="record[schema.field]"
    :valueFormat="schema.componentProps?.valueFormat || 'yyyy-MM-dd'"
  ></NDatePicker>
  <NRate
    v-else-if="schema.type === 'radio-single'"
    style="width: 100%"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  >
  </NRate>

  <NRadioGroup
    v-else-if="schema.type === 'radio'"
    style="width: 100%"
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
    style="width: 100%"
    :style="schema?.style"
    v-bind="schema.componentProps"
    :valueFormat="schema.componentProps?.valueFormat || 'HH:mm:ss'"
    v-model:formatted-value="record[schema.field]"
  ></NTimePicker>

  <NText
    v-else-if="schema.type === 'text'"
    style="width: 100%"
    :style="schema?.style"
    v-bind="schema.componentProps"
    >{{ record[schema.field] }}</NText
  >

  <component
    is="naive-ui-upload"
    v-else-if="schema.type === 'upload'"
    list-type="image-card"
    style="width: 100%"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  ></component>

  <component
    v-else-if="schema.type === 'editor'"
    is="naive-ui-editor"
    style="height: 600px; width: 100%"
    :style="schema?.style"
    v-bind="schema.componentProps"
    v-model:value="record[schema.field]"
  ></component>

  <component
    v-else
    :is="`n-${schema.type}`"
    style="width: 100%"
    :style="schema?.style"
    v-bind="{
      ...schema.componentProps
    }"
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
  NTreeSelect,
  NText
} from 'naive-ui'

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
