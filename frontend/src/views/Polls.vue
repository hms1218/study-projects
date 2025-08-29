<!-- <template> : Vue에서 화면에 표시될 HTML 구조를 정의합니다. -->
<template>
    <div class="polls-container">
        <h1>투표목록</h1>
        <p>진행 중인 투표를 확인하고 참여하세요.</p>

        <!-- 새로운 투표 만들기 버튼 -->
        <button class="create-btn" @click="showCreateForm = true">새 투표 만들기</button>

        <!-- 새로운 투표 입력 폼 -->
        <div v-if="showCreateForm" class="create-form">
            <input v-model="newTitle" placeholder="투표 제목" />
            <input v-model="newOptions" placeholder="선택지 (콤마로 구분)" />
            <input v-model="newEndTime" type="datetime-local" /> <!-- 종료시간 입력 -->
            <button @click="addPoll">추가</button>
            <button @click="showCreateForm = false">취소</button>
        </div>

        <div class="poll-list">
            <div class="poll-card" v-for="poll in polls" :key="poll.id">
                <!-- v-for="poll in polls" : Vue에서 반복 렌더링을 할 때 사용하는 디렉티브입니다.
                    polls 배열을 반복하며 각 요소를 poll로 참조 -->
                <!-- 의미: polls 배열 안의 각각의 항목(poll)에 대해 <div class="poll-card">를 반복해서 생성합니다.
                    예를 들어 polls가 3개면, 이 <div>도 3개 만들어집니다. -->
                <h2>{{ poll.title }}</h2>
                <p>상태: {{ poll.status }}</p>
                <p>참여인원: {{ poll.votes.length }}명</p>

                <!-- 실시간 남은 시간 표시 -->
                <p v-if="poll.status === '진행 중'">
                    남은 시간 : {{ getRemainingTime(poll.endTime!) }}
                </p>
                <p v-else>투표 종료</p>

                <div class="options">
                    <button v-for="option in poll.options" :key="option" @click="vote(poll.id, option)">
                        {{ option }} ({{ poll.voteCounts[option] || 0 }}표)
                    </button>
                </div>
                <!-- Vue의 Mustache 문법을 사용해서 JS 변수 내용을 화면에 출력합니다. -->
                <!-- <button class="poll-button">참여하기</button> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'; // Vue의 reactive 변수를 만들기 위한 함수 ref를 가져옵니다.

    // Reactive(반응형) 이란?
    // Vue에서는 데이터가 변하면 자동으로 화면(UI)에 반영되는 구조를 만들 수 있어요.
    // ref()로 만든 변수는 reactive 상태가 됩니다.
    // 화면에서 {{ count }}를 사용하면, count.value가 바뀔 때 자동으로 업데이트돼요.

    interface Poll  {
        id: number;
        title: string;
        status: string; // '진행 중' | '종료'
        options: string[];
        votes: string[]; //참여한 사용자 이름
        voteCounts: Record<string, number>; //선택지별 투표 수
        endTime?: Date; //종료 시간
    } // TypeScript 객체 구조 정의

    // <Poll[]> : Poll 객체가 들어있는 배열 -> ts를 사용하기 때문에
    const polls = ref<Poll[]>([
        { id: 1, title: '좋아하는 과일', status: '진행 중', options: ['사과','바나나','포도'], votes: [], voteCounts: {}, endTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 2) },
        { id: 2, title: '이번 주 이벤트', status: '진행 중', options: ['참석','불참'], votes: [], voteCounts: {}, endTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 1) },
    ]);

    // 새 투표 폼 상태
    const showCreateForm = ref(false);
    const newTitle = ref('');
    const newOptions = ref('');
    const newEndTime = ref('');

    //현재 시간 reactive
    const now = ref(new Date());
    //1초마다 시간 갱신
    let interval: number;
    onMounted(() => {
        interval = window.setInterval(() => {
            now.value = new Date();
            //투표 상태 갱신
            polls.value.forEach(p => {
                if(p.endTime && now.value >= p.endTime) {
                    p.status = "종료";
                }
            })
        }, 1000);
    })

    onUnmounted(() => clearInterval(interval));

    function addPoll() {
        if(!newTitle.value || !newOptions.value) return;

        const optionsArray = newOptions.value.split(',').map(opt => opt.trim());
        polls.value.push({
            id: polls.value.length + 1,
            title: newTitle.value,
            status: "진행 중",
            options: optionsArray,
            votes: [],
            voteCounts: {},
            endTime: new Date(newEndTime.value),
        });
        newTitle.value = '';
        newOptions.value = '';
        showCreateForm.value = false;
    }

    function vote(pollId: number, option: string) {
        const poll = polls.value.find(p => p.id === pollId);
        if(!poll) return;
        //참여자 이름은 'User1' 으로 고정
        poll.votes.push('User1');
        poll.voteCounts[option] = (poll.voteCounts[option] || 0) + 1;
    }

    function getRemainingTime(endTime: Date) {
        if (!endTime) return '종료'; // endTime이 없으면 종료로 처리

        const diff = endTime.getTime() - now.value.getTime();
        if(diff <= 0) return '종료';
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return `${hours}시간 ${minutes}분 ${seconds}초 남음`;
    }

    // 배열에 항목 추가 (사용자가 추가할 수 있는 기능 -> push)
    //polls.value.push({ id: 3, title: '이번 주 이벤트', status: '진행 중' });
</script>

<style scoped>
    .polls-container {
        padding: 2rem;
        font-family: Arial, sans-serif;
    }

    .create-btn {
        background: #4a90e2;
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        cursor: pointer;
        border-radius: 5px;
    }

    .create-form {
        margin-bottom: 1.5rem;
    }

    .create-form input {
        margin-right: 0.5rem;
        padding: 0.3rem 0.5rem;
    }

    .create-form button {
        margin-right: 0.5rem;
        padding: 0.3rem 0.7rem;
    }

    .poll-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .poll-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
    }

    .options button {
        margin-right: 0.5rem;
        margin-top: 0.3rem;
        padding: 0.4rem 0.8rem;
        cursor: pointer;
    }
</style>