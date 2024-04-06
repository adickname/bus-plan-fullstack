<script setup>
import { defineModel } from "vue";
const login = defineModel('login')
const password = defineModel('password')


async function updateData(login, password) {
    try {
        const res = await fetch(`http://localhost:5137/api/users/${login}`);
        if (!res.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await res.json()
        if (data.isFound === false) {
            if (login !== null && login !== undefined && password !== null && password !== undefined) {
                if (login.length >= 4 && password.length >= 4) {
                    fetch('http://localhost:5137/api/users/'), {
                        method: "POST",
                        body: JSON.stringify({ login: login, password: password }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    }
                } else {
                    console.log("za mało liter")
                }
            }
        }
        if (data.login) {

        }
        console.log(await data)
    }
    catch (error) {
        console.log('error ', error.message)
    }
    resetModalValues
}

function resetModalValues() {
    login.value = null
    password.value = null
}

</script>
<template>
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