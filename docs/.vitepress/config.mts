import { defineConfig } from 'vitepress'

import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [vueJsx()]
  },
  base: '/naive-ui-components/',
  lang: 'zh-CN',
  title: 'naive-ui-components',
  head: [['link', { rel: 'icon', href: '/naive-ui-components/logo.svg' }]],
  description: '基于naive-ui封装的一些组件',
  themeConfig: {
    logo: '/logo.svg',
    lastUpdated: {
      text: '上次更新',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: 'deep',
    aside: true,
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: '首页', link: '/' }],

    sidebar: [
      { text: 'naive-ui-form', link: '/naive-ui-form' },
      { text: 'naive-ui-upload', link: '/naive-ui-upload' },
      { text: 'naive-ui-editor', link: '/naive-ui-editor' },
      { text: 'naive-ui-table', link: '/naive-ui-table' },
      { text: 'naive-ui-editor-view', link: '/naive-ui-editor-view' },
      { text: '模板公共组件', items: [{ text: 'Buttons', link: '/Buttons' }] }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/ashuicoder/naive-ui-components' }]
  },
  markdown: {
    lineNumbers: true
  }
})
