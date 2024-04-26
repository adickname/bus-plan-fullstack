<script setup>
import { defineAsyncComponent, defineModel, ref, watch } from "vue";
import Schedule from "../components/Schedule.vue";
import { useScheduleStore } from "@/store/scheduleStore";
import { useFindBusStore } from "@/store/findBusStore";
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
const isDataDownloaded = getIsDataDownloaded;
const scheduleToPass = ref(getSchedule);
const companies = ref([]);
const companiesFilter = ref([]);
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
distinctBusStops();
getCompanies();

const checkAll = () => {
    companiesFilter.value = [...companies.value];
};

const uncheckAll = () => {
    companiesFilter.value = [];
};
</script>
<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <Suspense>
                        <template #default>
                            <AutoCompleteInput v-if="getBusStopsSuggestions" :suggests-destination="false">
                            </AutoCompleteInput>
                        </template>
                        <template #fallback>
                            <p>wait a minute</p>
                        </template>
                    </Suspense>
                    <Suspense>
                        <template #default>
                            <AutoCompleteInput v-if="getBusStopsSuggestionsDestination" :suggests-destination="true">
                            </AutoCompleteInput>
                        </template>
                        <template #fallback>
                            <p>wait a minute</p>
                        </template>
                    </Suspense>
                </v-col>
                <v-row>
                    <v-col cols="12" md="4">
                        <template v-for="company in companies">
                            <div>
                                <input v-model="companiesFilter" type="checkbox" name="company" :value="company"
                                    :id="company" class="" />
                                <label :for="company">{{ company }}</label>
                            </div>
                        </template>
                        <v-btn @click="checkAll()" class="my-2 mx-2">Check all</v-btn>
                        <v-btn @click="uncheckAll()" class="my-2 mx-2">Uncheck all</v-btn>
                    </v-col>
                </v-row>
            </v-row>
            <v-row>
                <v-btn @click="findBusLine()" class="my-2 mx-2">
                    find with bus stops
                </v-btn>
            </v-row>
        </v-container>
    </v-form>
    <template v-if="isDataDownloaded === true">
        <Schedule :schedule="scheduleToPass"></Schedule>
    </template>
</template>
