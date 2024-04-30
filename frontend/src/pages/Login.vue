<script setup>
import { defineModel, defineProps, defineEmits, ref } from "vue";
import { useAuth0 } from '@auth0/auth0-vue';
const emit = defineEmits(["setIsLoggedInParent", "setDisplayMessage", "setMessageRef", "setSeverityRef"]);
const props = defineProps(["onSubPage"]);
const form = ref();
const isLogged = ref();
const setPropertiesOfMessage = (message, severity) => {
    emit("setDisplayMessage", true)
    emit("setMessageRef", message)
    emit("setSeverityRef", severity)
};

const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

const logoutHandle = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
}
const code = user ? JSON.stringify(user.value, null, 2) : "";

const fetchData = async (url) => {
    const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify({ subAuth0: user.value?.sub }),
        headers: {
            "Content-type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data
};


const register = async () => {
    const isFound = await fetchData(`${import.meta.env.VITE_API_SERVER_URL}/api/users`)
    if (!isFound.isFound) {
        await fetchData(`${import.meta.env.VITE_API_SERVER_URL}/api/users/register`)
    }
}
if (isAuthenticated.value === true) {
    try {
        register()
    } catch (error) {
        console.log(error.message)
    }
}


</script>
<template>
    <v-form ref="form">
        <v-container>
            <v-row>
                <v-col>
                    <v-btn type="reset"> clear </v-btn>
                    <v-btn @click="register()" id="register"> Register </v-btn>
                    <v-btn @click="logoutHandle()" v-if="isAuthenticated" id="logOut"> log out </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
