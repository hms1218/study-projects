<template>
    <div class="home-container">
        <div class="home-card">
            <h1>투표 · 이벤트 · 게시판 플랫폼</h1>
            <p>메뉴를 선택해 기능을 시작하세요.</p>

            <div class="menu-buttons">
                <router-link to="/polls" class="menu-button">투표</router-link>
                <router-link to="/events" class="menu-button">이벤트</router-link>
                <router-link to="/board" class="menu-button">게시판</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
</script>

<style scoped>
    .home-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    }

    .home-card {
        background-color: #fff;
        padding: 3rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        text-align: center;
        max-width: 500px;
        width: 90%;
    }

    h1 {
        margin-bottom: 1rem;
        font-size: 1.8rem;
        color: #333;
    }

    p {
        margin-bottom: 2rem;
        color: #666;
    }

    .menu-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .menu-button {
        background: #4a90e2;
        color: #fff;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        transition: 0.2s ease;
        text-decoration: none;
    }

    .menu-btn:hover {
        background: #357ab7;
    }
</style>