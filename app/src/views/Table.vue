<template>
  <div style="padding: 10px">
    <NaiveUiTable
      ref="tableRef"
      :columns="columns"
      :requestApi="getTableList"
      :search-props="searchProps"
      @update:checked-row-keys="handleCheck"
      size="large"
      show-order-column
    >
      <!-- 搜索表单插槽 -->
      <template #username="{ formValue, field }">
        <input
          v-model="formValue[field]"
          type="text"
          placeholder="Slot Placeholder"
          style="border: 1px solid #ccc"
        />
      </template>

      <!-- 表格header按钮 -->
      <template #tableHeader>
        <n-button type="primary"> 新增 </n-button>
        <n-button type="info"> 导入 </n-button>
        <n-button type="success"> 导出 </n-button>
        <n-button type="warning"> 导出 </n-button>
        <n-button type="error"> 删除 </n-button>
      </template>

      <!-- 表格单元格 -->
      <template #address="{ row, index }">
        <span style="color: yellowgreen">
          {{ row.address + index }}
        </span>
      </template>

      <!-- 表格操作 -->
      <template #operation="{row, index}">
        <n-button type="primary" ghost @click="aaa(row, index)">aaa</n-button>
        <n-button type="primary" ghost @click="fun('查看', row)">查看</n-button>
        <n-button type="primary" ghost @click="fun('编辑', row)">编辑</n-button>
        <n-button type="primary" ghost @click="fun('重置密码', row)">重置密码</n-button>
        <n-button type="error" ghost @click="fun('删除', row)">删除</n-button>
      </template>
    </NaiveUiTable>

    <ModalForm v-model:show="showModal" :schemas="schemas" title="新增用户"> </ModalForm>

    <!-- <n-button @click="test">按钮{{ bool }}</n-button> -->
    <!-- <n-button @click="tableRef?.resetState">表格重置</n-button> -->
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { NaiveUiTable } from 'naive-ui-table'
import type { TableColumns, FormProps, TableInstance } from 'naive-ui-table'
import { ModalForm } from 'naive-ui-form'
import type { FormSchema } from 'naive-ui-form'
import { NButton, NTag, NDrawer, NDrawerContent, NTooltip, useMessage } from 'naive-ui'

const message = useMessage()

const tableRef = ref<TableInstance>()

// 勾选回调
function handleCheck(keys, rows, meta) {
  console.log('keys: ', keys)
  console.log('rows: ', rows)
  console.log('meta: ', meta)
}

const value = ref<any>([])

setTimeout(() => {
  value.value = [
    {
      label: '男',
      value: 'male'
    },
    {
      label: '女',
      value: 'female'
    }
  ]
}, 3000)

// 搜索栏配置
const searchProps: FormProps = {
  schemas: [
    {
      field: 'username',
      type: 'slot',
      label: '用户名',
      slot: 'username'
    },
    {
      label: '年龄',
      field: 'age',
      requiredType: 'number',
      type: 'input-number'
    },
    {
      label: '性别',
      field: 'sex',
      type: 'select',
      defaultValue: 'male',
      componentProps: {
        options: value
      }
    },
    {
      label: '身份证号',
      field: 'idCode',
      type: 'input'
    },
    {
      label: '地址',
      field: 'address',
      type: 'input'
    }
  ]
}

const bool = ref(true)

// 表格配置项
let columns: TableColumns = [
  {
    type: 'selection',
    multiple: true,
  },
  {
    title: '姓名',
    key: 'name',
    align: 'center',
    render(row) {
      return <NTag type="warning">{row.name}</NTag>
    },
    vif: bool
  },
  {
    title: '个人信息',
    key: 'sex',
    align: 'center',
    fixed: 'left',
    children: [
      {
        title: '性别年龄',
        key: 'sexAge',
        align: 'center',
        children: [
          {
            title: '年龄',
            key: 'age',
            align: 'center',
          },
          {
            title: '性别',
            key: 'sex',
            align: 'center'
          }
        ]
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
      }
    ]
  },
  ...(Array.from({ length: 40 }, (v, i) => {
    return {
      title: '姓名' + i,
      key: 'name' + i,
      align: 'center'
    }
  }) as TableColumns),

  { title: '操作', key: 'operation', fixed: 'right', align: 'center', width: 400 }
]

function test() {
  bool.value = !bool.value
}
function aaa(row:any, index:number){
  console.log('row: ', index, row);
}

async function getTableList(params: any) {
  console.log('params: ', params)
  // return Promise.reject('错误')
  return await api(params)
}

const showModal = ref(false)
function fun(type, row) {
  message.info(type)
  console.log('row: ', row)
  showModal.value = true
}

const schemas: FormSchema[] = [
  {
    field: 'username',
    type: 'input',
    label: '用户名',
    required: true
  },
  {
    field: 'age',
    label: '年龄',
    type: 'input-number',
    required: true,
    requiredType: 'number'
  }
]

// 模拟接口请求
function api(params: any = {}) {
  return new Promise((resolve, reject) => {
    const data = Array.from({ length: 42 }, (v, i) => {
      return {
        id: i + 1,
        name: '张三' + i,
        age: 18,
        sex: '男',
        idCode: '123456789012345678',
        address: '新疆维吾尔自治区昌吉回族自治州木垒哈萨克自治县大南沟村37号'
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
      // 不分页
      // resolve(data)
      // 分页
      resolve({
        current: params.current,
        size: params.size,
        pages: 5,
        records,
        total: allRecords.length
      })
    }, 500)
  })
}
</script>

<style scoped></style>
