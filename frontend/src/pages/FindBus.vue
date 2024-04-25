<script setup>
import { defineModel, ref } from "vue";
import Schedule from "../components/Schedule.vue";
import { useScheduleStore } from "@/store/scheduleStore";
const scheduleStore = useScheduleStore()
const { getSchedule, getIsDataDownloaded, fetching, hej } = scheduleStore;
hej()
const scheduleToPass = ref(getSchedule);
const companies = ref(getIsDataDownloaded);
const endModel = defineModel("end");
const startModel = defineModel("start");
const isDataDownloaded = ref(false);
const companiesFilter = ref([]);
import { validatingData } from "@/functions/validatingData";
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
getCompanies();

const checkAll = () => {
    companiesFilter.value = [...companies.value];
};

const uncheckAll = () => {
    companiesFilter.value = [];
};

const findScheduleAfterNameOfLine = () => {
    const end = endModel.value;
    const start = startModel.value;
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
        fetching(
            `${import.meta.env.VITE_API_SERVER_URL}/api/schedules/bus-line`,
            end,
            start, companiesFilter.value
        );
    } else {
        setPropertiesOfMessage("not enough data", "info");
    }
};

const findBusLine = () => {
    const end = endModel.value;
    const start = startModel.value;
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
        fetching(
            `${import.meta.env.VITE_API_SERVER_URL
            }/api/schedules/bus-stops/filter-companies`,
            end,
            start, companiesFilter.value
        );
    } else if (validatingData(end)) {
        fetching(
            `${import.meta.env.VITE_API_SERVER_URL
            }/api/schedules/bus-stops/filter-companies`,
            end, companiesFilter.value
        );
    } else if (validatingData(start)) {
        fetching(
            `${import.meta.env.VITE_API_SERVER_URL
            }/api/schedules/bus-stops/filter-companies`,
            start, companiesFilter.value
        );
    } else {
        setPropertiesOfMessage("no data", "info");
    }
};
</script>
<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="startModel" label="start min 3 characters" hide-details
                        required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="endModel" :counter="10" label="destination min 3 characters" hide-details
                        required></v-text-field>
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
                <v-btn @click="findScheduleAfterNameOfLine()" class="my-2 mx-2">
                    find with bus line
                </v-btn>
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
