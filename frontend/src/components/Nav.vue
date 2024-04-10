<script setup>
import { RouterLink, RouterView } from "vue-router"
import { ref } from "vue"
import MegaMenu from 'primevue/megamenu';
import Order from "@/views/Order.vue";

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

    <MegaMenu :model="items">
        <template #item="{ item }">
            <router-link :to="{ name: item.route }"><span>{{ item.label }}</span></router-link>
        </template>
    </MegaMenu>

</template>
<style scoped>
a {
    text-decoration: none;
    padding: 15px;
}

span {
    color: white;
    text-decoration: none;

}
</style>