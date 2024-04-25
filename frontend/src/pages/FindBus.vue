<script setup>
import { defineModel, ref } from "vue";
import Schedule from "../components/Schedule.vue";
const endModel = defineModel("end");
const startModel = defineModel("start");
const isDataDownloaded = ref(false);
const scheduleToPass = ref();
const companies = ref();
const companiesFilter = ref([]);
const emit = defineEmits(["setDisplayMessage", "setMessageRef", "setSeverityRef"]);
const setPropertiesOfMessage = (message, severity) => {
    emit("setDisplayMessage", true)
    emit("setMessageRef", message)
    emit("setSeverityRef", severity)
};
const getCompanies = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/schedules/companies`);
        const company = await res.json();
        companies.value = await company;
    } catch (error) {
        setPropertiesOfMessage(error.message, "error")
    }
}
getCompanies();

const checkAll = () => {
    companiesFilter.value = [...companies.value];
}

const uncheckAll = () => {
    companiesFilter.value = [];
}

const validatingData = (data) => {
    if (data) {
        if (data.length >= 3) {
            return true;
        }
    } else {
        return false;
    }
}
const fetching = async (link, end, start) => {
    if (companiesFilter.value.length > 0) {
        if (end && start) {
            try {
                const res = await fetch(link, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        end: end,
                        start: start,
                        companies: companiesFilter,
                    }),
                });
                const data = await res.json();
                scheduleToPass.value = data;
                isDataDownloaded.value = true;
            }
            catch (error) {
                setPropertiesOfMessage(error.message, "error")
            }
        } else if (end) {
            try {
                const res = await fetch(link, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        end: end,
                        companies: companiesFilter,
                    }),
                });
                const data = await res.json();
                scheduleToPass.value = data;
                isDataDownloaded.value = true;
            }
            catch (error) {
                setPropertiesOfMessage(error.message, "error")
            }
        } else if (end, start)
            try {
                const res = await fetch(link, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        start: start,
                        companies: companiesFilter,
                    }),
                });
                const data = await res.json();
                scheduleToPass.value = data;
                isDataDownloaded.value = true;
            }
            catch (error) {
                setPropertiesOfMessage(error.message, "error")
            }

    }
}
const findScheduleAfterNameOfLine = () => {
    const end = endModel.value;
    const start = startModel.value;
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
        fetching(`${import.meta.env.VITE_API_SERVER_URL}/api/schedules/bus-line`, end, start);
    } else {
        setPropertiesOfMessage("not enough data", "info")
    }
}

const findBusLine = () => {
    const end = endModel.value;
    const start = startModel.value;
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
        fetching(
            `${import.meta.env.VITE_API_SERVER_URL}/api/schedules/bus-stops/filter-companies`,
            end,
            start
        );
    } else if (validatingData(end)) {
        fetching(
            `${import.meta.env.VITE_API_SERVER_URL}/api/schedules/bus-stops/filter-companies`,
            end
        );
    } else if (validatingData(start)) {
        fetching(
            `${import.meta.env.VITE_API_SERVER_URL}/api/schedules/bus-stops/filter-companies`,
            start
        );
    } else {
        setPropertiesOfMessage("no data", "info")
    }
}
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
