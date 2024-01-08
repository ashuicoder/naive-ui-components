<template>
  <div>
    <BasicForm
      v-if="searchProps"
      @register="register"
      :grid="{ cols: 4, xGap: 14 }"
      submitBtnText="查询"
      :defaultShowExpandRows="1"
      labelPlacement="left"
      @submit="handleSearch"
      @reset="handleReset"
    ></BasicForm>

    <div class="table-main">
      <!-- 表格头部，操作按钮 -->
      <div class="table-header">
        <div class="table-header-left">
          <slot name="tableHeader"></slot>
        </div>
        <div class="table-header-right">
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
                <n-dropdown
                  trigger="click"
                  :options="densityOptions"
                  @select="(key) => (tableSize = key)"
                >
                  <n-button circle>
                    <template #icon>
                      <n-icon><BarbellOutline /></n-icon>
                    </template>
                  </n-button>
                </n-dropdown>
              </template>
              <span>密度</span>
            </n-tooltip>

            <!-- 设置 -->
            <n-tooltip v-if="showToolButton('setting')">
              <template #trigger>
                <n-button circle @click="openDrawer">
                  <template #icon>
                    <n-icon><SettingsOutline /></n-icon>
                  </template>
                </n-button>
              </template>
              <span>列设置</span>
            </n-tooltip>
          </template>
        </div>
      </div>

      <!-- 表格主体 -->
      <n-data-table
        ref="tableRef"
        :columns="tableColumns"
        :data="state.tableData"
        :loading="state.loading"
        :pagination="newPagination"
        :size="tableSize"
        remote
        :row-key="(row) => row.id"
        v-model:checked-row-keys="checkedRowKeys"
        @update:checked-row-keys="handleCheck"
        :max-height="maxHeight"
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
import { NButton, NDataTable, NDropdown, NDrawer, NDrawerContent, NTooltip, NIcon } from 'naive-ui'
import type { DataTableRowKey } from 'naive-ui'
import { ref, computed, onMounted, useSlots } from 'vue'
import { SyncOutline, SettingsOutline, BarbellOutline } from '@vicons/ionicons5'
import _ from 'lodash-es'
import { BasicForm, useForm } from 'naive-ui-form'
import { useTable } from './hooks/useTable'
import ColumnSetting from './ColumnSetting.vue'
import { isFunction } from './utils'
import { PageSizes } from './const'
import { useTableSize } from './hooks/useTableSize'
import type { Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  requestAuto: true,
  pagination: true,
  resizeHeightOffset: 0,
  toolButton: true,
  searchProps: () => ({})
})

const emit = defineEmits(['update:checked-row-keys'])

/* 搜索配置 */
const [register, { setLoading, getValue }] = useForm(props.searchProps)

/* 控制 ToolButton 显示 */
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

/* 初始化列 */
const slot = useSlots()
const initColumns = ref(
  props.columns?.map((item: any) => {
    item._show = true
    if (item.render) return item
    if (slot[item.key] && isFunction(slot[item.key])) {
      item.render = (row) => (<Function>slot[item.key])(row)
    }
    return item
  })
)

/* 表格列 */
const tableColumns = computed(() => {
  return _.cloneDeep(initColumns.value)
    .filter((item: any) => item._show)
    .map((item: any) => {
      delete item._show
      return item
    })
})

const { state, getTableList, handleSearch, handleReset, onUpdatePage, onUpdatePageSize } = useTable(
  props.requestApi,
  props.initParams,
  props.pagination,
  props.dataCallback,
  props.requestError,
  getValue,
  setLoading
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
})

/* 打开列设置抽屉 */
const active = ref(false)
function openDrawer() {
  active.value = true
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
const maxHeight = computed(() => {
  return props.maxHeight || tableMaxHeight
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
  maxHeight,
  scrollWidth
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
:deep(.n-button + .n-button) {
  margin-left: 12px;
}
</style>
