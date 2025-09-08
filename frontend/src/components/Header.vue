<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/polls">Polls</router-link></li>
            <li><router-link to="/events">Events</router-link></li>
            <li><router-link to="/board">Board</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="signup">Signup</router-link></li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
    
</script>

<style scoped>
    nav {
        background: #333;
        padding: 10px;
        position: fixed;   /* 화면 고정 */
        top: 0;            /* 상단 */
        left: 0;
        width: 100%;
        z-index: 100;      /* 다른 요소 위로 */
    }

    nav ul {
        list-style: none;
        display: flex;
        margin: 0;
        padding: 0;
    }

    nav ul li {
        margin-right: 15px;
    }

    nav ul li a {
        color: white;
        text-decoration: none;
    }
</style>