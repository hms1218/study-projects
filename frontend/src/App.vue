<template>
    <Header />
    <router-view /> <!-- 현재 라우트(Home.vue 등)가 여기 표시됨 -->
    <Footer />
</template>

<script setup lang="ts">
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'
</script>

<style scoped>
    ss { 
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
</style>