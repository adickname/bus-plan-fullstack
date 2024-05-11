<script setup>
import { useOrderStore } from '@/store/orderStore';
import { watch } from 'vue';
const orderStore = useOrderStore()
const { changeName, changeSurname, changeAge } = orderStore
const name = defineModel('name')
const surname = defineModel('surname')
const age = defineModel('age')

watch(name, (newValue) => {
    changeName(newValue)
})

watch(surname, (newValue) => {
    changeSurname(newValue)
})

watch(age, (newValue) => {
    changeAge(newValue)
})

</script>

<template>
    <v-col cols="12" md="4">
        <v-text-field v-model="name" label="Imie" hide-details required></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
        <v-text-field v-model="surname" label="Nazwisko" hide-details required></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
        <v-text-field v-model="age" label="Wiek" hide-details required></v-text-field>
    </v-col>
</template>
