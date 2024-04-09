<script setup>
import { defineModel, ref } from "vue";
const emailModel = defineModel('email')
const passwordModel = defineModel('password')
const form = ref()
async function register() {
    const email = emailModel.value
    const password = passwordModel.value
    const res = await fetch(`http://localhost:5170/api/users/?email=${encodeURIComponent(email)}`, {
        headers: {
            "Content-type": "application/json"
        },
    })
    const data = await res.json()
    console.log(data)

    if (data.isFound) {
        console.log("found same login")
    } else {
        console.log("adding")
        try {
            await fetch('http://localhost:5170/api/users/register', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email: email, password: password }),
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    form._value.reset()
}

async function login() {
    const email = emailModel.value
    const password = passwordModel.value
    try {
        const res = await fetch(`http://localhost:5170/api/users/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password }),
        })
        const data = await res.json()
        if (data.isFound === true) {
            console.log('logged')
            sessionStorage.setItem("logged", true);
        } else {
            console.log('inwalid data')
        }
    }
    catch (error) {
        console.log('error ', error.message)
    }
    form._value.reset()
}

function resetModalValues() {
    email.value = null
    password.value = null
}

</script>
<template>
    <v-form ref="form">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="emailModel" label="E-mail" hide-details required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field type="password" v-model="passwordModel" :counter="10" label="Password" hide-details
                        required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn type="reset">
                        clear
                    </v-btn>
                    <v-btn @click="register()">
                        Register
                    </v-btn>
                    <v-btn @click="login()">
                        log in
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
