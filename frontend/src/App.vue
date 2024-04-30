<script setup>
import { RouterView } from "vue-router"
import Nav from "./components/Nav.vue";
import Comunicat from "@/components/Comunicat.vue"
import { ref } from "vue";
const severity = ref();
const message = ref();
const displayMessage = ref(false)
const handleSeverity = (value) => {
    severity.value = value
}

const handleMessage = (value) => {
    message.value = value
}

const setDisplayMessage = (value) => {
    displayMessage.value = value
}
</script>

<template>
    <Nav />
    <RouterView @set-severity-ref="handleSeverity" @set-display-message="setDisplayMessage"
        @set-message-ref="handleMessage">
    </RouterView>
    <Comunicat :severity="severity" :message="message" v-if="displayMessage" @set-display-message="setDisplayMessage">
    </Comunicat>
</template>
