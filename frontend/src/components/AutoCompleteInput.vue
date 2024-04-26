<script setup>
import { useScheduleStore } from "@/store/scheduleStore";
import { watch } from "vue";
const scheduleStore = useScheduleStore()
const { getBusStopsSuggestions,
    getBusStopsSuggestionsDestination, changeBusStopsSuggestionsDestination } = scheduleStore;
const props = defineProps(['suggestsDestination'])
const emit = defineEmits(['updateState'])
const inputValue = defineModel('inputValue')
const handleEmit = () => {
    console.log(inputValue.value)
    emit('updateState', inputValue.value)
}
/* watch(inputValue, (newValue) => {
    handleEmit()
    if (props.suggestsDestination) {
        changeBusStopsSuggestionsDestination(inputValue)
    }
}) */
</script>

<template>
    <v-autocomplete v-model="inputValue" label="Destinations" :items="getBusStopsSuggestionsDestination"
        @update:modelValue="handleEmit()" v-if="props.suggestsDestination"></v-autocomplete>
    <v-autocomplete label="Start" v-model="inputValue" :items="getBusStopsSuggestions" v-else></v-autocomplete>

</template>
