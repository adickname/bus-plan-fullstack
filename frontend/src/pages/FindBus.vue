<!-- INCOMPLETE HTML5 STRUCTURE -->
<script setup>
import Schedule from "../components/Schedule.vue";
import { defineAsyncComponent } from "vue";
import { useScheduleStore } from "@/store/scheduleStore";
import { useFindBusStore } from "@/store/findBusStore";
import CompaniesCheckboxes from "@/components/CompaniesCheckboxes.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const StartDestinationInputs = defineAsyncComponent(() =>
  import("@/components/StartDestinationInputs.vue")
);

const scheduleStore = useScheduleStore();
const findBusStore = useFindBusStore();
const { getSchedule, getIsDataDownloaded } = scheduleStore;
const { findBusLine } = findBusStore;
</script>
<template>
  <section>
    <v-form>
      <v-container>
        <article>
          <v-row>
            <StartDestinationInputs></StartDestinationInputs>
          </v-row>
          <v-row>
            <CompaniesCheckboxes></CompaniesCheckboxes>
          </v-row>
          <v-row>
            <v-btn @click="findBusLine()" class="my-2 mx-2">
              {{ t("form.findBus") }}
            </v-btn>
          </v-row>
        </article>
        <article>
          <v-row>
            <template v-if="getIsDataDownloaded === true">
              <Schedule :schedule="getSchedule"></Schedule>
            </template>
          </v-row>
        </article>
      </v-container>
    </v-form>
  </section>
</template>
