<!-- INCOMPLETE HTML5 STRUCTURE -->
<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { ref, onMounted, watch } from "vue";
import { order } from "@/functions/order";
import StartDestinationInputs from "@/components/StartDestinationInputs.vue";
import { useFindBusStore } from "@/store/findBusStore";
import PersonalData from "@/components/PersonalData.vue";
import TypeTicket from "@/components/TypeTicket.vue";
import RouteSelection from "@/components/RouteSelection.vue";
import CalendarInput from "@/components/CalendarInput.vue";
import { useCompaniesStore } from "@/store/companiesStore";
import CompaniesOrder from "@/components/CompaniesOrder.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const companiesStore = useCompaniesStore();
const { findCompaniesToOrder } = companiesStore;
const findBusStore = useFindBusStore();
const { getStart, getDestination } = findBusStore;
const form = ref();

const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

const login = async () => {
  if (!isAuthenticated.value && !isLoading.value) {
    await loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.href,
      },
    });
  }
};

onMounted(() => {
  if (!isAuthenticated.value) {
    login();
  }
});

watch(
  () => [isAuthenticated.value, isLoading.value],
  ([auth, loading]) => {
    if (!auth && !loading) {
      login();
    }
  }
);
</script>

<template>
  <main>
    <v-form ref="form">
      <v-container>
        <v-row>
          <PersonalData></PersonalData>
          <StartDestinationInputs></StartDestinationInputs>
        </v-row>
        <v-row>
          <TypeTicket></TypeTicket>
        </v-row>
        <v-row>
          <RouteSelection></RouteSelection>
        </v-row>
        <v-row>
          <CalendarInput></CalendarInput>
        </v-row>
        <v-row>
          <CompaniesOrder></CompaniesOrder>
        </v-row>
        <v-row>
          <v-col>
            <v-btn type="reset" @click="resetInputs()" class="">
              {{ t("form.clear") }}
            </v-btn>
            <v-btn
              @click="findCompaniesToOrder(getDestination, getStart)"
              v-if="getDestination && getStart"
              class="ml-4 mr-2"
            >
              {{ t("form.findCompanies") }}
            </v-btn>
            <v-btn @click="order(user.sub)" class="mx-2">
              {{ t("form.order") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </main>
</template>
