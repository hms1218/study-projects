<template>
    <div class="roulette-container">
        <h1>룰렛 이벤트</h1>
        <p>내 응모권 : {{ tickets }}장</p>

        <div class="roulette-wrapper">
            <div
                class="roulette"
                :style="{ transform: 'rotate(' + currentRotation + 'deg)' }"
            >
                <div v-for="(prize, index) in prizes" :key="index" class="slice" :style="getSliceStyle(index)">
                    {{ prize }}
                </div>
            </div>
            <div class="pointer">▼</div>
        </div>

        <button @click="spinRoulette" :disabled="isSpinning || tickets <= 0">돌리기</button>

        <p v-if="result" class="result">결과 : {{ result }}</p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const tickets = ref(3);
    const prizes = ["1등", "2등", "3등", "꽝", "쿠폰", "보너스"];

    const currentRotation = ref(0);
    const isSpinning = ref(false);
    const result = ref('');

    function getSliceStyle(index: number) {
        const angle = 360 / prizes.length;
        console.log("앵글::", angle)
        console.log("index::", index)
        console.log("index*angle::",index*angle)
        
        return {
            transform: `rotate(${index * angle}deg) skewY(-${90 - angle}deg)`,
        }
        // skewY(20deg) : 요소를 Y축 기준으로 20도 기울인다는 뜻
    }

    function spinRoulette() {
        if(tickets.value <= 0) return;

        tickets.value -= 1;
        isSpinning.value = true;
        result.value = "";

        const anglePerSlice = 360 / prizes.length;
        const randomIndex = Math.floor(Math.random() * prizes.length);

        //여러 바퀴 돌고 멈추도록 (최소 3바퀴 + 랜덤 인덱스 위치)
        const targetRotation = currentRotation.value + 360 * 3 + (360 - randomIndex * anglePerSlice - anglePerSlice / 2);

        currentRotation.value = targetRotation;

        //애니메이션이 끝난 후 결과 표시
        setTimeout(() => {
            result.value = prizes[randomIndex];
            isSpinning.value = false;
        }, 4000); // CSS transition 시간과 맞추기
    }
</script>

<style scoped>
    .roulette-container {
        text-align: center;
        font-family: Arial, sans-serif;
    }
    .roulette-wrapper {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 2rem auto;
    }
    .roulette {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 5px solid #333;
        position: relative;
        transition: transform 4s cubic-bezier(0.33, 1, 0.68, 1);
        overflow: hidden;
    }
    .slice {
        position: absolute;
        width: 50%;
        height: 50%;
        top: 50%;
        left: 50%;
        transform-origin: 0% 0%;
        background: #f9c74f;
        border: 1px solid #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .slice:nth-child(even) {
        background: #90be6d;
    }
    .pointer {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2rem;
        color: red;
    }
    button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
    .result {
        margin-top: 1rem;
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>