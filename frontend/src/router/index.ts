import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Polls from '../views/Polls.vue';
import Events from '../views/Events.vue';
import Board from '../views/Board.vue';
import BoardDetail from '../views/BoardDetail.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

const routes = [
    { path : "/", component: Home },
    { path: '/polls', component: Polls },
    { path: '/events', component: Events },
    { path: '/board', component: Board },
    { path: '/board/:id', component: BoardDetail, props: true},
    { path: '/login', component: Login },
    { path: '/signup', component: Signup},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

// createWebHistory() – HTML5 History API 사용
//     브라우저 주소창 URL이 깔끔함 (/home, /about)
//     pushState와 popState를 사용해서 페이지를 새로고침 없이 이동
//     서버 설정 필요: 새로고침(F5)할 때 404가 안 나도록 서버에서 모든 URL을 index.html로 라우팅

// history는 내부적으로만 사용됨
//     Vue Router가 URL 변화를 감지하고 관리할 때 내부적으로 쓰는 객체예요.
//     컴포넌트에서는 신경 쓰지 않아도 됩니다.
// 컴포넌트에서 URL/라우터 접근 방법
//     실제로는 <router-view />가 이 history를 통해 현재 경로를 감지하고 적절한 컴포넌트를 렌더링