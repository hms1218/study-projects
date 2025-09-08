<template>
    <div class="signup-container">
        <h1>회원가입</h1>
        <form @submit.prevent="">
            <input type="text" placeholder="아이디를 입력해주세요." />
            <input type="text" placeholder="닉네임을 입력해주세요." />
            <input type="password" placeholder="비밀번호를 입력해주세요." />
        </form>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .signup-container {
        max-width: 400px;
        margin: 100px auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .signup-container h1 {
        margin-bottom: 20px;
    }

    .signup-container input {
        display: block;
        width: 94%;
        margin-bottom: 15px;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .signup-container button {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    .signup-container button:hover {
        background-color: #0056b3;
    }
</style>