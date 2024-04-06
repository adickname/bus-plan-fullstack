<script setup>
import { defineModel } from "vue";
const loginModel = defineModel('login')
const passwordModel = defineModel('password')


async function updateData() {
    const login = loginModel.value
    const password = loginModel.value
    console.log(login, password)
    try {
        const res = await fetch(`http://localhost:5170/api/users/${login}`);
        if (!res.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await res.json()
        if (data.isFound === false) {
            if (login !== null && login !== undefined && password !== null && password !== undefined) {
                if (login.length >= 4 && password.length >= 4) {
                    try {
                        await fetch('http://localhost:5170/api/users/', {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({ login: login, password: password }),
                        })
                    } catch (error) {
                        console.log(error.message)
                    }

                } else {
                    console.log("za mało liter")
                }
            }
        }
        if (data.login) {
            console.log('użytkownik już jest')
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
        <input type="text" id="login" v-model="loginModel">
        <label for="password">Enter your password</label>
        <input type="password" id="password" v-model="passwordModel">
        <input type="reset" value="reset" @click="resetModalValues">
    </form>
    <button @click="updateData()">send</button>
</template>