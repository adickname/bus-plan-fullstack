<script setup>
import AutoComplete from 'primevue/autocomplete';
const props = defineProps(['suggestions'])
const emit = defineEmits(['updateState'])
const inputValue = defineModel('inputValue')
const handleEmit = () => {
    emit('update-state', inputValue.value)
}
</script>

<template>
    <AutoComplete v-model="inputValue" :suggestions="props.suggestions" @change="handleEmit()">
        <template #option="slotProps">
            <div class="flex align-options-center">
                <div>{{ slotProps.option.name }}</div>
            </div>
        </template>
    </AutoComplete>
</template>
