import { defineStore } from "pinia";
import { ref, computed } from "vue";

const setPropertiesOfMessage = (a, b) => {
  /*  console.log(""); */
};
export const useCompaniesStore = defineStore("companies", () => {
  const companies = ref([]);
  const companiesFilter = ref([]);
  const getCompaniesRef = computed(() => {
    return companies;
  });
  const getCompaniesFilter = computed(() => {
    return companiesFilter;
  });
  const changeCompaniesFilter = (value) => {
    return (companiesFilter.value = value);
  };
  const checkAll = () => {
    companiesFilter.value = [...companies.value];
  };

  const uncheckAll = () => {
    companiesFilter.value = [];
  };
  const getCompanies = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/api/schedules/companies`
      );
      const company = await res.json();
      companies.value = await company;
    } catch (error) {
      setPropertiesOfMessage(error.message, "error");
    }
  };

  return {
    getCompanies,
    checkAll,
    uncheckAll,
    getCompaniesRef,
    changeCompaniesFilter,
    getCompaniesFilter,
  };
});
