<template>
  <div>
    <BasicForm @register="register" :grid="{ cols: 3, xGap: 16 }"></BasicForm>

    <button @click="details">详情填充数据</button>
  </div>
</template>

<script setup lang="ts">
import { BasicForm, useForm } from 'naive-ui-form'

const [register, { setValue }] = useForm({
  grid: {
    cols: 2,
    xGap: 16
  },

  schemas: [
    {
      groupName: '限流',
      label: '是否开启限流',
      field: 'isCurrentLimit',
      type: 'switch',
      required: true,
      requiredType: 'number',
      componentProps: {
        'checked-value': 1,
        'unchecked-value': 2,
        class: 'justify-start'
      }
    },
    {
      label: '限流秒数',
      field: 'currentLimitSecondNum',
      type: 'input-number',
      required: true,
      requiredType: 'number',
      vif: (row) => row.isCurrentLimit === 1,
      componentProps: {
        placeholder: '（单位：秒）'
      }
    },
    {
      groupName: '认证',
      label: '是否开启OAuth2认证',
      field: 'isAuth',
      type: 'switch',
      required: true,
      requiredType: 'number',
      componentProps: {
        'checked-value': 1,
        'unchecked-value': 2,
        class: 'justify-start'
      }
    },
    {
      label: 'OAuth2认证类型',
      field: 'oauthType',
      type: 'select',
      required: true,
      requiredType: 'number',
      vif: (row) => row.isAuth === 1,
      componentProps: {
        options: [
          { value: 1, label: '授权码模式' },
          { value: 2, label: '隐式授权模式' },
          { value: 3, label: '密码模式' },
          { value: 4, label: '客户端模式' }
        ]
      }
    },
    {
      groupName: '加密',
      label: '是否开启请求加密',
      field: 'isEncryption',
      type: 'switch',
      required: true,
      requiredType: 'number',
      componentProps: {
        'checked-value': 1,
        'unchecked-value': 2,
        class: 'justify-start'
      }
    },
    {
      label: '请求加密类型',
      field: 'encryptionType',
      type: 'select',
      required: true,
      requiredType: 'number',
      vif: (row) => row.isEncryption === 1,
      componentProps: {
        options: [
          { value: 1, label: '对称加密' },
          { value: 2, label: '非对称加密' }
        ]
      }
    }
  ]
})

function details() {
  setValue({
    appSecret: 'fgazgafagaegfagvagagege',
    configStatus: 1,
    cretBy: '超级管理员',
    cretTm: '2025-05-29 14:08:07',
    currentLimitNum: 5,
    currentLimitSecondNum: 10,
    delMrk: false,
    encryptionType: 1,
    envType: 'dev',
    id: '80104140806250529137002',
    ipAddress: 'xxx1,xxx2',
    isAuth: 1,
    isCurrentLimit: 1,
    isEncryption: 1,
    isIpWhiet: 1,
    isTokenAuth: 1,
    oauthType: 1,
    updBy: '超级管理员',
    updTm: '2025-05-29 14:08:07',
    userPlatformGroupId: '80104141113250523132009',
    vno: 1
  })
}
</script>

<style scoped>
:deep(.n-switch) {
  justify-content: start;
}
</style>
