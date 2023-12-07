<template>
  <ul class="header">
    <li>拖拽</li>
    <li>列名</li>
    <li>显示</li>
    <li>固定到左侧</li>
    <li>固定到右侧</li>
  </ul>

  <Draggable v-model="columnsList" item-key="key" animation="300" filter=".no-draggable">
    <template #item="{ element }">
      <ul class="list">
        <li style="cursor: pointer">
          <n-icon size="20"><Move /></n-icon>
        </li>
        <li class="no-draggable">{{ element.title }}</li>
        <li class="no-draggable"><n-switch v-model:value="element._show" /></li>
        <li class="no-draggable">
          <n-button quaternary circle :type="element.fixed === 'left' ? 'primary' : undefined">
            <template #icon>
              <n-icon size="24" @click="fixed(element, 'left')"
                ><ChevronBackCircleOutline
              /></n-icon>
            </template>
          </n-button>
        </li>
        <li class="no-draggable">
          <n-button quaternary circle :type="element.fixed === 'right' ? 'primary' : undefined">
            <template #icon>
              <n-icon size="24" @click="fixed(element, 'right')"
                ><ChevronForwardCircleOutline
              /></n-icon>
            </template>
          </n-button>
        </li>
      </ul>
    </template>
  </Draggable>
</template>

<script setup lang="ts">
import { NButton, NSwitch, NIcon } from 'naive-ui'
import { computed } from 'vue'
import Draggable from 'vuedraggable'
import { Move, ChevronBackCircleOutline, ChevronForwardCircleOutline } from '@vicons/ionicons5'
import type { DataTableColumns } from 'naive-ui'
import type { Recordable } from './types'
import type { PropType } from 'vue'

const props = defineProps({
  columns: {
    type: Array as PropType<DataTableColumns>,
    default: () => []
  }
})

const emit = defineEmits(['update:columns'])

const columnsList = computed({
  get() {
    return props.columns.filter((item: any) => item.key !== 'operation')
  },
  set(value) {
    console.log('value: ', value)
    let arr: Recordable[] = value.concat(props.columns)
    arr.forEach((item: Recordable, index) => {
      for (let i = arr.length - 1; i > index; i--) {
        if (item.key === arr[i].key) {
          arr.splice(i, 1)
        }
      }
    })
    emit('update:columns', arr)
  }
})

// 固定列
function fixed(element, type) {
  element.fixed = element.fixed === type ? undefined : type
}
</script>

<style scoped>
ui,
li {
  list-style: none;
}
.header,
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  font-size: 1rem;
  border-bottom: 1px solid #e6e2e2;
}
.header {
  background-color: #fafafc;
  font-weight: 700;
}
.header li,
.list li {
  flex: 1;
  text-align: center;
}
</style>
