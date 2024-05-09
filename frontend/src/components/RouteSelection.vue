<script setup>
import RadioButton from 'primevue/radiobutton';
import { watch, ref } from 'vue';
import { useOrderStore } from '@/store/orderStore';
const orderStore = useOrderStore()
const { changeOneWay } = orderStore
const oneWay = ref("")
watch(oneWay, (newValue) => {
    changeOneWay(newValue)
})
</script>

<template>
    <v-col cols="12" md="4">
        <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center">
                <RadioButton v-model="oneWay" inputId="oneWay" name="oneWay" value="true"
                    :pt="{ input: { class: 'w-6 h-6' } }" :unstyled="true" />
                <label for="oneWay" class="ml-2">W jedną stronę</label>
            </div>
        </div>
        <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center">
                <RadioButton v-model="oneWay" inputId="round-trip" name="oneWay" value="false"
                    :pt="{ input: { class: 'w-6 h-6' } }" :unstyled="true" />
                <label for="round-trip" class="ml-2">W obie strony</label>
            </div>
        </div>
    </v-col>
</template>
