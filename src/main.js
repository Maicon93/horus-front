import './assets/main.css'
import axios from './plugins/axios'
import vuetify from './plugins/vuetify'
import toast from './plugins/toast'
import functions from './plugins/functions';
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import registerGlobalComponents from './plugins/registerGlobalComponents';
import 'leaflet/dist/leaflet.css';

const app = createApp(App)

registerGlobalComponents(app);

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(axios)
app.use(toast)
app.use(functions)

app.mount('#app')
