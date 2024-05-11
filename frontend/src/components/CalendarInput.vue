<script setup>
import Calendar from 'primevue/calendar';
import { watch, ref } from 'vue';
import { useOrderStore } from '@/store/orderStore';
const orderStore = useOrderStore()
const { getTypeTicket, changeDateOfIssue } = orderStore
const dateOfIssue = defineModel("dateOfIssue")
watch(dateOfIssue, (newValue) => {
    changeDateOfIssue(newValue)
})
</script>

<template>
    <template v-if="getTypeTicket">
        <v-col cols="12" md="4">
            <p>Begin:</p>
            <template v-if="getTypeTicket === 'day'">
                <Calendar v-model="dateOfIssue" :pt="{ root: { class: 'border-2 border-white' } }" showIcon
                    :showOnFocus="false" date-format="mm/dd/yy" />
            </template>
            <template v-if="getTypeTicket === 'month'">
                <Calendar v-model="dateOfIssue" :pt="{ root: { class: 'border-2 border-white' } }" showIcon
                    :showOnFocus="false" view="month" date-format="mm/yy" />
            </template>
        </v-col>
    </template>
</template>
