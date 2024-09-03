<template>
  <div class="naive-ui-table">
    <BasicForm
      :grid="{ cols: '1 s:1 m:2 l:3 xl:4 xxl:5', xGap: 14, responsive: 'screen' }"
      v-if="searchProps"
      ref="basicForm"
      submitBtnText="查询"
      :defaultShowExpandRows="1"
      labelPlacement="left"
      @register="register"
      @submit="handleSearch"
      @reset="handleReset"
    >
      <template v-for="(_, slotName) in formSlot" :key="slotName" #[slotName]="scoped">
        <slot :name="slotName" :formValue="scoped.formValue" :field="scoped.field"></slot>
      </template>
    </BasicForm>

    <div class="table-main">
      <!-- 表格头部，操作按钮 -->
      <div class="table-header">
        <div class="table-header-left">
          <slot name="tableHeader"></slot>
        </div>
        <n-space class="table-header-right">
          <slot name="toolButton"> </slot>
          <template v-if="toolButton">
            <!-- 刷新 -->
            <n-tooltip v-if="showToolButton('refresh')">
              <template #trigger>
                <n-button circle @click="refresh">
                  <template #icon>
                    <n-icon>
                      <SyncOutline />
                    </n-icon>
                  </template>
                </n-button>
              </template>
              <span>刷新</span>
            </n-tooltip>

            <!-- 密度 -->
            <n-tooltip trigger="hover" v-if="showToolButton('size')">
              <template #trigger>
                <div>
                  <n-dropdown
                    trigger="click"
                    :options="densityOptions"
                    :value="tableSize"
                    @select="(key) => (tableSize = key)"
                  >
                    <n-button circle>
                      <template #icon>
                        <n-icon><BarbellOutline /></n-icon>
                      </template>
                    </n-button>
                  </n-dropdown>
                </div>
              </template>
              <span>密度</span>
            </n-tooltip>

            <!-- 设置 -->
            <n-tooltip v-if="showToolButton('setting')">
              <template #trigger>
                <n-button circle @click="openDrawer(true)">
                  <template #icon>
                    <n-icon>
                      <SettingsOutline />
                    </n-icon>
                  </template>
                </n-button>
              </template>
              <span>列设置</span>
            </n-tooltip>
          </template>
        </n-space>
      </div>

      <!-- 表格主体 -->
      <n-data-table
        ref="tableRef"
        :columns="tableColumns"
        :data="state.tableData"
        :loading="state.loading"
        :pagination="newPagination"
        :size="tableSize"
        :remote="tableRemote"
        :single-line="false"
        :row-key="(row) => row.id"
        v-model:checked-row-keys="checkState.keys"
        @update:checked-row-keys="handleCheck"
        :max-height="height"
        :scroll-x="scrollWidth"
        v-bind="$attrs"
      />

      <!-- 列设置 -->
      <n-drawer v-model:show="active" :width="502" placement="right">
        <n-drawer-content title="列设置" closable>
          <ColumnSetting v-model:columns="initColumns" />
        </n-drawer-content>
      </n-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  NButton,
  NDataTable,
  NDropdown,
  NDrawer,
  NDrawerContent,
  NTooltip,
  NIcon,
  NSpace
} from 'naive-ui'
import { ref, computed, useSlots, isRef, watch } from 'vue'
import { SyncOutline, SettingsOutline, BarbellOutline } from '@vicons/ionicons5'
import { BasicForm, useForm, type FormInstance } from 'naive-ui-form'

import { useTable } from './hooks/useTable'
import { useTableSize } from './hooks/useTableSize'
import { useCheck } from './hooks/useCheck'
import ColumnSetting from './ColumnSetting.vue'
import { createInitColumns } from './utils'
import { PageSizes } from './const'
import type { TableProps, Column } from './types'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<TableProps>(), {
  requestAuto: true,
  isPageApi: true,
  pagination: true,
  resizeHeightOffset: 25,
  toolButton: true,
  remote: undefined,
  size: 'medium',
  showOrderColumn: false
})

/* 表单插槽 */
const slots = useSlots()
const formSlot = computed(() => {
  const slotName = props.searchProps?.schemas?.reduce((arr, item) => {
    if (item.type === 'slot' && item.slot) {
      arr.push(item.slot)
    }
    return arr
  }, [] as string[])
  return slotName?.reduce((obj: any, key: string) => {
    if (slots[key]) {
      obj[key] = slots[key]
    }
    return obj
  }, {})
})

const emit = defineEmits<{
  (event: 'update:checked-row-keys', ...args: any[]): void
}>()

const [register, { reset, getValue, setValue, getFieldValue }] = useForm(props.searchProps)
const basicForm = ref<FormInstance | null>(null) // 搜索表单ref
const tableRef = ref() // 表格ref

/* 工具栏显隐 */
const showToolButton = (key: 'refresh' | 'size' | 'setting') => {
  return Array.isArray(props.toolButton) ? props.toolButton.includes(key) : props.toolButton
}

/* 表格尺寸 */
const tableSize = ref<'small' | 'medium' | 'large'>(props.size)
const densityOptions = [
  { label: '紧凑', key: 'small' },
  { label: '默认', key: 'medium' },
  { label: '宽松', key: 'large' }
]

/* 初始化列 */
const slot = useSlots()
const initColumns = ref(createInitColumns(props.columns, slot))

watch(() => props.columns, (val) => {
  initColumns.value = createInitColumns(val, slot)
}, { deep: true })

/* 勾选 */
const { checkState, clearCheck, handleCheck, getCheckValue } = useCheck(emit)

/* api请求 */
const {
  state,
  refresh,
  resetState,
  handleSearch,
  handleReset,
  onUpdatePage,
  onUpdatePageSize,
  getTableValue,
  getPageValue,
  setLoading
} = useTable(props, basicForm, clearCheck)

/* 表格列 */
const tableColumns = computed(() => {
  const lists = initColumns.value.filter((item: any) => item._show)
  if (props.showOrderColumn) {
    const order: Column = {
      title: '序号',
      key: '_order',
      width: 60,
      align: 'center',
      render: (_: object, index: number) =>
        (state.pageAble.current - 1) * state.pageAble.size + index + 1
    }
    if (lists[0]?.type === 'selection') {
      lists.splice(1, 0, order)
    } else {
      lists.unshift(order)
    }
  }
  return lists
})

/* 分页 */
const newPagination = computed(() => {
  if (!props.pagination) return false
  if (typeof props.pagination === 'object') return props.pagination
  if (props.requestApi && props.isPageApi) {
    return {
      page: state.pageAble.current,
      pageSize: state.pageAble.size,
      itemCount: state.pageAble.total,
      pageSizes: PageSizes,
      showSizePicker: true,
      showQuickJumper: true,
      prefix: (info) => `每页${info.pageSize}条，共${info.itemCount}条`,
      onUpdatePage,
      onUpdatePageSize
    }
  } else {
    return {
      page: state.pageAble.current,
      pageSize: state.pageAble.size,
      pageSizes: PageSizes,
      showSizePicker: true,
      prefix: (info) => `每页${info.pageSize}条，共${info.itemCount}条`,
      onUpdatePage: (page: number) => {
        state.pageAble.current = page
        clearCheck()
      },
      onUpdatePageSize: (pageSize: number) => {
        state.pageAble.size = pageSize
        state.pageAble.current = 1
        clearCheck()
      }
    }
  }
})

/* 分页异步 */
const tableRemote = computed(() => {
  if (typeof props.remote === 'boolean') return props.remote
  if (!props.requestApi) return false
  return props.isPageApi
})

/* 打开列设置抽屉 */
const active = ref(false)
function openDrawer(bool: boolean) {
  active.value = bool
}

/* 表格高度 */
const { tableMaxHeight } = useTableSize(tableRef, props.resizeHeightOffset)
const height = computed(() => {
  return props.maxHeight || tableMaxHeight.value
})

/* 表格宽度 */
const scrollWidth = computed(() => {
  const tableWidth = tableColumns.value.reduce(
    (num, item) => (num += item.width || item.minWidth || 100),
    0
  )
  return props.scrollX || tableWidth
})

defineExpose({
  basicForm,
  tableRef,
  tableColumns,
  refresh,
  resetState,
  openDrawer,
  height,
  scrollWidth,
  clearCheck,
  getCheckValue,
  getTableValue,
  getPageValue,
  setLoading,
  reset,
  getValue,
  setValue,
  getFieldValue
})
</script>

<style scoped>
.table-main {
  .table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
}

.naive-ui-table :deep(.n-data-table-thead .n-data-table-th) {
  font-weight: 700;
}

.naive-ui-table :deep(.n-button + .n-button) {
  margin-left: 12px;
}
</style>
