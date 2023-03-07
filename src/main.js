import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routers';
import { createPinia } from 'pinia/dist/pinia';
import { createI18n } from 'vue-i18n';
import lange from './lang';
const i18n = createI18n({
    messages: lange,
    legacy: false,
    locale: localStorage.lang || 'en',
});

global.Buffer = global.Buffer || require('buffer').Buffer
import './assets/css/tailwind_dist.css';
import './assets/fonts/font.css';
import './assets/css/myCss.css';
import 'tw-elements';

const app = createApp(App);
app.use(createPinia());

app.use(i18n).use(router).mount('#app');
