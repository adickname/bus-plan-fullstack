import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useChangeDatePickerLanguageStore = defineStore(
  "language store",
  () => {
    const change = ref(false);
    const getChange = computed(() => {
      return change;
    });
    const changeChange = () => {
      change.value = !change.value;
    };
    return {
      getChange,
      changeChange,
    };
  }
);
