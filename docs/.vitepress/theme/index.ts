import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Footer from './Footer.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(Footer),
    })
  },
}
