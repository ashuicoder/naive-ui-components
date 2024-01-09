<template>
  <div style="padding: 10px">
    <NaiveUiTable
      :columns="columns"
      :requestApi="getTableList"
      :search-props="search"
      @update:checked-row-keys="handleCheck"
    >
      <!-- 表格header按钮 -->
      <template #tableHeader>
        <n-button type="primary"> 新增 </n-button>
        <n-button type="info"> 导入 </n-button>
        <n-button type="success"> 导出 </n-button>
        <n-button type="warning"> 导出 </n-button>
        <n-button type="error"> 删除 </n-button>
      </template>

      <!-- 表格单元格 -->
      <template #address="row">
        <n-button type="primary">
          {{ row.address }}
        </n-button>
      </template>

      <!-- 表格操作 -->
      <template #operation="row">
        <n-button type="primary" ghost @click="fun('查看', row)">查看</n-button>
        <n-button type="primary" ghost @click="fun('编辑', row)">编辑</n-button>
        <n-button type="primary" ghost @click="fun('重置密码', row)">重置密码</n-button>
        <n-button type="error" ghost @click="fun('删除', row)">删除</n-button>
      </template>
    </NaiveUiTable>
  </div>
</template>

<script setup lang="tsx">
import { NaiveUiTable } from 'naive-ui-table'
import { NButton, NDataTable, NDrawer, NDrawerContent, NTooltip, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { type FormSchema } from 'naive-ui-form'

const message = useMessage()

// 勾选回调
function handleCheck(param) {
  console.log('param: ', param)
}

// 搜索栏配置
const search: { schemas: FormSchema[] } = {
  schemas: [
    {
      label: '姓名',
      field: 'name',
      type: 'input',
      labelPlacement: 'left'
    },
    {
      label: '年龄',
      field: 'age',
      type: 'input-number',
      labelPlacement: 'left'
    },
    {
      label: '性别',
      field: 'sex',
      type: 'select',
      labelPlacement: 'left',
      defaultValue: 'male',
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
      label: '身份证号',
      field: 'idCode',
      type: 'input',
      labelPlacement: 'left'
    },
    {
      label: '地址',
      field: 'address',
      type: 'input',
      labelPlacement: 'left'
    }
  ]
}

// 表格配置项
const columns: DataTableColumns = [
  {
    type: 'selection',
    multiple: true
  },
  {
    title: '姓名',
    key: 'name',
    align: 'center',
    render(row) {
      return (
        <NButton type="primary" onClick={() => console.log('我是通过 tsx 语法渲染的内容')}>
          {row.name}
        </NButton>
      )
    }
  },
  {
    title: '年龄',
    key: 'age',
    align: 'center'
  },
  {
    title: '性别',
    key: 'sex',
    align: 'center'
  },
  {
    title: '身份证号',
    key: 'idCode',
    align: 'center'
  },
  {
    title: '地址',
    key: 'address',
    // width: 400,
    align: 'center'
  },
  { title: '操作', key: 'operation', fixed: 'right', width: 330 }
]

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
async function getTableList(params: any) {
  console.log('params: ', params)
  return await api(params)
}

function fun(type, row) {
  message.info(type, row)
}

// 模拟接口请求
function api(params) {
  return new Promise((resolve, reject) => {
    const data = Array.from({ length: 42 }, (v, i) => {
      return {
        id: i + 1,
        name: '张三' + i,
        age: 18,
        sex: '男',
        idCode: '123456789012345678',
        address: '北京市海淀区'
      }
    })
    let allRecords = data
    if (params.name) {
      allRecords = data.filter((item) => {
        return item.name.includes(params.name)
      })
    }
    const records = allRecords.slice(
      (params.current - 1) * params.size,
      params.current * params.size
    )
    setTimeout(() => {
      resolve({
        current: params.current,
        size: params.size,
        pages: 5,
        records,
        total: allRecords.length
      })
    }, 1000)
  })
}
</script>

<style scoped></style>
