<template>
  <NaiveUiAiEditor
    v-model:value="value"
    style="height: 600px"
    :hide-toolbar-keys="['ai']"
  ></NaiveUiAiEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped></style>
