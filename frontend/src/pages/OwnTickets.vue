<script setup>
import Login from "./Login.vue"
import Card from 'primevue/card'
import { ref } from "vue";
const isLogged = ref(false)
const ticketsRef = ref([])
const findTcikets = async () => {
    try {
        const res = await fetch('http://localhost:5170/api/orders/find', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ owner: sessionStorage.getItem("id") })
        }
        )
        const tickets = await res.json()
        ticketsRef.value = tickets
    }
    catch (error) {
        console.log(error.message)
    }
}
const setIsLogged = () => {
    if (sessionStorage.getItem("logged")) {
        isLogged.value = true
        findTcikets()
    }
}
setIsLogged()
</script>
<template>
    <v-container v-if="!isLogged">
        <p>You must be logged to use this subpage</p>
        <Login onSubPage="true" @set-is-logged-in-parent="setIsLogged"></Login>
    </v-container>
    <v-container v-else>
        <p v-if="ticketsRef.length === 0">
            You have not any tickets
        </p>
        <v-row>
            <v-col cols="12" md="4" v-for="ticket in ticketsRef">
                <Card>
                    <template #title>{{ ticket.company }}</template>
                    <template #content>
                        <p>
                            name:{{ ticket.name }}
                        </p>
                        <p>
                            surname:{{ ticket.surname }}
                        </p>
                        <p>
                            start:{{ ticket.start }}
                        </p>
                        <p>
                            pirce:{{ ticket.fakePrice }}
                        </p>
                        <p>end:{{ ticket.end }}</p>
                        <p>date of isuue: {{ ticket.dateOfIssue }}</p>
                        <p>date of expiry: {{ ticket.dateOfExpiry }}</p>
                        <p v-if="ticket.oneWay">one way</p>
                        <p v-else>two ways</p>
                    </template>
                </Card>
            </v-col>
        </v-row>
    </v-container>
</template>