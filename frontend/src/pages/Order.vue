<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, defineModel } from "vue";
import RadioButton from 'primevue/radiobutton';
import Calendar from 'primevue/calendar';
import { order } from "@/functions/order";
import StartDestinationInputs from '@/components/StartDestinationInputs.vue';
import { useFindBusStore } from "@/store/findBusStore";
const findBusStore = useFindBusStore();
const { getStart,
    getDestination } = findBusStore
const nameModel = defineModel('name')
const surnameModel = defineModel('surname')
const endModel = ref(getDestination)
const startModel = ref(getStart)
const ageModel = defineModel('age')
const dateIssueModel = defineModel('dateIssue')
const companies = ref([])
const companyRef = ref()
const oneWayRef = ref()
const typeTicketRef = ref()
const form = ref();
const emit = defineEmits(["setDisplayMessage", "setMessageRef", "setSeverityRef"]);
const setPropertiesOfMessage = (message, severity) => {
    emit("setDisplayMessage", true)
    emit("setMessageRef", message)
    emit("setSeverityRef", severity)
};

const resetInputs = () => {
    dateIssueModel.value = ''
    companies.value = ''
    companyRef.value = ''
    oneWayRef.value = ''
    typeTicketRef.value = ''
}

const handleOrder = () => {
    console.log(getDestination)
    if (companyRef.value && oneWayRef.value && typeTicketRef.value && ageModel.value && nameModel.value && getDestination.value && getStart.value && surnameModel.value && dateIssueModel.value) {
        const res = order(companyRef.value, oneWayRef.value, typeTicketRef.value, ageModel.value, nameModel.value, getDestination.value, getStart.value, surnameModel.value, dateIssueModel.value, user.value.sub)
        setPropertiesOfMessage("adding", "info")
        form._value.reset()
        resetInputs()
    } else {
        setPropertiesOfMessage("not enough data", 'info')
    }

}

const findCompanies = async () => {
    companies.value = [];
    console.log(getStart.value)
    try {
        const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/schedules/bus-stops`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ end: getDestination.value, start: getStart.value }),
        });
        const data = await res.json();
        data.forEach((element) => {
            let isFree = true;
            companies.value.forEach((elementCompanies) => {
                if (elementCompanies === element.company) {
                    isFree = false;
                }
            });
            if (isFree) {
                companies.value.push(element.company);
            }
        });
    } catch (error) {
        setPropertiesOfMessage(error.message, "error")
    }
}

const { user } = useAuth0()

</script>
<template>
    <v-form ref="form">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="nameModel" label="Imie" hide-details required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="surnameModel" label="Nazwisko" hide-details required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="ageModel" label="Wiek" hide-details required></v-text-field>
                </v-col>
                <StartDestinationInputs></StartDestinationInputs>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="typeTicketRef" inputId="day" name="typeTicket" value="day"
                                :pt="{ input: { class: 'w-6 h-6' } }" :unstyled="true" />
                            <label for="day" class="ml-2">Jednodniowy</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="typeTicketRef" inputId="month" name="typeTicket" value="month"
                                :pt="{ input: { class: 'w-6 h-6' } }" :unstyled="true" />
                            <label for="month" class="ml-2">Miesięczny</label>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="oneWayRef" inputId="oneWay" name="oneWay" value="true"
                                :pt="{ input: { class: 'w-6 h-6' } }" :unstyled="true" />
                            <label for="oneWay" class="ml-2">W jedną stronę</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="oneWayRef" inputId="round-trip" name="oneWay" value="false"
                                :pt="{ input: { class: 'w-6 h-6' } }" :unstyled="true" />
                            <label for="round-trip" class="ml-2">W obie strony</label>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <template v-if="typeTicketRef">
                    <template v-if="typeTicketRef === 'day'">
                        <v-col cols="12" md="4">
                            <p>Begin:</p>
                            <Calendar v-model="dateIssueModel" :pt="{ root: { class: 'border-2 border-white' } }"
                                showIcon :showOnFocus="false" date-format="mm/dd/yy" />
                        </v-col>
                    </template>
                    <template v-if="typeTicketRef === 'month'">
                        <v-col cols="12" md="4">
                            <p>Begin</p>
                            <Calendar v-model="dateIssueModel" :pt="{ root: { class: 'border-2 border-white' } }"
                                showIcon :showOnFocus="false" view="month" date-format="mm/yy" />
                        </v-col>
                    </template>
                </template>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <template v-for="company in companies">
                        <div class="flex flex-wrap gap-3">
                            <div class="flex align-items-center">
                                <RadioButton v-model="companyRef" :inputId="company" name="company" :value="company"
                                    class="company" :unstyled="true" :pt="{ input: { class: 'w-6 h-6' } }" />
                                <label :for="company" class="ml-2">{{ company }}</label>
                            </div>
                        </div>
                    </template>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn type="reset" @click="resetInputs()">
                        clear
                    </v-btn>
                    <v-btn @click="findCompanies()" v-if="companies.length === 0">
                        Find companies
                    </v-btn>
                    <v-btn @click="handleOrder()" v-else-if="companies.length > 0">
                        order
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

    </v-form>
</template>
