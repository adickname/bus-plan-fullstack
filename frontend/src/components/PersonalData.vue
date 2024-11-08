<script setup>
import { useOrderStore } from "@/store/orderStore";
import { watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const orderStore = useOrderStore();
const { changeName, changeSurname, changeAge } = orderStore;
const name = defineModel("name");
const surname = defineModel("surname");
const age = defineModel("age");

watch(name, (newValue) => {
  changeName(newValue);
});

watch(surname, (newValue) => {
  changeSurname(newValue);
});

watch(age, (newValue) => {
  changeAge(newValue);
});
</script>

<template>
  <v-col cols="12" md="4">
    <v-text-field
      v-model="name"
      :label="t('form.name')"
      hide-details
      required
    ></v-text-field>
  </v-col>
  <v-col cols="12" md="4">
    <v-text-field
      v-model="surname"
      :label="t('form.surname')"
      hide-details
      required
    ></v-text-field>
  </v-col>
  <v-col cols="12" md="4">
    <v-text-field
      v-model="age"
      :label="t('form.age')"
      hide-details
      required
    ></v-text-field>
  </v-col>
</template>
