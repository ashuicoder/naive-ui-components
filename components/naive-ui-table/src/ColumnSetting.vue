<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <n-tooltip>
        <template #trigger>
          <n-button circle>
            <template #icon>
              <n-icon><SettingsOutline /></n-icon>
            </template>
          </n-button>
        </template>
        <span>列设置</span>
      </n-tooltip>
    </template>

    <VueDraggable v-model="columnsList" item-key="key" :animation="300">
      <div v-for="(item, index) in columnsList" :key="item.key || index" class="item">
        <n-icon size="18" class="item-icon"><Move /></n-icon>
        <n-checkbox v-model:checked="item._show">{{ item.title }}</n-checkbox>
      </div>
    </VueDraggable>
  </NPopover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NButton, NPopover, NIcon, NCheckbox, NTooltip } from 'naive-ui'
import { Move, SettingsOutline } from '@vicons/ionicons5'
import { VueDraggable } from 'vue-draggable-plus'
import type { PropType } from 'vue'
import type { Recordable } from './types'

const props = defineProps({
  columns: {
    type: Array as PropType<Recordable>,
    default: () => []
  }
})

const emit = defineEmits(['update:columns'])

const columnsList = computed({
  get() {
    return props.columns
  },
  set(value) {
    emit('update:columns', value)
  }
})
</script>

<style scoped>
.item {
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 4px;
}
.item:hover {
  background-color: #18a05833;
}
.item-icon {
  margin: 0 8px;
  cursor: move;
}
.item-title {
  margin-left: 8px;
}
</style>
