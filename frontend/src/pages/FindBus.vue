<script setup>
import Schedule from "../components/Schedule.vue";
import { defineAsyncComponent } from "vue";
import { useScheduleStore } from "@/store/scheduleStore";
import { useFindBusStore } from "@/store/findBusStore";
import CompaniesCheckboxes from "@/components/CompaniesCheckboxes.vue";

const StartDestinationInputs = defineAsyncComponent(() =>
    import("@/components/StartDestinationInputs.vue")
)

const scheduleStore = useScheduleStore();
const findBusStore = useFindBusStore();
const {
    getSchedule,
    getIsDataDownloaded,
} = scheduleStore;
const { findBusLine } = findBusStore;

</script>
<template>
    <v-form>
        <v-container>
            <v-row>
                <StartDestinationInputs></StartDestinationInputs>
                <CompaniesCheckboxes></CompaniesCheckboxes>
            </v-row>
            <v-row>
                <v-btn @click="findBusLine()" class="my-2 mx-2">
                    find with bus stops
                </v-btn>
            </v-row>
        </v-container>
    </v-form>
    <template v-if="getIsDataDownloaded === true">
        <Schedule :schedule="getSchedule"></Schedule>
    </template>
</template>
