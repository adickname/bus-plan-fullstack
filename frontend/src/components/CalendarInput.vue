<script setup>
import DatePicker from "primevue/datepicker";
import { useChangeDatePickerLanguageStore } from "@/store/changeDatePickerLanguageStore";
const DatePickerLanguage = useChangeDatePickerLanguageStore();
const { getChange } = DatePickerLanguage;
import { watch, ref } from "vue";
import { useOrderStore } from "@/store/orderStore";
import { useI18n } from "vue-i18n";
import { usePrimeVue } from "primevue/config";
import { onMounted, onUpdated } from "vue";
const { t } = useI18n();
const orderStore = useOrderStore();
const { getTypeTicket, changeDateOfIssue } = orderStore;
const dateOfIssue = defineModel("dateOfIssue");
watch(dateOfIssue, (newValue) => {
  changeDateOfIssue(newValue);
});
const show5 = ref(getChange);
let monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let monthNamesShortPl = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
];
const getChangeMonth = () => {
  if (localStorage.getItem("language")) {
    if (localStorage.getItem("language") === "pl") {
      return monthNamesShortPl;
    } else {
      return monthNamesShort;
    }
  } else {
    if (navigator.language === "pl-PL") {
      return monthNamesShortPl;
    } else {
      return monthNamesShort;
    }
  }
};
const changeMonthShorts = () => {
  const primevue = usePrimeVue();
  primevue.config.locale.monthNamesShort = getChangeMonth();
};

onMounted(() => {
  changeMonthShorts();
  window.addEventListener("storage", changeMonthShorts());
});

onUpdated(() => {
  changeMonthShorts();
});
</script>

<template>
  <span v-show="false">{{ show5 }}</span>
  <template v-if="getTypeTicket">
    <v-col cols="12" md="4">
      <p>{{ t("form.begin") }}</p>
      <template v-if="getTypeTicket === 'day'">
        <DatePicker
          v-model="dateOfIssue"
          :pt="{
            root: { class: 'border-2 border-white' },
            panel: { class: 'z-10 bg-black' },
          }"
          showIcon
          :showOnFocus="false"
          date-format="mm/dd/yy"
        />
      </template>
      <template v-if="getTypeTicket === 'month'">
        <DatePicker
          v-model="dateOfIssue"
          :pt="{
            root: { class: 'border-2 border-white' },
            panel: { class: 'z-10 bg-black' },
          }"
          showIcon
          :showOnFocus="false"
          view="month"
          date-format="mm/yy"
        />
      </template>
    </v-col>
  </template>
</template>
