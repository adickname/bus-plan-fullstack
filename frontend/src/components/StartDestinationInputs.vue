<script setup>
import { defineAsyncComponent } from "vue";
import { useScheduleStore } from "@/store/scheduleStore";
const scheduleStore = useScheduleStore();
const { getBusStopsSuggestions, getBusStopsSuggestionsDestination, distinctBusStops } =
    scheduleStore;
const AutoCompleteInput = defineAsyncComponent(() =>
    import("@/components/AutoCompleteInput.vue")
);
distinctBusStops()
</script>

<template>
    <v-col cols="12" md="4">
        <AutoCompleteInput v-if="getBusStopsSuggestions" :suggests-destination="false" id="start">
        </AutoCompleteInput>
        <AutoCompleteInput v-if="getBusStopsSuggestionsDestination" :suggests-destination="true" id="destination">
        </AutoCompleteInput>
    </v-col>
</template>
