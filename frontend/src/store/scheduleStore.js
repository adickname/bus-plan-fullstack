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

export const useScheduleStore = defineStore("schedule", () => {
  const schedule = ref([]);
  const isDataDownloaded = ref(false);
  function hej() {
    console.log("hej");
  }
  const getSchedule = computed(() => {
    return schedule.value;
  });
  const getIsDataDownloaded = computed(() => {
    return isDataDownloaded.value;
  });
  async function fetching(link, end, start, companiesFilter) {
    console.log(companiesFilter._target.length());
    if (companiesFilter.length > 0) {
      if (end && start) {
        try {
          const res = await fetch(link, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              end: end,
              start: start,
              companies: companiesFilter,
            }),
          });
          const data = await res.json();
          scheduleToPass.value = data;
          isDataDownloaded.value = true;
        } catch (error) {
          setPropertiesOfMessage(error.message, "error");
        }
      } else if (end) {
        try {
          const res = await fetch(link, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              end: end,
              companies: companiesFilter,
            }),
          });
          const data = await res.json();
          scheduleToPass.value = data;
          isDataDownloaded.value = true;
        } catch (error) {
          setPropertiesOfMessage(error.message, "error");
        }
      } else if ((end, start))
        try {
          const res = await fetch(link, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              start: start,
              companies: companiesFilter,
            }),
          });
          const data = await res.json();
          scheduleToPass.value = data;
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
    hej,
  };
});
