import { defineStore } from "pinia";
import { ref, computed } from "vue";

const setPropertiesOfMessage = (a, b) => {
  /*  console.log(""); */
};
export const useCompaniesStore = defineStore("companies", () => {
  const companies = ref([]);
  const companiesFilter = ref([]);
  const getCompaniesToOrder = computed(() => {
    return companies;
  });
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
  const findCompaniesToOrder = async (end, start) => {
    companies.value = [];
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/api/schedules/bus-stops`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ end: end, start: start }),
        }
      );
      const data = await res.json();
      data.forEach((element) => {
        let isFree = true;
        companies.value.forEach((elementCompanies) => {
          if (elementCompanies === element.company) {
            isFree = false;
          }
        });
        if (isFree) {
          companies.value.push(element.company);
        }
      });
    } catch (error) {
      setPropertiesOfMessage(error.message, "error");
    }
  };

  return {
    getCompanies,
    getCompaniesToOrder,
    checkAll,
    uncheckAll,
    getCompaniesRef,
    changeCompaniesFilter,
    getCompaniesFilter,
    findCompaniesToOrder,
  };
});
