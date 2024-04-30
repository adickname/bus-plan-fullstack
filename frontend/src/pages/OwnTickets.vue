<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import Login from "./Login.vue"
import Card from 'primevue/card'
import { ref } from "vue";
const ticketsRef = ref([])
const { user } = useAuth0()

const emit = defineEmits(["setDisplayMessage", "setMessageRef", "setSeverityRef"]);
const setPropertiesOfMessage = (message, severity) => {
    emit("setDisplayMessage", true)
    emit("setMessageRef", message)
    emit("setSeverityRef", severity)
};


const findTcikets = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/orders/find`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ owner: user.value.sub })
        }
        )
        const tickets = await res.json()
        ticketsRef.value = tickets
    }
    catch (error) {
        setPropertiesOfMessage(error.message, "error")
    }
}
findTcikets()
</script>
<template>
    <v-container>
        <p v-if="ticketsRef.length === 0">
            You have not any tickets
        </p>
        <div class="flex flex-wrap justify-center md:justify-between md:m-6 md:text-lg">
            <div class="m-4" v-for="ticket in ticketsRef">
                <Card class="ticket"
                    :pt="{ root: { class: 'p-2 px-4' }, body: { class: 'flex flex-col' }, caption: { class: 'flex justify-center' } }">
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
            </div>
        </div>
    </v-container>
</template>