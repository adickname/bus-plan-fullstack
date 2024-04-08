<script setup>
import { RouterLink, RouterView } from "vue-router"
</script>
<!-- <template>
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
</template> -->
<template>
    <v-card>
        <v-tabs v-model="tab" bg-color="primary">
            <router-link :to="{ name: 'home' }"><v-tab value="home">Home</v-tab></router-link>
            <router-link :to="{ name: 'login' }"><v-tab value="login">Login/Register</v-tab></router-link>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="home">
                    <router-view></router-view>
                </v-window-item>

                <v-window-item value="login">
                    <router-view></router-view>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        tab: null,
    }),
}
</script>