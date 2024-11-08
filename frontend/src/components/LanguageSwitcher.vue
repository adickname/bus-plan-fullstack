<script setup>
import Dropdown from "primevue/dropdown";
import { watch, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useChangeDatePickerLanguageStore } from "@/store/changeDatePickerLanguageStore";
const calendarLanguage = useChangeDatePickerLanguageStore();
const { changeChange } = calendarLanguage;
const { locale } = useI18n();
const countries = [
  { name: "english", code: "en" },
  { name: "polish", code: "pl" },
];
const selectedLanguage = defineModel("language");
watch(selectedLanguage, (newValue) => {
  locale.value = `${newValue.code}`;
  localStorage.setItem("language", newValue.code);
  changeChange();
});
</script>

<template>
  <Dropdown
    v-model="selectedLanguage"
    :options="countries"
    optionLabel="name"
    class="w-full md:w-14rem"
  >
    <template #value="slotProps">
      <span>
        <img :src="'/public/assets/languages.png'" alt="languages" />
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center">
        <img
          :alt="slotProps.option.label"
          :src="`assets/${slotProps.option.code}.png`"
          :class="`mr-2 flag
        flag-${slotProps.option.code.toLowerCase()}`"
          style="width: 18px"
        />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>
