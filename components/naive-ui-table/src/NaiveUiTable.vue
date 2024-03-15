<template>
  <div class="naive-ui-table">
    <BasicForm
      :grid="{ cols: '1 s:1 m:2 l:3 xl:4 xxl:5', xGap: 14, responsive: 'screen' }"
      v-if="searchProps"
      ref="basicForm"
      submitBtnText="查询"
      :defaultShowExpandRows="1"
      labelPlacement="left"
      @submit="handleSearch"
      @reset="handleReset"
      v-bind="searchProps"
    ></BasicForm>

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
                    <n-icon><SyncOutline /></n-icon>
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
                    <n-icon><SettingsOutline /></n-icon>
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
        v-model:checked-row-keys="checkedRowKeys"
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
import type { DataTableRowKey } from 'naive-ui'
import { ref, computed, onMounted, useSlots } from 'vue'
import { SyncOutline, SettingsOutline, BarbellOutline } from '@vicons/ionicons5'
import { BasicForm, type FormInstance } from 'naive-ui-form'
import { cloneDeep } from 'lodash-es'
import { useTable } from './hooks/useTable'
import ColumnSetting from './ColumnSetting.vue'
import { isFunction } from './utils'
import { PageSizes } from './const'
import { useTableSize } from './hooks/useTableSize'
import type { TableProps, Columns } from './types'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  requestAuto: true,
  isPageApi: true,
  pagination: true,
  resizeHeightOffset: 25,
  toolButton: true,
  remote: undefined
})

const emit = defineEmits(['update:checked-row-keys'])

/* 搜索表单ref */
const basicForm = ref<FormInstance | null>(null)

/* 工具栏显隐 */
const showToolButton = (key: 'refresh' | 'size' | 'setting') => {
  return Array.isArray(props.toolButton) ? props.toolButton.includes(key) : props.toolButton
}

/* 表格尺寸 */
const tableSize = ref<'small' | 'medium' | 'large'>('medium')
const densityOptions = [
  { label: '紧凑', key: 'small' },
  { label: '默认', key: 'medium' },
  { label: '宽松', key: 'large' }
]

function checkIfShow(action: Columns): boolean {
  if (typeof action.vif === 'boolean') return action.vif
  if (typeof action.vif === 'function') return action.vif(action)
  return true
}

/* 初始化列 */
const slot = useSlots()
const initColumns = ref(
  cloneDeep(props.columns)
    ?.filter(checkIfShow)
    .map((item: any) => {
      item._show = true
      if (item.render) return item
      if (slot[item.key] && isFunction(slot[item.key])) {
        item.render = slot[item.key]
      }
      return item
    })
)

/* 表格列 */
const tableColumns = computed(() => {
  return initColumns.value.filter((item: any) => item._show)
})

const { state, getTableList, handleSearch, handleReset, onUpdatePage, onUpdatePageSize } = useTable(
  props.requestApi,
  props.requestAuto,
  props.initParams,
  props.isPageApi,
  props.dataCallback,
  props.requestError,
  basicForm
)

/* 初始化表格 */
onMounted(() => {
  props.requestAuto && getTableList()
})

/* 刷新 */
function refresh() {
  checkedRowKeys.value = []
  getTableList()
}

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
      },
      onUpdatePageSize: (pageSize: number) => {
        state.pageAble.size = pageSize
        state.pageAble.current = 1
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

/* 勾选 */
const checkedRowKeys = ref<DataTableRowKey[]>([])
function handleCheck(rowKeys: DataTableRowKey[], rows, meta) {
  checkedRowKeys.value = rowKeys
  emit('update:checked-row-keys', rowKeys, rows, meta)
}

/* 表格高度 */
const tableRef = ref() // table 实例
const { tableMaxHeight } = useTableSize(tableRef, props.resizeHeightOffset)
const height = computed(() => {
  return props.maxHeight || tableMaxHeight.value
})

/* 表格宽度 */
const tableWidth = tableColumns.value.reduce(
  (num, item) => (num += item.width || item.minWidth || 100),
  0
)
const scrollWidth = computed(() => {
  return props.scrollX || tableWidth
})

defineExpose({
  refresh,
  openDrawer,
  state,
  tableColumns,
  tableRef,
  height,
  scrollWidth,
  basicForm,
  tableSize
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
