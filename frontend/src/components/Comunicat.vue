<template>
    <Message :severity="props.severity" :life="2000" @close="handleChangeShouldBeDisplayed"
        @life-end="handleChangeShouldBeDisplayed" :sticky="false">
        {{
            props.message
        }}
    </Message>
</template>

<script setup>
import Message from 'primevue/message';
const props = defineProps(['severity', 'message'])
const emit = defineEmits(['handleChangeShouldBeDisplayed'])
const handleChangeShouldBeDisplayed = () => {
    emit('handleChangeShouldBeDisplayed')
}
</script>
