<template>
    <Message :severity="props.severity" :life="2000" @close="setDisplayMessage" @life-end="setDisplayMessage"
        :sticky="false">
        {{
            props.message
        }}
    </Message>
</template>

<script setup>
import Message from 'primevue/message';
const props = defineProps(['severity', 'message'])
const emit = defineEmits(['setDisplayMessage'])
const setDisplayMessage = () => {
    emit('setDisplayMessage', false)
}
</script>
