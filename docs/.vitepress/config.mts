import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [vueJsx()]
  },
  lang: 'zh-CN',
  title: 'naive-ui-components',
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  description: '基于naive-ui封装的一些组件',
  themeConfig: {
    logo: '/logo.svg',
    lastUpdated: {
      text: '上次更新'
    },
    aside: true,
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: '首页', link: '/' }],

    sidebar: [{ text: 'naive-ui-form', link: '/naive-ui-form' }],

    socialLinks: [{ icon: 'github', link: 'https://github.com/ashuicoder/naive-ui-components' }]
  }
})
