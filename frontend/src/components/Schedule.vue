<script setup>
import { defineProps, ref } from 'vue';
import Card from 'primevue/card';
const props = defineProps(['schedule'])
</script>

<template>
    <template v-if="props.schedule[0].message">
        {{ props.schedule[0].message }}
    </template>
    <template v-for="row in props.schedule[0]" v-else>
        <Card :pt="{ root: { class: 'm-2' } }">
            <template #title>{{ row.start }}---{{ row.end }}</template>
            <template #subtitle>{{ row.company }}</template>
            <template #content>
                <p v-for="place in row.places">
                    {{ place.place }} |<template v-for="hour in place.hours">{{ hour }}|</template>
                </p>
            </template>
        </Card>
    </template>
</template>
