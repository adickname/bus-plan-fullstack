<script setup>
import { defineAsyncComponent, defineModel, ref, watch } from "vue";
import Schedule from "../components/Schedule.vue";
import { useScheduleStore } from "@/store/scheduleStore";
import { useFindBusStore } from "@/store/findBusStore";
import CompaniesCheckboxes from "@/components/CompaniesCheckboxes.vue";

const scheduleStore = useScheduleStore();
const findBusStore = useFindBusStore();
const {
    getSchedule,
    getIsDataDownloaded,
    distinctBusStops,
    getBusStopsSuggestions,
    getBusStopsSuggestionsDestination,
} = scheduleStore;
const { findBusLine } = findBusStore;
const AutoCompleteInput = defineAsyncComponent(() =>
    import("@/components/AutoCompleteInput.vue")
);

const emit = defineEmits([
    "setDisplayMessage",
    "setMessageRef",
    "setSeverityRef",
]);
const setPropertiesOfMessage = (message, severity) => {
    emit("setDisplayMessage", true);
    emit("setMessageRef", message);
    emit("setSeverityRef", severity);
};

distinctBusStops();

</script>
<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <Suspense>
                        <template #default>
                            <AutoCompleteInput v-if="getBusStopsSuggestions" :suggests-destination="false" id="start">
                            </AutoCompleteInput>
                        </template>
                        <template #fallback>
                            <p>wait a minute</p>
                        </template>
                    </Suspense>
                    <Suspense>
                        <template #default>
                            <AutoCompleteInput v-if="getBusStopsSuggestionsDestination" :suggests-destination="true"
                                id="destination">
                            </AutoCompleteInput>
                        </template>
                        <template #fallback>
                            <p>wait a minute</p>
                        </template>
                    </Suspense>
                </v-col>
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
