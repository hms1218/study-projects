import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app');

// 1. App.vue를 루트 컴포넌트로 하는 Vue 앱 인스턴스를 생성
// 2. router를 설치(use)하여 라우터 기능을 앱 전체에 적용
// 3. index.html 안의 <div id="app">에 Vue 앱을 마운트