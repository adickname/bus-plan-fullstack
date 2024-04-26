import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
/* const emit = defineEmits([
  "setDisplayMessage",
  "setMessageRef",
  "setSeverityRef",
]);
const setPropertiesOfMessage = (message, severity) => {
  emit("setDisplayMessage", true);
  emit("setMessageRef", message);
  emit("setSeverityRef", severity);
}; */
const setPropertiesOfMessage = (a, b) => {
  /*  console.log(""); */
};
export const useScheduleStore = defineStore("schedule", () => {
  const schedule = ref([]);
  const isDataDownloaded = ref(false);
  const getSchedule = computed(() => {
    return schedule;
  });
  const getIsDataDownloaded = computed(() => {
    return isDataDownloaded;
  });
  async function fetching(link, end, start, companiesFilter) {
    if (companiesFilter._value.length > 0) {
      isDataDownloaded.value = false;
      try {
        const res = await fetch(link, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            end: end,
            start: start,
            companies: companiesFilter._value,
          }),
        });
        const data = await res.json();
        schedule.value = [];
        schedule.value.push(data);
        isDataDownloaded.value = true;
      } catch (error) {
        setPropertiesOfMessage(error.message, "error");
      }
    }
  }
  return {
    getSchedule,
    getIsDataDownloaded,
    fetching,
  };
});
