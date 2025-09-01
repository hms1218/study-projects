<template>
    <div class="event-container">
        <h1>이벤트 페이지</h1>
        <Roulette />
        <p>현재 보유 응모권 : {{ tickets }}장</p>

        <div class="event-list">
            <div class="event-card" v-for="event in events" :key="event.id">
                <h2>{{ event.title }}</h2>
                <p>{{ event.description }}</p>
                <button
                    :disabled="tickets <= 0"
                    @click="participate(event.id)"
                >참여하기</button>
            </div>
        </div>

        <!-- 결과 표시 -->
        <div v-if="result" class="result-box">
            <h3>결과: {{ result }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import Roulette from '../components/Roulette.vue';

    interface EventItem {
        id: number;
        title: string;
        description: string;
    }

    const tickets = ref(3); // 초기 응모권 수 (나중에 투표랑 연동)
    const result = ref('');

    const events = ref<EventItem[]>([
        { id: 1, title: "룰렛 이벤트", description: "응모권을 사용해 룰렛을 돌려보세요!"},
        { id: 2, title: "제비뽑기 이벤트", description: "랜덤으로 당첨 여부가 결정됩니다!"}
    ])

    function participate(eventId: number){
        if(tickets.value <= 0) return;

        tickets.value -= 1; //응모권 차감

        // Math.random() : 0이상 1미만 범위
        if(eventId === 1) {
            //룰렛 이벤트 (임시 랜덤 처리)
            result.value = Math.random() < 0.5 ? "축하합니다! 당첨입니다!" : "꽝!";
        } else if(eventId === 2) {
            //제비뽑기 이벤트 (임시 랜덤 처리)
            const pick = ["1등 당첨!", "2등 당첨!", "꽝!"];
            result.value = pick[Math.floor(Math.random() * pick.length)]; //0이상 1 * length 미만
        }
    }
</script>

<style scoped>
    .event-container {
        padding: 2rem;
        font-family: Arial, sans-serif;
    }
    .event-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .event-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
    }
    .result-box {
        margin-top: 2rem;
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>