<script setup>
import { defineModel, ref } from "vue";
import Schedule from "../components/Schedule.vue"
import Checkbox from 'primevue/checkbox';
const endModel = defineModel('end')
const startModel = defineModel('start')
const isDataDownloaded = ref(false)
const scheduleToPass = ref()
const companies = ref()
const companiesFilter = ref([])
const checkedAll = ref(false)
const uncheckedAll = ref(false)
async function getCompanies() {
    const res = await fetch("http://localhost:5170/api/schedules/company")
    const company = res.json()
    companies.value = await company
}
getCompanies()



function validatingData(data) {
    if (data) {
        if (data.length >= 3) {
            return true
        }
    } else {
        return false
    }
}
async function fetching(link, end, start) {
    if (companiesFilter.value.length > 0) {
        try {
            const res = await fetch(link, {
                method: "POST", headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ end: end, start: start, companies: companiesFilter })
            })
            console.log('fetching')
            const data = await res.json()
            scheduleToPass.value = data
            isDataDownloaded.value = true

        } catch (error) {
            console.log(error.message)
        }

    }

}
async function findScheduleAfterNameOfLine() {
    const end = endModel.value
    const start = startModel.value
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
        fetching(`http://localhost:5170/api/schedules/bus-line`, end, start)
    }
    else if (validatingData(end)) {
        fetching(`http://localhost:5170/api/schedules/bus-line`, end)
    }
    else if (validatingData(start)) {
        fetching(`http://localhost:5170/api/schedules/bus-line`, start)

    }
}

async function findBusLine() {
    const end = endModel.value
    const start = startModel.value
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
        fetching(`http://localhost:5170/api/schedules/bus-stops`, end, start)
    }
    else if (validatingData(end)) {
        fetching(`http://localhost:5170/api/schedules/bus-stops`, end)
    }
    else if (validatingData(start)) {
        fetching(`http://localhost:5170/api/schedules/bus-stops`, start)

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
                <template v-for="company in companies">
                    <input v-model="companiesFilter" type="checkbox" name="company" :value="company" :id="company"
                        class="checkbox-company" checked>
                    <label :for="company">{{ company }}</label>
                </template>

            </v-row>
            <v-row>
                <v-col>
                    <v-btn @click="findScheduleAfterNameOfLine()">
                        find with bus line
                    </v-btn>
                    <v-btn @click="findBusLine()">
                        find with bus stops
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
    <template v-if="isDataDownloaded === true">
        <Schedule :schedule="scheduleToPass"></Schedule>
    </template>
</template>