<script setup>
import { RouterLink } from "vue-router"
</script>
<template>
    <nav>
        <ul>
            <router-link :to="{ name: 'home' }">
                <li>Home</li>
            </router-link>
            <router-link :to="{ name: 'schedule' }">
                <li>Schedules</li>
            </router-link>
            <router-link :to="{ name: 'find' }">
                <li>Find your bus</li>
            </router-link>
            <router-link :to="{ name: 'order' }">
                <li>Order a ticket</li>
            </router-link>
            <router-link :to="{ name: 'own-tickets' }">
                <li>Check own tickets</li>
            </router-link>
            <router-link :to="{ name: 'login' }">
                <li>Login</li>
            </router-link>
        </ul>
    </nav>
</template>