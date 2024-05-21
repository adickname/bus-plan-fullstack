<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { logout, isAuthenticated, user } = useAuth0();

const logoutHandle = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="logoutHandle()" v-if="isAuthenticated" id="logOut">
          {{ t("nav.logOut") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
