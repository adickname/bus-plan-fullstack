<script setup>
import RadioButton from 'primevue/radiobutton';
import { ref } from 'vue';
import { useCompaniesStore } from '@/store/companiesStore';
import { useOrderStore } from '@/store/orderStore';
import { watch } from 'vue';
const orderStore = useOrderStore()
const { changeCompany } = orderStore
const companiesStore = useCompaniesStore()
const { getCompaniesToOrder, findCompaniesToOrder } = companiesStore
const companies = ref(getCompaniesToOrder)
const selectedComapny = ref("")
watch(selectedComapny, (newValue) => {
    console.log(newValue)
    changeCompany(newValue)
})
</script>
<template>
    <v-col cols="12" md="4">
        <template v-for="company in companies">
            <div class="flex flex-wrap gap-3">
                <div class="flex align-items-center">
                    <RadioButton v-model="selectedComapny" :inputId="company" name="company" :value="company"
                        class="company" :unstyled="true" :pt="{ input: { class: 'w-6 h-6' } }" />
                    <label :for="company" class="ml-2">{{ company }}</label>
                </div>
            </div>
        </template>
    </v-col>
</template>
