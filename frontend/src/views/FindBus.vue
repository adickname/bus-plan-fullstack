<script setup>
import Nav from "../components/Nav.vue"
import { defineModel } from "vue";
const end = defineModel('end')
</script>
<template>
    <Nav></Nav>
    <form>
        <label for="end">Enter name of place where you want to travel</label>
        <input type="text" id="end" v-model="end">
    </form>
    {{ end }}
</template>