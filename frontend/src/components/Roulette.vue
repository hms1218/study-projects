<template>
    <div class="roulette-container">
        <h1>룰렛 이벤트</h1>
        <p>내 응모권 : {{ tickets }}장</p>

        <!-- 사용자 입력 영역 -->
        <div class="roulette-editor">
            <h3>룰렛 항목 추가/삭제</h3>
            <div v-for="(prize,index) in prizes" :key="index" class="prize-item">
                <input v-model="prize.name" placeholder="항목 입력" />
                <button @click="removePrize(index)">삭제</button>
                <button @click="increaseCount(index)">+</button>
                <button @click="decreaseCount(index)">-</button>
                <span>조각 수: {{ prize.count }}</span>
            </div>
            <button @click="addPrize">항목추가</button>
        </div>

        <div class="pointer">▼</div>
        <svg
            :width="size"
            :height="size"
            :view-box="`0 0 ${size} ${size}`"
            class="roulette"
            :style="{transform: `rotate(${currentRotation}deg)`}"
        >
            <g v-for="(prize, index) in rouletteSlices" :key="index">
                <path
                    :d="getSlicePath(index)"
                    :fill="index % 2 === 0 ? '#f9c74f' : '#90be6d'"
                    stroke="#fff"
                    stroke-width="2"
                />
                <text
                    :x="center"
                    :y="center"
                    :transform="getTextTransform(index)"
                    text-anchor="middle"
                    alignment-baseline="middle"
                    font-size="14"
                    fill="#000"
                >
                    {{ prize.name }}
                </text>
            </g>
        </svg>
        
        <button @click="spinRoulette" :disabled="isSpinning || tickets <= 0">돌리기</button>

        <!-- <p v-if="result" class="result">결과 : {{ result }}</p> -->
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';

    const tickets = ref(300);

    interface PrizeItem {
        name: string;
        count: number;
    }

    const prizes = ref<PrizeItem[]>([
        { name: "1등", count: 1 },
        { name: "2등", count: 1 },
        { name: "3등", count: 1 },
        { name: "꽝", count: 1 },
        { name: "쿠폰", count: 1 },
        { name: "보너스", count: 1 }
    ]);

    const size = 300; //SVG 크기
    const center = size / 2; //원 중심 좌표
    const radius = size / 2; //원 반지름

    const currentRotation = ref(0);
    const isSpinning = ref(false);
    const result = ref('');

    
    function addPrize() {
        prizes.value.push({name: "", count: 1}); // 새 항목 추가
    }

    function removePrize(index: number) {
        prizes.value.splice(index, 1);
    }

    
    function increaseCount(index: number) {
        prizes.value[index].count += 1;
    }

    function decreaseCount(index: number) {
        if (prizes.value[index].count > 1) prizes.value[index].count -= 1;
    }

    // 룰렛 조각 배열 생성 (count 수만큼 복제)
    console.log("prizes::",prizes.value.flatMap(p => Array(p.count).fill({name: p.name})))
    const rouletteSlices = computed(() => {
    return prizes.value.flatMap(p => 
        Array.from({length: p.count}, () => ({name: p.name}))
    );
});

    function getSlicePath(index: number) {
        const angle = 360 / rouletteSlices.value.length;
        const startAngle = index * angle;
        const endAngle = startAngle + angle;
        // console.log("startAngle::",startAngle)
        // console.log("currentRotation::",currentRotation.value)

        //각도를 라디안으로 변환
        //360˚ <-> 2π rad
        //rad = deg * (π / 180) : 각도 -> 라디안
        //deg = rad * (180 / π) : 라디안 -> 각도
        //라디안 사용 이유 : sin, cos 이 라디안 기준으로 되어있기 때문(Math.sin, Math.cos)
        //Math.PI === π
        const startRad = (Math.PI / 180) * startAngle;
        const endRad = (Math.PI / 180) * endAngle;

        //시작점, 끝점 좌표
        const x1 = center + radius * Math.cos(startRad);
        const y1 = center + radius * Math.sin(startRad);
        const x2 = center + radius * Math.cos(endRad);
        const y2 = center + radius * Math.sin(endRad);

        // console.log("(x1,y1)::",x1,y1)
        // console.log("(x2,y2)::",x2,y2)

        // large-arc-flag ( 180도 이상이면 1 )
        const largeArcFlag = angle > 180 ? 1 : 0;
        
        return `
            M ${center},${center}
            L ${x1},${y1}
            A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}
            Z
        `;

        // skewY(20deg) : 요소를 Y축 기준으로 20도 기울인다는 뜻
    }

    function getTextTransform(index: number) {
        const angle = 360 / rouletteSlices.value.length;
        const textAngle = index * angle + angle / 2; //조각의 중앙 각도
        const rad = (Math.PI / 180) * textAngle;

        const textRadius = radius * 0.65; //텍스트 위치 반지름
        const x = center + textRadius * Math.cos(rad);
        const y = center + textRadius * Math.sin(rad);

        // 글자를 항상 수평으로 표시
        return `rotate(${textAngle}, ${x}, ${y}) translate(${x - center}, ${y - center})`;
    }

    function spinRoulette() {
        if(tickets.value <= 0) return;

        tickets.value -= 1;
        isSpinning.value = true;
        result.value = "";

        const randomRotation = 360 * 10 + Math.floor(Math.random() * 360); // 10바퀴 + 랜덤

        currentRotation.value += randomRotation;

        // 회전 끝난 후 결과 계산
        setTimeout(() => {
            isSpinning.value = false;

            // 룰렛 회전 후 현재 각도 (0~360)
            const normalizedRotation = currentRotation.value % 360;
            console.log("현재각도:",normalizedRotation)

            // 각 조각의 각도
            const anglePerSlice = 360 / rouletteSlices.value.length;
            
            // 0도 기준으로 index 계산
            const indexRotation = normalizedRotation > 270 ? 360-normalizedRotation+270 : 270-normalizedRotation;
            console.log("도착 각도:", indexRotation)
            
            const index = Math.floor(indexRotation / anglePerSlice);
            
            result.value = rouletteSlices.value[index].name;

            alert(`🎉 결과 : ${result.value}`);
        }, 3000); // transition duration과 동일하게
    }
</script>

<style scoped>
    .roulette-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .roulette {
        transition: transform 3s ease-out;
        border-radius: 50%;
    }
    .spin-btn {
        margin-top: 20px;
        padding: 10px 20px;
        background: #f94144;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
</style>