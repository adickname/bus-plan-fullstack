<script setup>
import RadioButton from "primevue/radiobutton";
import { watch, ref } from "vue";
import { useOrderStore } from "@/store/orderStore";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const orderStore = useOrderStore();
const { changeTypeTicket } = orderStore;
const typeTicket = ref();
watch(typeTicket, (newValue) => {
  changeTypeTicket(newValue);
});
</script>

<template>
  <v-col cols="12" md="4">
    <div class="flex flex-wrap gap-3">
      <div class="flex align-items-center">
        <RadioButton
          v-model="typeTicket"
          inputId="day"
          name="typeTicket"
          value="day"
          :pt="{ input: { class: 'w-6 h-6' } }"
          :unstyled="true"
        />
        <label for="day" class="ml-2">{{ t("form.oneWay") }}</label>
      </div>
    </div>
    <div class="flex flex-wrap gap-3">
      <div class="flex align-items-center">
        <RadioButton
          v-model="typeTicket"
          inputId="month"
          name="typeTicket"
          value="month"
          :pt="{ input: { class: 'w-6 h-6' } }"
          :unstyled="true"
        />
        <label for="month" class="ml-2">{{ t("form.monthly") }}</label>
      </div>
    </div>
  </v-col>
</template>
