import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [vueJsx()]
  },
  title: 'naive-ui-components',
  description: '基于naive-ui封装的一些组件',

  themeConfig: {
    outline: 'deep',
    aside: true,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      { text: 'naive-ui-form', link: '/naive-ui-form' },
      { text: 'Markdown Examples', link: '/markdown-examples' },
      { text: 'Runtime API Examples', link: '/api-examples' }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
