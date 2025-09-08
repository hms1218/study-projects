<template>
    <div class="login-container">
        <h1>로그인</h1>
        <form @submit.prevent="handleLogin">
            <input type="text" placeholder="Username" v-model="username" />
            <input type="password" placeholder="Password" v-model="password" />
            <button type="submit">Login</button>            
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    //useRouter : 라우터를 제어(조작)하기 위해 사용 -> 주로 프로그래밍 방식으로 페이지 이동할 때 사용
    //useRoute : 현재 라우트(route) 정보를 가져오기 위해 사용 
    // -> 주로 현재 URL이 어떤지 확인하거나, 동적 세그먼트(id)나 쿼리 값을 가져올 때 사용

    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = () => {
        if(!username.value || !password.value){
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        //실제 api 호출 필요
        console.log("로그인 시도: ", {username: username.value, password: password.value});

        //로그인 성공 시 이동
        alert("로그인 성공!");
        router.push('/');
    }
</script>

<style scoped>
    .login-container {
        max-width: 400px;
        margin: 100px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .login-container h1 {
        margin-bottom: 20px;
    }

    .login-container input {
        display: block;
        width: 94%;
        margin-bottom: 15px;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .login-container button {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    .login-container button:hover {
        background-color: #0056b3;
    }
</style>