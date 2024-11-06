import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

export const useOrderStore = defineStore("order store", () => {
  const name = ref("");
  const surname = ref("");
  const age = ref("");
  const typeTicket = ref("");
  const oneWay = ref("");
  const dayOfIssue = ref("");
  const selectedCompany = ref("");
  const getName = computed(() => {
    return name;
  });
  const getSurname = computed(() => {
    return surname;
  });
  const getAge = computed(() => {
    return age;
  });
  const getTypeTicket = computed(() => {
    return typeTicket;
  });
  const getOneWay = computed(() => {
    return oneWay;
  });
  const getDateOfIssue = computed(() => {
    return dayOfIssue;
  });
  const getCompany = computed(() => {
    return selectedCompany;
  });
  const changeName = (value) => {
    name.value = value;
  };
  const changeSurname = (value) => {
    surname.value = value;
  };
  const changeAge = (value) => {
    age.value = value;
  };
  const changeTypeTicket = (value) => {
    typeTicket.value = value;
  };
  const changeOneWay = (value) => {
    oneWay.value = value;
  };
  const changeDateOfIssue = (value) => {
    dayOfIssue.value = value;
  };
  const changeCompany = (value) => {
    selectedCompany.value = value;
  };
  return {
    getName,
    getSurname,
    getAge,
    getOneWay,
    getDateOfIssue,
    getCompany,
    getTypeTicket,
    changeName,
    changeSurname,
    changeAge,
    changeTypeTicket,
    changeOneWay,
    changeDateOfIssue,
    changeCompany,
  };
});
