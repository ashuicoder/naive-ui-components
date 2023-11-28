<script lang="tsx">
import { defineComponent, reactive, ref, toRaw, computed, watchEffect } from 'vue'
import {
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NFormItemGi,
  NAutoComplete,
  NCascader,
  NColorPicker,
  NCheckbox,
  NCheckboxGroup,
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
  NSpace,
  NButton,
  NIcon,
  NTooltip
} from 'naive-ui'

import to from 'await-to-js'

import {
  ChevronUp,
  ChevronDown,
  HelpCircleOutline,
  RemoveCircleOutline,
  AddCircleOutline
} from '@vicons/ionicons5'

import { props } from './utils/props'

import { componentMapInfo } from './const'

import type { FormInst } from 'naive-ui'
import type { FormInstance, Recordable, FormSchema, Props } from './types'

export default defineComponent({
  props,
  components: {
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NFormItemGi,
    NAutoComplete,
    NCascader,
    NColorPicker,
    NCheckbox,
    NCheckboxGroup,
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
  },
  emits: ['register', 'submit', 'reset'],
  setup(props, { emit, slots, expose }) {
    const hookProps = ref<Props>({})

    const commonProps = computed(() => {
      return Object.assign({}, props, hookProps.value)
    })

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
        commonProps.value.schemas.forEach((item) => {
          if (item.type !== 'dynamic') {
            formValue[item.field] = null
          }
          setDefaultValue(item)
          this.clearValidate()
          emit('reset')
        })
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

    expose({
      ...formMethod
    })

    emit('register', formMethod)

    const isExpand = ref(commonProps.value.defaultExpand)

    function setDefaultValue(schema: FormSchema) {
      if (schema.type === 'dynamic') {
        if (schema.defaultValue) {
          formValue[schema.field] = schema.defaultValue
        } else {
          formValue[schema.field] = [getDynamicValue(schema)]
        }
      } else {
        if (schema.defaultValue) {
          formValue[schema.field] = schema.defaultValue
        }
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

    function renderSubmitBtn() {
      if (!commonProps.value.showActionBtns || !commonProps.value.showSubmitBtn) return null
      return (
        <NButton type="primary" loading={submitLoading.value} onClick={() => formMethod.submit()}>
          {commonProps.value.submitBtnText}
        </NButton>
      )
    }

    function renderResetBtn() {
      if (!commonProps.value.showActionBtns || !commonProps.value.showResetBtn) return null
      return <NButton onClick={() => formMethod.reset()}>{commonProps.value.resetBtnText}</NButton>
    }

    function renderExpandBtn() {
      if (!commonProps.value.showActionBtns || !commonProps.value.showExpandBtn) return null
      if ((commonProps.value!.grid.cols as number) < props.defaultShowExpandColumn) return null
      return (
        <NButton
          type="primary"
          text
          v-slots={{
            icon: () => {
              return <NIcon>{isExpand.value ? <ChevronDown /> : <ChevronUp />}</NIcon>
            }
          }}
          onClick={() => {
            isExpand.value = !isExpand.value
          }}
        >
          {isExpand.value ? commonProps.value.expandBtnOffText : commonProps.value.expandBtnOnText}
        </NButton>
      )
    }

    function renderFormActionBtns() {
      if (!commonProps.value.showActionBtns) return null
      if (
        !commonProps.value.showResetBtn &&
        !commonProps.value.showSubmitBtn &&
        !commonProps.value.showExpandBtn
      ) {
        return null
      }

      return (
        <NFormItemGi suffix>
          <NSpace align="center">
            {renderSubmitBtn()} {renderResetBtn()} {renderExpandBtn()}
          </NSpace>
        </NFormItemGi>
      )
    }

    function getDynamicValue(schema: FormSchema) {
      const value: Recordable = {}
      schema.dynamicOptions?.forEach((item) => {
        value[item.field] = null
      })
      return value
    }

    function renderDynamicItem(schema: FormSchema) {
      if (!schema.dynamicOptions) {
        throw new Error('dynamicOptions is required')
      }

      return (
        <NGridItem>
          {formValue[schema.field].map((item: Recordable, formIndex: number) => {
            return (
              <NGrid cols={schema.dynamicOptions!.length + 1} xGap={14}>
                {schema.dynamicOptions?.map((dynamicSchema, index) => {
                  return renderFormItem(dynamicSchema, {
                    index: formIndex,
                    outsideSchema: schema,
                    formValue: item
                  })
                })}

                <NFormItemGi>
                  <NSpace>
                    <NButton
                      disabled={formValue[schema.field].length === 1}
                      text
                      onClick={() => handleRemoveDynamicItem(schema, formIndex)}
                    >
                      <NIcon size={24}>
                        <RemoveCircleOutline />
                      </NIcon>
                    </NButton>
                    <NButton text onClick={() => handleAddDynamicItem(schema)}>
                      <NIcon size={24}>
                        <AddCircleOutline />
                      </NIcon>
                    </NButton>
                  </NSpace>
                </NFormItemGi>
              </NGrid>
            )
          })}
        </NGridItem>
      )
    }

    function handleAddDynamicItem(schema: FormSchema) {
      formValue[schema.field].push(getDynamicValue(schema))
    }

    function handleRemoveDynamicItem(schema: FormSchema, index: number) {
      formValue[schema.field].splice(index, 1)
    }

    function renderFormItem(schema: FormSchema, dynamic?: Recordable) {
      if (schema.type === 'dynamic') return null
      const formItemComponent = (
        <NFormItemGi
          {...schema}
          path={
            dynamic
              ? `${dynamic.outsideSchema.field}[${dynamic.index}].${schema.field}`
              : schema.field
          }
          rule={getFormRule(schema)}
          v-slots={{
            label: () => {
              const label = schema.label || null
              return schema.tip ? (
                <span>
                  <NTooltip
                    v-slots={{
                      trigger: () => {
                        return (
                          <span style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '2px' }}>{label}</span>
                            <NIcon>
                              <HelpCircleOutline />
                            </NIcon>
                          </span>
                        )
                      }
                    }}
                  >
                    {schema.tip}
                  </NTooltip>
                </span>
              ) : (
                <span>{label}</span>
              )
            }
          }}
        >
          {componentMapInfo[schema.type].render(
            dynamic ? dynamic.formValue : formValue,
            schema,
            slots
          )}
        </NFormItemGi>
      )

      if (schema.vif) {
        return schema.vif(formValue) ? formItemComponent : null
      }
      return formItemComponent
    }

    watchEffect(() => {
      commonProps.value.schemas.forEach((schema) => {
        setDefaultValue(schema)
      })
    })

    function render() {
      return (
        <NForm {...commonProps.value} ref={formRef} model={formValue}>
          <NGrid {...commonProps.value.grid} collapsed={isExpand.value}>
            {commonProps.value.schemas.map((schema) => {
              if (schema.type === 'dynamic') {
                return renderDynamicItem(schema)
              }
              return renderFormItem(schema)
            })}

            {renderFormActionBtns()}
          </NGrid>
        </NForm>
      )
    }

    return render
  }
})
</script>

<style scoped></style>
