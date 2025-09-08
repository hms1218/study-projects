<template>
    <div class="signup-container">
        <h1>회원가입</h1>
        <form @submit.prevent="handleSignup">
            <input type="text" placeholder="아이디를 입력해주세요." v-model="userId"/>
            <input type="text" placeholder="닉네임을 입력해주세요." v-model="nickName"/>
            <input type="password" placeholder="비밀번호를 입력해주세요." v-model="password"/>
            <input type="passwordConfirm" placeholder="비밀번호를 재입력해주세요." v-model="passwordConfirm"/>
            <input type="email" placeholder="이메일을 입력해주세요." v-model="email"/>
            <button type="submit">회원가입</button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const userId = ref("");
    const nickName = ref("");
    const password = ref("");
    const passwordConfirm = ref("");
    const email = ref("");

    const router = useRouter();

    //이메일 체크
    const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

    const handleSignup = () => {
        //필수 입력 체크
        if(!userId.value || !nickName.value || !password.value || !passwordConfirm.value || !email.value){
            alert("모든 입력사항을 입력해주세요.");
            return;
        }

        //비밀번호 확인
        if(password.value !== passwordConfirm.value){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if(!isValidEmail(email.value)){
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }

        //api 연동 필요. 정상 처리시
        console.log("회원가입 완료. 정보 : ", {
            userId: userId.value,
            nickName: nickName.value,
            password: password.value,
            email: email.value,
        })

        alert("회원가입이 완료되었습니다.");
        router.push("/login");
    }
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