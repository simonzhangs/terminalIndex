import { createApp } from 'vue'
import App from './App.vue'
import router from './configs/routes'

const app =createApp(App);

// 路由
app.use(router)

app.mount('#app')
