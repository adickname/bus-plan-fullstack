<script setup>
import { defineModel, ref } from "vue";
import Schedule from "../components/Schedule.vue"
const endModel = defineModel('end')
const startModel = defineModel('start')
const isDataDownloaded = ref(false)
const scheduleToPass = ref()
function validatingData(data) {
    if (data) {
        if (data.length >= 3) {
            return true
        }
    } else {
        return false
    }
}
async function fetching(link) {
    try {
        const res = await fetch(link)
        const data = await res.json()
        scheduleToPass.value = data
        isDataDownloaded.value = true
    } catch (error) {
        console.log(error.message)
    }
}
async function findScheduleAfterNameOfLine() {
    const end = endModel.value
    const start = startModel.value
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
        fetching(`http://localhost:5170/api/schedules/bus-line?end=${end}&start=${start}`)
    }
    else if (validatingData(end)) {
        fetching(`http://localhost:5170/api/schedules/bus-line?end=${end}`)
    }
    else if (validatingData(start)) {
        fetching(`http://localhost:5170/api/schedules/bus-line?start=${start}`)

    }
}

async function findBusLine() {
    const end = endModel.value
    const start = startModel.value
    if (validatingData(endModel.value) && validatingData(startModel.value)) {
        fetching(`http://localhost:5170/api/schedules/bus-stops?end=${end}&start=${start}`)
    }
    else if (validatingData(end)) {
        fetching(`http://localhost:5170/api/schedules/bus-stops?end=${end}`)
    }
    else if (validatingData(start)) {
        fetching(`http://localhost:5170/api/schedules/bus-stops?start=${start}`)

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
            </v-row>
            <v-row>
                <v-col>
                    <v-btn @click="findScheduleAfterNameOfLine()">
                        find bus line
                    </v-btn>
                    <v-btn @click="findBusLine()">
                        filter bus line with bus stops
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
    <template v-if="isDataDownloaded === true">
        <Schedule :schedule="scheduleToPass"></Schedule>
    </template>
</template>