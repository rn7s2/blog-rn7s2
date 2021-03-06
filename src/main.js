import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import marked from './mixins/marked-katex'
import datetime from './mixins/datetime'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import LoadingView from '@/components/LoadingView'

loadFonts()

createApp(App)
  .mixin(marked)
  .mixin(datetime)
  .use(router)
  .use(store)
  .use(vuetify)
  .component('loading-view', LoadingView)
  .mount('#app')
