<script setup>
import { defineModel, defineProps, defineEmits, ref } from "vue";
const emit = defineEmits(["setIsLoggedInParent", "setDisplayMessage", "setMessageRef", "setSeverityRef"]);
const props = defineProps(["onSubPage"]);
const emailModel = defineModel("email");
const passwordModel = defineModel("password");
const form = ref();
const isLogged = ref();
const setPropertiesOfMessage = (message, severity) => {
    emit("setDisplayMessage", true)
    emit("setMessageRef", message)
    emit("setSeverityRef", severity)
};
const register = async () => {
    const email = emailModel.value;
    const password = passwordModel.value;
    const res = await fetch(`${import.meta.env.VITE_SERVER}/api/users`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email }),
    });
    const data = await res.json();
    if (data.isFound) {
        setPropertiesOfMessage("found same login", "info");
    } else {
        setPropertiesOfMessage("adding", "info");
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await res.json();
            setPropertiesOfMessage(data.message, "info");
        } catch (error) {
            setPropertiesOfMessage(data.message, "error");
        }
    }
    form._value.reset();
};

const initIsLogged = () => {
    if (sessionStorage.getItem("logged")) {
        isLogged.value = true;
    } else {
        isLogged.value = false;
    }
};

initIsLogged();

const logout = () => {
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("id");
    isLogged.value = false;
    setPropertiesOfMessage("you are logged out", "info");
};

const login = async () => {
    if (!sessionStorage.getItem("logged")) {
        const email = emailModel.value;
        const password = passwordModel.value;
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await res.json();
            if (data.isFound === true) {
                setPropertiesOfMessage("you are logged in", "info");
                sessionStorage.setItem("logged", true);
                isLogged.value = true;
                sessionStorage.setItem("id", data.userId);
                if (props.onSubPage) {
                    emit("setIsLoggedInParent");
                }
            } else {
                setPropertiesOfMessage("inwalid data", "error");
            }
        } catch (error) {
            setPropertiesOfMessage("inwalid data", "error");
        }
    } else {
        setPropertiesOfMessage("you are already logged in", "info");
    }
    form._value.reset();
};
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
                    <v-btn type="reset"> clear </v-btn>
                    <v-btn @click="register()" id="register"> Register </v-btn>
                    <v-btn @click="login()" v-if="!isLogged" id="logIn"> log in </v-btn>
                    <v-btn @click="logout()" v-else id="logOut"> log out </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
