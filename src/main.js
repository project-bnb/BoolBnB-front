import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.101:9000/';
axios.defaults.withCredentials = true;

createApp(App).use(router).mount('#app')
