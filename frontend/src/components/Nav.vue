<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import MegaMenu from "primevue/megamenu";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./LanguageSwitcher.vue";
const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
const windowLocation = ref(window.location.pathname);
const { t } = useI18n();

const items = ref([
  {
    label: "nav.home",
    route: "home",
    concernsAuth: false,
  },
  {
    label: "nav.findBus",
    route: "find",
    concernsAuth: false,
  },
  {
    label: "nav.order",
    route: "order",
    concernsAuth: false,
  },
  {
    label: "nav.ownTickets",
    route: "own-tickets",
    concernsAuth: false,
  },
  {
    concernsAuth: true,
  },
]);
</script>

<template>
  <MegaMenu
    :model="items"
    breakpoint="1023px"
    :pt="{
      root: { class: 'flex justify-between p-4 bg-[#485262] ' },
      menubutton: { class: 'bg-red-400' },
    }"
  >
    <template #start>
      <h2 class="font-greatvibes font-light text-[2rem] text-red-400">
        bus plan
      </h2>
    </template>
    <template #item="{ item }">
      <router-link
        :to="{ name: item.route }"
        v-if="!item.concernsAuth"
        class="flex-1 hover:bg-red-500 bg-red-400 flex items-center justify-left lg:justify-center cursor-pointer p-4 lg:w-40 lg:rounded-lg h-10 lg:m-2"
      >
        <span>{{ t(item.label) }}</span>
      </router-link>
      <router-link
        v-if="item.concernsAuth"
        :to="windowLocation.substring(1, windowLocation.length) || '/'"
        class="flex-1 hover:bg-red-500 bg-red-400 flex items-center justify-left lg:justify-center cursor-pointer p-4 lg:w-40 lg:rounded-lg h-10 lg:m-2"
        ><span v-if="!isAuthenticated" @click="loginWithRedirect">
          {{ t("nav.logIn") }}</span
        ><span v-else @click="logout"> {{ t("nav.logOut") }}</span></router-link
      >
    </template>
    <template #end>
      <LanguageSwitcher></LanguageSwitcher>
    </template>
  </MegaMenu>
</template>
