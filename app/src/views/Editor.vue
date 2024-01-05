<template>
  <NaiveUiEditor v-model:value="content"></NaiveUiEditor>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NaiveUiEditor } from 'naive-ui-editor'

const content = ref<string | null>(null)

watch(content, () => {
  console.log(content.value)
})
</script>

<style scoped></style>
