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
/* import { useMessageStore } from '@/store/messageStore';
const messageStore = useMessageStore()
const { changeShouldBeDisplayed } = messageStore */
const props = defineProps(['severity', 'message'])
const emit = defineEmits(['handleChangeShouldBeDisplayed'])
const handleChangeShouldBeDisplayed = () => {
    emit('handleChangeShouldBeDisplayed')
}
</script>
