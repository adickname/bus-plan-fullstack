<script setup>
import { defineProps, ref } from "vue";
import Card from "primevue/card";
const props = defineProps(["schedule"]);
</script>

<template>
  <template v-if="props.schedule[0].message">
    <div class="p-4">{{ props.schedule[0].message }}</div>
  </template>
  <template v-for="row in props.schedule[0]" v-else>
    <div
      class="box-border max-w-screen w-screen md:max-w-fit flex flex-wrap md:justify-between md:text-lg mt-2 px-2 py-2"
    >
      <Card
        :pt="{
          root: { class: 'p-1 px-1 w-full' },
          body: { class: 'flex flex-col justify-center' },
          caption: { class: 'flex flex-col justify-center' },
        }"
      >
        <template #title>{{ row.start }}---{{ row.end }}<br /></template>
        <template #subtitle>
          <p>{{ row.company }}</p>
        </template>
        <template #content>
          <div v-for="place in row.places" class="text-wrap">
            {{ place.place }} |<template v-for="hour in place.hours"
              >{{ hour }}|</template
            >
          </div>
        </template>
      </Card>
    </div>
  </template>
</template>
