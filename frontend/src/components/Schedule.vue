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
        <div class="flex flex-wrap   md:justify-between md:m-6 md:text-lg">
            <Card
                :pt="{ root: { class: 'p-4 px-4' }, body: { class: 'flex flex-col min-w-96 justify-center' }, caption: { class: 'flex flex-col justify-center' } }">
                <template #title>{{ row.start }}---{{ row.end }}<br></template>
                <template #subtitle>
                    <p>{{ row.company }}</p>
                </template>
                <template #content>
                    <p v-for="place in row.places">
                        {{ place.place }} |<template v-for="hour in place.hours">{{ hour }}|</template>
                    </p>
                </template>
            </Card>
        </div>
    </template>
</template>
