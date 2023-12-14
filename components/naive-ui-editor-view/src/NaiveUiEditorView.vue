<template>
  <div class="editor-content-view" v-clean-html="value"></div>
</template>

<script lang="ts" setup>
import { buildVueDompurifyHTMLDirective } from 'vue-dompurify-html'

import './styles/index.css'
import type { Props } from './types'

const vCleanHtml = buildVueDompurifyHTMLDirective()
const props = defineProps<Props>()
</script>
