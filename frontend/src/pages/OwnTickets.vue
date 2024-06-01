<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import Card from "primevue/card";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const ticketsRef = ref([]);
const { user } = useAuth0();

const emit = defineEmits([
  "setDisplayMessage",
  "setMessageRef",
  "setSeverityRef",
]);
const setPropertiesOfMessage = (message, severity) => {
  emit("setDisplayMessage", true);
  emit("setMessageRef", message);
  emit("setSeverityRef", severity);
};

const findTcikets = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/api/orders/find`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ owner: user.value.sub }),
      }
    );
    const tickets = await res.json();
    ticketsRef.value = tickets;
  } catch (error) {
    setPropertiesOfMessage(error.message, "error");
  }
};
findTcikets();
</script>
<template>
  <button>Actual</button>
  <v-container>
    <p v-if="ticketsRef.length === 0">
      {{ t("tickets.noTickets") }}
    </p>
    <div
      class="flex flex-wrap justify-center md:justify-between md:m-6 md:text-lg"
    >
      <div
        class="m-4"
        v-for="ticket in ticketsRef.filter((ticket) => {
          let dateArray = ticket.dateOfExpiry.split('-');
          console.log(dateArray);
          const ticketTime = new Date(
            dateArray[0],
            dateArray[1] - 1,
            dateArray[2]
          ).getTime();
          const userTime = new Date().getTime();
          if (ticketTime >= userTime) {
            return ticket;
          } else {
          }
        })"
      >
        <Card
          class="ticket"
          :pt="{
            root: { class: 'p-2 px-4' },
            body: { class: 'flex flex-col' },
            caption: { class: 'flex justify-center' },
          }"
        >
          <template #title>{{ ticket.company }}</template>
          <template #content>
            <p>{{ t("form.name") }}:{{ ticket.name }}</p>
            <p>{{ t("form.surname") }}:{{ ticket.surname }}</p>
            <p>{{ t("form.start") }}:{{ ticket.start }}</p>
            <p>{{ t("tickets.price") }}:{{ ticket.fakePrice }}</p>
            <p>{{ t("form.destination") }}:{{ ticket.end }}</p>
            <p>{{ t("tickets.dateOfIssue") }}: {{ ticket.dateOfIssue }}</p>
            <p>{{ t("tickets.dateOfExpiry") }}: {{ ticket.dateOfExpiry }}</p>
            <p v-if="ticket.oneWay">{{ t("form.oneWay") }}</p>
            <p v-else>{{ t("form.roundTrip") }}</p>
          </template>
        </Card>
      </div>
    </div>
  </v-container>
</template>
