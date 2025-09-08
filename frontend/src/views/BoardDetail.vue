<template>
    <div class="boardDetail-container">
        <h2>상세페이지</h2>
        <p>게시글 번호: {{ id }}</p>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const id = route.params.id;
</script>

<style scoped>
    .boardDetail-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>