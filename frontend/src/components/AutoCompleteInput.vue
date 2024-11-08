<script setup>
import { useScheduleStore } from "@/store/scheduleStore";
import { watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const scheduleStore = useScheduleStore();
const {
  getBusStopsSuggestions,
  getBusStopsSuggestionsDestination,
  changeBusStopsSuggestionsDestination,
} = scheduleStore;
import { useFindBusStore } from "@/store/findBusStore";
const findBusStore = useFindBusStore();
const { changeStartModel, changeEndModel } = findBusStore;
const props = defineProps(["suggestsDestination"]);
const emit = defineEmits(["updateState"]);
const inputValue = defineModel("inputValue");

watch(inputValue, (newValue) => {
  if (props.suggestsDestination) {
    changeEndModel(newValue);
  } else {
    changeBusStopsSuggestionsDestination(newValue);
    changeStartModel(newValue);
  }
});
</script>

<template>
  <v-autocomplete
    v-model="inputValue"
    :label="t('form.destination')"
    :items="getBusStopsSuggestionsDestination"
    v-if="props.suggestsDestination"
  ></v-autocomplete>
  <v-autocomplete
    :label="t('form.start')"
    v-model="inputValue"
    :items="getBusStopsSuggestions"
    v-else
  ></v-autocomplete>
</template>
