<script setup>
import { RouterLink, RouterView } from "vue-router"
import { ref } from "vue"
import MegaMenu from 'primevue/megamenu';

const items = ref([{
    label: 'Home',
    route: "home"
}, {
    label: 'find bus',
    route: "find"
}, {
    label: 'Order',
    route: "order"
}, {
    label: 'Own tickets',
    route: 'own-tickets'
}, {
    label: 'Login / Register',
    route: 'login'
},])
</script>

<template>

    <MegaMenu :model="items" breakpoint="1023px" class=" "
        :pt="{ root: { class: 'flex justify-between p-4 bg-[#485262] ' }, menu: { class: '' }, menubutton: { class: 'bg-red-400' }, }">
        <template #start>
            <h2 class=" font-greatvibes font-light text-[2rem] text-red-400">bus plan</h2>
        </template>
        <template #item="{ item }">
            <router-link :to="{ name: item.route }"
                class="flex-1 hover:bg-red-500 bg-red-400 flex items-center justify-left lg:justify-center cursor-pointer p-4 lg:w-40 lg:rounded-lg h-10 lg:m-2 animate-jelloHorizontal lg:animate-puff-in">
                <span>{{ item.label }}</span>
            </router-link>
        </template>
    </MegaMenu>

</template>
