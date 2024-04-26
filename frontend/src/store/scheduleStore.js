import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

const setPropertiesOfMessage = (a, b) => {
  /*  console.log(""); */
};
export const useScheduleStore = defineStore("schedule", () => {
  const busStopsSuggestions = ref([]);
  const busStopsSuggestionsDestination = ref([]);
  const schedule = ref([]);
  const isDataDownloaded = ref(false);
  const getSchedule = computed(() => {
    return schedule;
  });
  const getIsDataDownloaded = computed(() => {
    return isDataDownloaded;
  });
  const getBusStopsSuggestions = computed(() => {
    return busStopsSuggestions;
  });
  const getBusStopsSuggestionsDestination = computed(() => {
    return busStopsSuggestionsDestination;
  });
  const distinctBusStops = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/api/schedules/bus-stops/distinct`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    let data = await res.json();
    busStopsSuggestions.value = [];
    busStopsSuggestions.value = data;
  };

  const changeBusStopsSuggestionsDestination = async (start) => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_SERVER_URL
      }/api/schedules/bus-stops/destination`,
      {
        method: "POST",
        body: JSON.stringify({ start: start }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    let data = await res.json();
    busStopsSuggestionsDestination.value = [];
    busStopsSuggestionsDestination.value = data;
  };

  const fetching = async (link, end, start, companiesFilter) => {
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
  };
  return {
    getSchedule,
    getIsDataDownloaded,
    fetching,
    getBusStopsSuggestions,
    getBusStopsSuggestionsDestination,
    distinctBusStops,
    changeBusStopsSuggestionsDestination,
  };
});
