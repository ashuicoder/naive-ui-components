<template>
  <div>
    <BasicForm
      ref="formRef"
      :schemas="schemas"
      style="width: 800px"
      size="small"
      @register="register"
      @submit="handleSubmitEmit"
    >
      <template #address="{ formValue, field }">
        <input style="1px solid #ccc" v-model="formValue[field]" />
      </template>
    </BasicForm>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">提交</NButton>
      <NButton type="primary" @click="getFormValue">取值</NButton>
      <NButton type="primary" @click="getFormFieldValue">取单个值</NButton>
      <NButton type="primary" @click="handleSetProps">设置Props</NButton>
    </NSpace>

    <ModalForm
      v-model:show="showModal"
      title="新增"
      :schemas="schemas"
      style="width: 800px"
      @submit="handleModalSubmit"
    ></ModalForm>
  </div>
</template>

<script setup lang="tsx">
import { computed, ref } from 'vue'
import { NSpace, NButton } from 'naive-ui'
import {
  BasicForm,
  type FormSchema,
  type Recordable,
  useForm,
  type FormInstance,
  ModalForm
} from 'naive-ui-form'

const showModal = ref(false)

const formProps = {}

const formRef = ref<FormInstance | null>(null)

const schemas: FormSchema[] = [
  {
    field: 'name',
    type: 'input',
    label: '姓名',
    required: true,
    labelPlacement: 'left',
    defaultValue: '张三',
    componentProps: {
      onUpdateValue(value: string) {
        console.log(value)
      }
    },
    style: {
      width: '200px'
    }
  },
  {
    field: 'sex',
    type: 'radio',
    label: '性别',
    required: true,

    componentProps: {
      disabled: true,
      options: [
        {
          label: '男',
          value: 'male'
        },
        {
          label: '女',
          value: 'female'
        }
      ]
    }
  },
  {
    field: 'hobbies',
    type: 'checkbox',
    label: '爱好',
    required: true,
    requiredType: 'array',
    componentProps: {
      options: [
        {
          label: '吃饭',
          value: 'eat'
        },
        {
          label: '睡觉',
          value: 'sleep'
        },
        {
          label: '打豆豆',
          value: 'play'
        }
      ]
    }
  },
  {
    field: 'birthday',
    type: 'date-picker',
    label: '生日'
  },
  {
    field: 'family',
    label: '家庭成员',
    type: 'dynamic',
    dynamicOptions: [
      {
        field: 'name',
        label: '姓名',
        type: 'input',
        required: true
      },
      {
        field: 'age',
        label: '年龄',
        type: 'input-number',
        rules: {
          required: true,
          message: ''
        }
      },
      {
        field: 'sex',
        label: '性别',
        type: 'radio',
        componentProps: {
          options: [
            {
              label: '男',
              value: 'male'
            },
            {
              label: '女',
              value: 'female'
            }
          ]
        }
      }
    ]
  }
]

const [register, { getValue, getFieldValue, submit, setProps }] = useForm({
  size: 'large',
  schemas: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      tip: '233333333333333333333',
      required: true,
      labelPlacement: 'left',
      defaultValue: '张三',
      componentProps: {
        onUpdateValue(value: string) {
          console.log(value)
        }
      },
      style: {
        width: '200px'
      }
    },
    {
      field: 'sex',
      type: 'radio',
      label: '性别',
      required: true,
      vif(record) {
        console.log('vif')
        return !!record.name
      },
      componentProps: {
        options: [
          {
            label: '男',
            value: 'male'
          },
          {
            label: '女',
            value: 'female'
          }
        ]
      }
    },
    {
      field: 'hobbies',
      type: 'checkbox',
      label: '爱好',
      required: true,
      requiredType: 'array',
      componentProps: {
        options: [
          {
            label: '吃饭',
            value: 'eat'
          },
          {
            label: '睡觉',
            value: 'sleep'
          },
          {
            label: '打豆豆',
            value: 'play'
          }
        ]
      }
    },
    {
      field: 'birthday',
      type: 'date-picker',
      label: '生日'
    },
    {
      field: 'address',
      label: '地址',
      type: 'slot',
      required: true,
      slot: 'address'
    },
    {
      field: 'family',
      label: '家庭成员',
      type: 'dynamic',
      vif(record) {
        console.log('vif')
        return !!record.name
      },
      dynamicOptions: [
        {
          field: 'name',
          label: '姓名',
          type: 'input',
          required: true
        },
        {
          field: 'age',
          label: '年龄',
          type: 'input-number',
          rules: {
            required: true,
            message: ''
          }
        },
        {
          field: 'sex',
          label: '性别',
          type: 'radio',
          vif(record) {
            return !!record.age
          },
          componentProps: {
            options: [
              {
                label: '男',
                value: 'male'
              },
              {
                label: '女',
                value: 'female'
              }
            ]
          }
        }
      ]
    },
    {
      field: 'photos',
      type: 'upload',
      label: '照片',
      componentProps: {
        listType: 'image-card'
      }
    },
    {
      field: 'content',
      type: 'editor',
      label: '内容'
    }
  ],

  grid: {
    cols: 1,
    xGap: 14
  }
})

function getFormValue() {
  console.log(getValue())
}

function getFormFieldValue() {
  console.log(getFieldValue('name'))
}

async function handleSubmit() {
  console.log(formRef.value?.getValue())
  const res = await submit()

  // setTimeout(() => {
  //   setLoading(false)
  // }, 1000)
}

function handleSubmitEmit(value: Recordable) {
  console.log('emit', value)
}

function handleModalSubmit(values) {
  console.log(values, 2333)
}

function handleSetProps() {
  setProps({
    showActionBtns: false,
    disabled: true
  })
}
</script>

<style scoped></style>
