import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useScheduleStore = defineStore("autocomplete", () => {
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

  const changeSchedule = (value) => {
    schedule.value = value;
  };

  const changeIsDataDownloaded = (value) => {
    isDataDownloaded.value = value;
  };
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

  return {
    getSchedule,
    getIsDataDownloaded,
    getBusStopsSuggestions,
    getBusStopsSuggestionsDestination,
    distinctBusStops,
    changeBusStopsSuggestionsDestination,
    changeIsDataDownloaded,
    changeSchedule,
  };
});
