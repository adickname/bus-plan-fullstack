<script setup>
import { useCompaniesStore } from "@/store/companiesStore";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { ref } from "vue";
const {
  getCompanies,
  checkAll,
  uncheckAll,
  getCompaniesRef,
  changeCompaniesFilter,
  getCompaniesFilter,
} = useCompaniesStore();
const companies = ref(getCompaniesRef);
const companiesFilter = ref(getCompaniesFilter);

getCompanies();
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <template v-for="company in companies">
        <div class="mx-4">
          <input
            v-model="companiesFilter"
            type="checkbox"
            name="company"
            :value="company"
            :id="company"
          />
          <label :for="company">{{ company }}</label>
        </div>
      </template>
      <v-btn @click="checkAll()" class="my-2 mx-2">{{
        t("form.checkAll")
      }}</v-btn>
      <v-btn @click="uncheckAll()" class="my-2 mx-2">{{
        t("form.uncheckAll")
      }}</v-btn>
    </v-col>
  </v-row>
</template>
