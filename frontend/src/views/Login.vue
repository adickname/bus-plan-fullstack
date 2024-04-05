<script setup>
import Nav from "../components/Nav.vue"
import { defineModel, normalizeStyle } from "vue";
const login = defineModel('login')
const password = defineModel('password')

async function consoleData() {
    const data = await getData()
    console.log(data)
}
async function updateData(login, password) {
    try {
        const res = await fetch(`/api/user/:${login}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log(res)
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}
function resetModalValues() {
    login.value = null
    password.value = null
}

</script>
<template>
    <Nav></Nav>
    <form>
        <label for="login">Enter your login</label>
        <input type="text" id="login" v-model="login">
        <label for="password">Enter your password</label>
        <input type="password" id="password" v-model="password">
        <input type="reset" value="reset" @click="resetModalValues">
    </form>
    <button @click="updateData(login, password)">send</button>
    {{ login }}
    {{ password }}
</template>