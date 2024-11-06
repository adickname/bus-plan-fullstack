<script setup>
import Button from "primevue/button";
import { useAuth0 } from "@auth0/auth0-vue";
import Card from "primevue/card";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useMessageStore } from "@/store/messageStore";
const messageStore = useMessageStore();
const { changeMessage, changeSeverity, changeShouldBeDisplayed } = messageStore;
const { t } = useI18n();
const ticketsRef = ref([]);
const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
const ticketsStatus = ref("active");

const findTickets = async () => {
  if (user.value) {
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
      changeShouldBeDisplayed(true);
      changeMessage(error.message);
      changeSeverity("error");
    }
  } else {
    await login();
  }
};

const changeTicketsStatus = (status) => {
  ticketsStatus.value = status;
  findTickets();
};

const login = async () => {
  if (!isLoading.value && !isAuthenticated.value) {
    await loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.href,
      },
    });
  }
};

watch([isAuthenticated, user], ([auth, userData]) => {
  if (auth && userData) {
    findTickets();
  }
});

const initAfterEntry = () => {
  if (!isAuthenticated.value) {
    login();
  } else {
    findTickets();
  }
};

initAfterEntry();
</script>

<template>
  <v-container v-if="isAuthenticated">
    <Button
      label="Active"
      class="mx-2"
      @click="changeTicketsStatus('active')"
    ></Button>
    <Button
      label="All"
      class="mx-2"
      @click="changeTicketsStatus('all')"
    ></Button>
    <Button
      label="Expired"
      class="mx-2"
      @click="changeTicketsStatus('expired')"
    ></Button>
  </v-container>
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
          const ticketTime = new Date(
            dateArray[0],
            dateArray[1] - 1,
            dateArray[2]
          ).getTime();
          const userTime = new Date().getTime();
          if (ticketsStatus === 'all') {
            return true;
          } else if (ticketsStatus === 'expired') {
            return userTime > ticketTime;
          } else {
            return userTime <= ticketTime;
          }
        })"
        :key="ticket.id"
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
            <p>{{ t("form.name") }}: {{ ticket.name }}</p>
            <p>{{ t("form.surname") }}: {{ ticket.surname }}</p>
            <p>{{ t("form.start") }}: {{ ticket.start }}</p>
            <p>{{ t("tickets.price") }}: {{ ticket.fakePrice }}</p>
            <p>{{ t("form.destination") }}: {{ ticket.end }}</p>
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
