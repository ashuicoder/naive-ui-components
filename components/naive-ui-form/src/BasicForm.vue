<template>
  <NForm
    label-width="auto"
    label-placement="left"
    v-bind="commonProps"
    ref="formRef"
    :model="formValue"
  >
    <NGrid
      v-bind="commonProps.grid"
      :collapsed="isExpand"
      :collapsed-rows="commonProps.defaultShowExpandRows"
    >
      <template v-for="schema in commonProps.schemas">
        <template v-if="schema.type !== 'dynamic'">
          <NGridItem v-if="schema.groupName" :span="commonProps?.grid?.cols">
            <NDivider title-placement="left">
              <div style="font-size: 16px">{{ schema.groupName }}</div>
            </NDivider>
          </NGridItem>
          <NFormItemGi
            v-if="typeof schema.vif === 'function' ? schema.vif(formValue) : true"
            v-bind="schema"
            :path="schema.field"
            :rule="getFormRule(schema)"
          >
            <div style="width: 100%">
              <RenderComponent v-if="schema.type !== 'slot'" :schema="schema" :record="formValue">
              </RenderComponent>
              <slot v-else :name="schema.slot" :formValue="formValue" :field="schema.field"></slot>
              <div v-if="schema.tip">
                <NText type="warning">{{ schema.tip }}</NText>
              </div>
            </div>
          </NFormItemGi>
        </template>

        <template v-else>
          <NFormItemGi
            v-if="typeof schema.vif === 'function' ? schema.vif(formValue) : true"
            v-bind="schema"
          >
            <NGrid :cols="1">
              <NGridItem v-for="(item, index) in formValue[schema.field]">
                <NGrid :cols="schema.dynamicOptions!.length + 1" :xGap="14">
                  <template v-for="dynamicSchema in schema.dynamicOptions">
                    <NFormItemGi
                      v-show="
                        typeof dynamicSchema.vif === 'function' ? dynamicSchema.vif(item) : true
                      "
                      v-bind="dynamicSchema"
                      :path="`${schema.field}[${index}].${dynamicSchema.field}`"
                      :rule="getFormRule(dynamicSchema)"
                    >
                      <div style="width: 100%">
                        <RenderComponent
                          v-if="dynamicSchema.type !== 'slot'"
                          :schema="dynamicSchema"
                          :record="item"
                        ></RenderComponent>

                        <slot
                          v-else
                          :name="dynamicSchema.slot"
                          :formValue="item"
                          :field="dynamicSchema.field"
                        ></slot>

                        <div v-if="schema.tip">
                          <NText type="warning">{{ schema.tip }}</NText>
                        </div>
                      </div>
                    </NFormItemGi>
                  </template>
                  <NGridItem>
                    <div style="height: 100%; display: flex; align-items: center">
                      <NSpace>
                        <NButton
                          :disabled="formValue[schema.field].length === 1"
                          text
                          @click="handleRemoveDynamicItem(schema, index)"
                        >
                          <NIcon :size="24">
                            <RemoveCircleOutline />
                          </NIcon>
                        </NButton>

                        <NButton text @click="handleAddDynamicItem(schema)">
                          <NIcon :size="24">
                            <AddCircleOutline />
                          </NIcon>
                        </NButton>
                      </NSpace>
                    </div>
                  </NGridItem>
                </NGrid>
              </NGridItem>
            </NGrid>
          </NFormItemGi>
        </template>
      </template>

      <NFormItemGi v-if="commonProps.showActionBtns" label=" " suffix>
        <NSpace style="width: 100%" :justify="commonProps.grid.cols === 1 ? 'start' : 'end'">
          <NButton
            v-if="commonProps.showSubmitBtn"
            type="primary"
            :loading="submitLoading"
            @click="() => formMethod.submit()"
            >{{ commonProps.submitBtnText }}</NButton
          >

          <NButton v-if="commonProps.showResetBtn" @click="() => formMethod.reset()">{{
            commonProps.resetBtnText
          }}</NButton>

          <NButton
            v-if="commonProps.showExpandBtn"
            type="primary"
            text
            @click="isExpand = !isExpand"
          >
            <template #icon>
              <NIcon>
                <ChevronDown v-if="isExpand"></ChevronDown>
                <ChevronUp v-else></ChevronUp>
              </NIcon>
            </template>
            {{ isExpand ? commonProps.expandBtnOffText : commonProps.expandBtnOnText }}
          </NButton>
        </NSpace>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>

<script setup lang="ts">
import { ref, computed, reactive, toRaw, watch } from 'vue'
import {
  NForm,
  NGrid,
  NFormItemGi,
  NGridItem,
  NSpace,
  NButton,
  NIcon,
  NText,
  NDivider
} from 'naive-ui'

import to from 'await-to-js'

import { ChevronUp, ChevronDown, RemoveCircleOutline, AddCircleOutline } from '@vicons/ionicons5'

import RenderComponent from './components/RenderComponent.vue'

import { componentMapInfo } from './const'

import type { FormInst } from 'naive-ui'

import type { BasicProps, Recordable, Props, FormInstance, FormSchema } from './types'

const hookProps = ref<Props>({})
const props = withDefaults(defineProps<BasicProps>(), {
  schemas: () => [],
  grid: () => ({
    cols: 1,
    xGap: 14
  }),
  showActionBtns: true,
  showSubmitBtn: true,
  submitBtnText: '提交',
  showResetBtn: true,
  resetBtnText: '重置',
  showExpandBtn: true,
  expandBtnOffText: '展开',
  expandBtnOnText: '收起',
  defaultExpand: false,
  defaultShowExpandRows: 1
})
const emit = defineEmits<{
  register: [formInsta: FormInstance]
  submit: [value: Recordable]
  reset: []
}>()

const formValue = reactive<Recordable>({})
const formRef = ref<FormInst | null>(null)
const submitLoading = ref(false)

const formMethod: FormInstance = {
  async submit() {
    submitLoading.value = true
    const [err] = await to(this.validate())

    if (err) {
      submitLoading.value = false
      return Promise.reject(err)
    }
    emit('submit', this.getValue())
    return this.getValue()
  },
  reset() {
    commonProps.value.schemas?.forEach((item) => {
      if (item.type !== 'dynamic') {
        formValue[item.field] = null
      }
      setDefaultValue(item)
    })
    this.clearValidate()
    emit('reset')
  },
  getValue() {
    return toRaw(formValue)
  },

  getFieldValue(field: string) {
    return formValue[field]
  },

  setValue(value: Recordable) {
    for (const key in value) {
      formValue[key] = value[key]
    }
  },
  validate() {
    return formRef.value!.validate()
  },
  clearValidate() {
    formRef.value!.restoreValidation()
  },
  setProps(useFormProps: Props) {
    hookProps.value = useFormProps
  },
  setLoading(loading: boolean) {
    submitLoading.value = loading
  }
}

defineExpose(formMethod)

emit('register', formMethod)

const commonProps = computed(() => {
  return Object.assign({}, props, hookProps.value)
})

const isExpand = ref(commonProps.value.defaultExpand)

function setDefaultValue(schema: FormSchema, record = formValue) {
  if (Reflect.has(schema, 'defaultValue')) {
    record[schema.field] = schema.defaultValue
    return
  }

  if (schema.type === 'dynamic') {
    record[schema.field] = [getDynamicValue(schema)]
    schema.dynamicOptions?.forEach((item) => {
      setDefaultValue(item, formValue[schema.field][0])
    })
  }

  if (schema.type === 'upload') {
    record[schema.field] = []
  }

  if (schema.type === 'editor') {
    record[schema.field] = ''
  }
}

function getFormRule(schema: FormSchema) {
  if (schema.type === 'dynamic') return undefined
  if (schema.required) {
    const rule: Recordable = {
      required: true,
      message:
        schema.requiredMessage ||
        `请${componentMapInfo[schema.type].outputStr}${schema.label || ''}`,
      trigger: schema.requiredTrigger || ['blur']
    }
    if (schema.requiredType) {
      rule.type = schema.requiredType
    }

    return rule
  }

  if (schema.rules) return schema.rules

  return undefined
}

function getDynamicValue(schema: FormSchema) {
  const value: Recordable = {}
  schema.dynamicOptions?.forEach((item) => {
    value[item.field] = item.type !== 'upload' ? null : []
  })
  return value
}

watch(
  () => commonProps.value.schemas,
  (val) => {
    val?.forEach((schema) => {
      setDefaultValue(schema)
    })
  },
  {
    immediate: true
  }
)

function handleAddDynamicItem(schema: FormSchema) {
  formValue[schema.field].push(getDynamicValue(schema))
}

function handleRemoveDynamicItem(schema: FormSchema, index: number) {
  formValue[schema.field].splice(index, 1)
}
</script>

<style scoped></style>
