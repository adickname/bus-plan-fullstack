<script setup>
import { defineModel, defineProps, defineEmits, ref } from "vue";
import { useAuth0 } from '@auth0/auth0-vue';
import { login as loginAuth } from "@/functions/auth0/login";
const { loginWithRedirect, loginWithPopup } = useAuth0();
const emit = defineEmits(['setIsLoggedInParent'])
const props = defineProps(['onSubPage'])
const emailModel = defineModel("email");
const passwordModel = defineModel("password");
const form = ref();
const isLogged = ref()

async function register() {
    const email = emailModel.value;
    const password = passwordModel.value;
    const res = await fetch(
        `http://localhost:5170/api/users/?email=${encodeURIComponent(email)}`,
        {
            headers: {
                "Content-type": "application/json",
            },
        }
    );
    const data = await res.json();
    console.log(data);

    if (data.isFound) {
        console.log("found same login");
    } else {
        console.log("adding");
        try {
            await fetch("http://localhost:5170/api/users/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    form._value.reset();
}

function initIsLogged() {
    if (sessionStorage.getItem("logged")) {
        isLogged.value = true
    } else {
        isLogged.value = false
    }
}

initIsLogged()

function logout() {
    sessionStorage.removeItem("logged")
    sessionStorage.removeItem("id")
    isLogged.value = false
}

async function login() {
    if (!sessionStorage.getItem("logged")) {
        const email = emailModel.value;
        const password = passwordModel.value;
        try {
            const res = await fetch(`http://localhost:5170/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await res.json();
            console.log(data)
            if (data.isFound === true) {
                console.log("logged");
                sessionStorage.setItem("logged", true);
                isLogged.value = true
                sessionStorage.setItem("id", data.userId)
                if (props.onSubPage) {
                    emit('setIsLoggedInParent')
                }
            } else {
                console.log("inwalid data");
            }
        } catch (error) {
            console.log("error ", error.message);
        }
        form._value.reset();
    } else {
        console.log("you are already logged");
    }
    form._value.reset();
}

/* const login = () => {
    loginWithRedirect()
} */
</script>
<template>
    <v-form ref="form">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="emailModel" label="E-mail" hide-details required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field type="password" v-model="passwordModel" label="Password" hide-details
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
                    <v-btn @click="login()" v-if="!isLogged">
                        log in
                    </v-btn>
                    <v-btn @click=" logout()" v-else>
                        log out
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>

</template>
