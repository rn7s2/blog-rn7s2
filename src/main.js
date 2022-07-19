import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import marked from './mixins/marked'
import { provideFluentDesignSystem, fluentCard, fluentButton } from '@fluentui/web-components';

provideFluentDesignSystem().register(fluentCard(), fluentButton());

createApp(App).mixin(marked).use(store).use(router).mount('#app')
