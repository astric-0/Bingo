import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { createApp } from 'vue'

import VueSweetAlert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import router from './router'
import App from './App.vue'

createApp(App).use(router).use(VueSweetAlert2).mount('#app')