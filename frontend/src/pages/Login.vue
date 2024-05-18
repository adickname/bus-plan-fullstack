<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { logout, isAuthenticated, user } = useAuth0()

const logoutHandle = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
}

</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn @click="logoutHandle()" v-if="isAuthenticated" id="logOut"> log out </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
