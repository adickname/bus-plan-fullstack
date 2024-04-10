<script setup>
import { defineProps, ref } from 'vue';
import Card from 'primevue/card';
const props = defineProps(['schedule'])
</script>

<template>
    <template v-for="row in props.schedule" v-if="!props.schedule.message">
        <Card style="margin: 10px;">
            <template #title>{{ row.start }}---{{ row.end }}</template>
            <template #subtitle>{{ row.company }}</template>
            <template #content>
                <p v-for="place in row.places">
                    {{ place.place }} |<template v-for="hour in place.hours">{{ hour }}|</template>
                </p>
            </template>
        </Card>
    </template>
    <p v-else>
        {{ props.schedule.message }}
    </p>
</template>
<style scoped></style>