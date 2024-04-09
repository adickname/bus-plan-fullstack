<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps(['schedule'])
</script>

<template>
    <template v-for="row in props.schedule">
        <v-card :title="`${row.start}-${row.end}`" :subtitle="`${row.company}`" variant="outlined" margin="5px">
            <p v-for="place in row.places">
                {{ place.place }} |<template v-for="hour in place.hours">{{ hour }}|</template>
            </p>
        </v-card>
    </template>
</template>
<style scoped>
p {
    padding: 10px;
}
</style>