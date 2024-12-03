import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

createApp(App).use(router).mount('#app')
