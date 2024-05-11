<script setup>
import { RouterView } from "vue-router"
import Nav from "./components/Nav.vue";
import Comunicat from "@/components/Comunicat.vue"
import { useMessageStore } from "./store/messageStore";
const messageStore = useMessageStore()
const { getMessage, getSeverity, getShouldBeDisplayed, changeShouldBeDisplayed } = messageStore
const setDisplayMessage = () => {
    changeShouldBeDisplayed(false)
}
</script>

<template>
    <Nav />
    <RouterView>
    </RouterView>
    <Comunicat :severity="getSeverity" :message="getMessage" v-if="getShouldBeDisplayed"
        @handle-change-should-be-displayed="setDisplayMessage">
    </Comunicat>
</template>
