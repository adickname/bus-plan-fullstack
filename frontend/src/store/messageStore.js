import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

export const useMessageStore = defineStore("message store", () => {
  const message = ref("");
  const severity = ref("");
  const shouldBeDisplayed = ref(false);
  const getMessage = computed(() => {
    return message;
  });
  const getSeverity = computed(() => {
    return severity;
  });
  const getShouldBeDisplayed = computed(() => {
    return shouldBeDisplayed;
  });
  const changeMessage = (value) => {
    message.value = value;
  };
  const changeSeverity = (value) => {
    severity.value = value;
  };
  const changeShouldBeDisplayed = (value) => {
    shouldBeDisplayed.value = value;
  };
  return {
    getMessage,
    getSeverity,
    getShouldBeDisplayed,
    changeMessage,
    changeSeverity,
    changeShouldBeDisplayed,
  };
});
