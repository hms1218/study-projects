<template>
    <div class="board-container">
        <h1>게시판</h1>

        <table class="board-table">
            <thead>
                <tr>
                    <td>번호</td>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>조회수</td>
                    <td>작성일</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(post,index) in posts" :key="index">
                    <td>{{ index+1 }}</td>
                    <td class="title">
                        <router-link :to="`/board/${post.id}`">{{ post.title }}</router-link>
                    </td>
                    <td>{{ post.author }}</td>
                    <td>{{ post.views }}</td>
                    <td>{{ post.date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    interface Post {
        id : number;
        title : string;
        author : string;
        views : number;
        date : string;
    }

    const posts = ref<Post[]>([
        {id: 1, title: "첫 번째 글입니다.", author: "홍길동", views: 13, date: "2025-09-08"},
        {id: 2, title: "두 번째 글입니다.", author: "김길동", views: 42, date: "2025-10-23"},
        {id: 3, title: "세 번째 글입니다.", author: "유지구", views: 30, date: "2025-09-28"},
    ])
</script>

<style scoped>
    .board-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .board-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .board-table th,
    .board-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
    }

    .board-table th {
        background-color: #f5f5f5;
    }

    .board-table .title {
        text-align: left;
    }
</style>