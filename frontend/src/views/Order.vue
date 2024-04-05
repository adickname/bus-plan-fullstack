<script setup>
import Nav from "../components/Nav.vue"
import { ref, defineModel } from "vue";
const name = defineModel('name')
const surname = defineModel('surname')
const email = defineModel('email')
const end = defineModel('end ')
const id = defineModel('id')
const start = defineModel('start')
</script>
<template>
    <Nav></Nav>
    <form>
        <input type="text" v-model="name">
        <input type="text" v-model="surname">
        <input type="email" v-model="email">
        <select v-model="start">
            <option value="Kraków">Kraków</option>
            <option value="Warszawa">Warszawa</option>
            <option value="Wrocław">Wrocław</option>
        </select>
        <select v-model="end">
            <option value="Kraków">Kraków</option>
            <option value="Wrocław">Wrocław</option>
            <option value="Warszawa">Warszawa</option>
        </select>
        <input type="number" v-model="id">
        <input type="submit">
    </form>
    <p>{{ name }}</p>
    <p>{{ surname }}</p>
    <p>{{ email }}</p>
    <p>{{ start }}</p>
    <p>{{ end }}</p>
    <p>{{ id }}</p>
</template>