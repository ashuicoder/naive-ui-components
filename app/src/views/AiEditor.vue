<template>
  <NaiveUiAiEditor
    v-model:value="value"
    style="height: 600px"
    :hide-toolbar-keys="['ai']"
  ></NaiveUiAiEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NaiveUiAiEditor } from 'naive-ui-ai-editor'
import 'naive-ui-ai-editor/dist/style.css'

const value = ref('')
</script>

<style scoped></style>
