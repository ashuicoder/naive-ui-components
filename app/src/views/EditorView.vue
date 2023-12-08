<template>
  <NaiveUiEditorView :value="content"></NaiveUiEditorView>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NaiveUiEditorView } from 'naive-ui-editor-view'

const content = ref<string | null>('<h2 style="text-align: center;">富文本示例</h2><p> &nbsp; &nbsp; &nbsp; 这是富文本示例，这是富文本示例示例😁😀</p><p> &nbsp; &nbsp; &nbsp; 这是富文本示例，这是富文本示例示例😁😀</p><p> &nbsp; &nbsp; &nbsp;<img src="https://picsum.photos/200/300" alt="" data-href="" style=""/></p><p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容，内容内容，内容内容，内容内容，内容内容内容内容内容内容内容内容内容内容。内容内容内容内容内容内容。</p>')
</script>

<style scoped></style>
