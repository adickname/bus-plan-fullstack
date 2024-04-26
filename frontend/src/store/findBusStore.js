import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { validatingData } from "@/functions/validatingData";
const setPropertiesOfMessage = (a, b) => {
  /*  console.log(""); */
};
export const useFindBusStore = defineStore("find bus functions", () => {
  const startModel = ref();
  const endModel = ref();
  const companiesFilter = ref([]);
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
    } else if (validatingData(end)) {
      fetching(
        `${
          import.meta.env.VITE_API_SERVER_URL
        }/api/schedules/bus-stops/filter-companies`,
        end,
        null,
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
    fetching,
    findBusLine,
    changeStartModel,
    changeEndModel,
    changeCompaniesFilter,
  };
});
