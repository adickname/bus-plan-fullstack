<script setup>
import { useScheduleStore } from "@/store/scheduleStore";
import { watch } from "vue";
const scheduleStore = useScheduleStore();
const {
    getBusStopsSuggestions,
    getBusStopsSuggestionsDestination,
    changeBusStopsSuggestionsDestination,
} = scheduleStore;
import { useFindBusStore } from "@/store/findBusStore";
const findBusStore = useFindBusStore();
const { changeStartModel,
    changeEndModel } = findBusStore;
const props = defineProps(["suggestsDestination"]);
const emit = defineEmits(["updateState"]);
const inputValue = defineModel("inputValue");

watch(inputValue, (newValue) => {
    if (props.suggestsDestination) {
        changeEndModel(newValue)
    } else {
        changeBusStopsSuggestionsDestination(newValue)
        changeStartModel(newValue)
    }
})
</script>

<template>
    <v-autocomplete v-model="inputValue" label="Destinations" :items="getBusStopsSuggestionsDestination"
        v-if="props.suggestsDestination"></v-autocomplete>
    <v-autocomplete label="Start" v-model="inputValue" :items="getBusStopsSuggestions" v-else></v-autocomplete>
</template>
