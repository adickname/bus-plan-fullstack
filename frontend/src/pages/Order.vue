<script setup>
import { ref, defineModel } from "vue";
import RadioButton from 'primevue/radiobutton';
import Calendar from 'primevue/calendar';
import Login from "./Login.vue"
import { order } from "@/functions/order";
const nameModel = defineModel('name')
const surnameModel = defineModel('surname')
const endModel = defineModel('end')
const startModel = defineModel('start')
const ageModel = defineModel('age')
const dateIssueModel = defineModel('dateIssue')
const companies = ref([])
const companyRef = ref()
const isLogged = ref(false)
const oneWayRef = ref()
const typeTicketRef = ref()
const form = ref();

const setIsLogged = () => {
    if (sessionStorage.getItem("logged")) {
        isLogged.value = true
    }
}
setIsLogged()

const handleOrder = () => {
    order(companyRef.value, oneWayRef.value, typeTicketRef.value, ageModel.value, nameModel.value, endModel.value, startModel.value, surnameModel.value, dateIssueModel.value)
    form._value.reset
}
const findCompanies = async () => {
    companies.value = [];
    try {
        const res = await fetch("http://localhost:5170/api/schedules/bus-stops", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ end: endModel.value, start: startModel.value }),
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
        sessionStorage.setItem("ticket-data", JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }
}


</script>
<template>
    <v-form ref="form">
        <v-container v-if="!isLogged">
            <p>You must be logged to use this subpage</p>
            <Login onSubPage="true" @set-is-logged-in-parent="setIsLogged"></Login>
        </v-container>
        <v-container v-else>
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
                <v-col cols="12" md="4">
                    <v-text-field v-model="startModel" label="Początek trasy" hide-details required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="endModel" label="koniec trasy" hide-details required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="typeTicketRef" inputId="day" name="typeTicket" value="day" />
                            <label for="day" class="ml-2">Jednodniowy</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="typeTicketRef" inputId="month" name="typeTicket" value="month" />
                            <label for="month" class="ml-2">Miesięczny</label>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="oneWayRef" inputId="oneWay" name="oneWay" value="true" />
                            <label for="oneWay" class="ml-2">W jedną stronę</label>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="oneWayRef" inputId="round-trip" name="oneWay" value="false" />
                            <label for="round-trip" class="ml-2">W obie strony</label>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <template v-if="typeTicketRef">
                    <template v-if="typeTicketRef === 'day' || typeTicketRef === 'week'">
                        <v-col cols="12" md="4">
                            <p>Begin:</p>
                            <Calendar v-model="dateIssueModel" showIcon :showOnFocus="false" date-format="mm/dd/yy" />
                        </v-col>
                    </template>
                    <template v-if="typeTicketRef === 'month'">
                        <v-col cols="12" md="4">
                            <p>Begin</p>
                            <Calendar v-model="dateIssueModel" showIcon :showOnFocus="false" view="month"
                                date-format="mm/yy" />
                        </v-col>
                    </template>
                </template>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <template v-for="company in companies">
                        <div class="flex flex-wrap gap-3">
                            <div class="flex align-items-center">
                                <RadioButton v-model="companyRef" :inputId="company" name="company" :value="company" />
                                <label :for="company" class="ml-2">{{ company }}</label>
                            </div>
                        </div>
                    </template>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn type="reset">
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
    <p>{{ nameModel }}</p>
    <p>{{ surnameModel }}</p>
    <p>{{ startModel }}</p>
    <p>{{ endModel }}</p>
    <p>{{ ageModel }}</p>
</template>
