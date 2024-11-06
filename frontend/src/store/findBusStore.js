import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { validatingData } from "@/functions/validatingData";
import { useCompaniesStore } from "@/store/companiesStore";
import { useScheduleStore } from "./scheduleStore";
const { getCompaniesFilter } = useCompaniesStore();
const { changeIsDataDownloaded, changeSchedule } = useScheduleStore();
const setPropertiesOfMessage = (a, b) => {
  /*  console.log(""); */
};
export const useFindBusStore = defineStore("find bus functions", () => {
  const startModel = ref();
  const endModel = ref();
  const companiesFilter = ref(getCompaniesFilter);
  const getStart = computed(() => {
    return startModel;
  });
  const getDestination = computed(() => {
    return endModel;
  });
  const changeStartModel = (value) => {
    startModel.value = value;
  };

  const changeEndModel = (value) => {
    endModel.value = value;
  };
  const changeCompaniesFilter = (value) => {
    companiesFilter.value = value;
  };
  const findBusLine = () => {
    const end = endModel.value;
    const start = startModel.value;
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
      fetching(
        `${
          import.meta.env.VITE_API_SERVER_URL
        }/api/schedules/bus-stops/filter-companies`,
        end,
        start,
        companiesFilter
      );
    } else if (validatingData(start)) {
      fetching(
        `${
          import.meta.env.VITE_API_SERVER_URL
        }/api/schedules/bus-stops/filter-companies`,
        null,
        start,
        companiesFilter
      );
    } else {
      setPropertiesOfMessage("no data", "info");
    }
  };

  const fetching = async (link, end, start, companiesFilter) => {
    if (companiesFilter._value.length > 0) {
      changeIsDataDownloaded(false);
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
        changeSchedule([]);
        changeSchedule([data]);
        changeIsDataDownloaded(true);
      } catch (error) {
        setPropertiesOfMessage(error.message, "error");
      }
    }
  };

  return {
    fetching,
    findBusLine,
    changeStartModel,
    changeEndModel,
    changeCompaniesFilter,
    getStart,
    getDestination,
  };
});
