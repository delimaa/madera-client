<template>
  <q-page padding>
    <div v-if="!$q.loading.isActive" class="row q-col-gutter-lg">
      <div class="col-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Accueil" icon="home" to="/" />
          <q-breadcrumbs-el label="Projets" icon="assignment" />
          <q-breadcrumbs-el label="Initier Projet" icon="fiber_new" />
        </q-breadcrumbs>
      </div>

      <div class="col-12">
        <span class="text-h4">Initier un projet</span>
      </div>

      <div class="col-12">
        <q-stepper ref="stepper" color="primary" v-model="step" animated flat bordered>
          <q-step
            :name="1"
            title="Client"
            active-icon="supervisor_account"
            icon="supervisor_account"
            :done="step > 1"
          >
            <client-selector v-model="client" :clients="clients"></client-selector>
          </q-step>

          <q-step
            :name="2"
            title="Projet"
            active-icon="assignment"
            icon="assignment"
            :done="step > 2"
          >
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input filled label="Nom" v-model="projet.nom" />
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-input
                  filled
                  v-model="projet.date"
                  label="Date"
                  mask="##/##/####"
                  fill-mask="__/__/____"
                  :rules="dateRules"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="projet.date"
                          @input="() => $refs.qDateProxy.hide()"
                          mask="DD/MM/YYYY"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-step>

          <q-step :name="3" title="Gamme" icon="details" active-icon="details" :done="step > 3">
            <gamme-selector v-model="gamme" :gammes="gammes"></gamme-selector>
          </q-step>

          <q-step
            :name="4"
            title="Personnalisation"
            icon="edit"
            active-icon="edit"
            :done="step > 4"
          >
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6 col-lg-4">
                <finition-selector v-model="gamme.finition"></finition-selector>
              </div>
              <div class="col-xs-12 col-md-6 col-lg-4">
                <isolant-selector v-model="gamme.isolant"></isolant-selector>
              </div>
              <div class="col-xs-12 col-md-6 col-lg-4">
                <couverture-selector v-model="gamme.couverture"></couverture-selector>
              </div>
            </div>
          </q-step>

          <q-step
            :name="5"
            title="Modules"
            active-icon="view_module"
            icon="view_module"
            :done="step > 5"
          >
            <div class="row q-col-gutter-md">
              <div class="col-xs-12" v-for="(mod, i) in modules" :key="i">
                <div class="row q-col-gutter-md">
                  <div class="col-xs-12 col-md-4">
                    <module-category-selector v-model="mod.category" />
                  </div>
                  <div class="col-xs-12 col-md-5">
                    <q-input v-model="mod.nom" label="Module" filled />
                  </div>
                  <div class="col-xs-12 col-md-3">
                    <q-input v-model="mod.dimensions" label="Dimensions" filled />
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <q-btn icon="add" flat dense round color="primary" @click="addModule" />
              </div>
              <div class="col-auto">
                <q-btn icon="remove" flat dense round color="primary" @click="removeModule" />
              </div>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="onStepperNext"
                color="primary"
                :label="step === 5 ? 'Terminer' : 'Continuer'"
                :disable="isStepperNextDisabled"
                :loading="loading"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Retour"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>

      <div class="col-12">
        <div class="row q-gutter-xl">
          <div v-if="Object.keys(client).length" class="col-auto">
            <q-card flat>
              <span class="text-h6">Client</span>
              <q-markup-table flat bordered dense separator="cell">
                <tbody>
                  <q-tr>
                    <q-td auto-width>Nom</q-td>
                    <q-td>{{client.nom}}</q-td>
                  </q-tr>
                  <q-tr>
                    <q-td auto-width>Prénom</q-td>
                    <q-td>{{client.prenom}}</q-td>
                  </q-tr>
                  <q-tr>
                    <q-td auto-width>Adresse</q-td>
                    <q-td>{{client.adresse.numero}} {{client.adresse.voie}} {{client.adresse.codePostal}} {{client.adresse.ville}}</q-td>
                  </q-tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
          <div v-if="!!projet.nom && !!projet.date" class="col-auto">
            <q-card flat>
              <span class="text-h6">Projet</span>
              <q-markup-table flat bordered dense separator="cell">
                <tbody>
                  <q-tr>
                    <q-td auto-width>Nom</q-td>
                    <q-td>{{projet.nom}}</q-td>
                  </q-tr>
                  <q-tr>
                    <q-td auto-width>Date</q-td>
                    <q-td>{{formatDate(projet.date, "DD/MM/YYYY")}}</q-td>
                  </q-tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
          <div v-if="Object.keys(gamme).length" class="col-auto">
            <q-card flat>
              <span class="text-h6">Gamme</span>
              <q-markup-table flat bordered dense separator="cell">
                <tbody>
                  <q-tr>
                    <q-td auto-width>Nom</q-td>
                    <q-td>{{gamme.nom}}</q-td>
                  </q-tr>
                  <q-tr>
                    <q-td auto-width>Finition</q-td>
                    <q-td>{{gamme.finition}}</q-td>
                  </q-tr>
                  <q-tr>
                    <q-td auto-width>Isolant</q-td>
                    <q-td>{{gamme.isolant}}</q-td>
                  </q-tr>
                  <q-tr>
                    <q-td auto-width>Couverture</q-td>
                    <q-td>{{gamme.couverture}}</q-td>
                  </q-tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ClientSelector from "../components/ClientSelector";
import GammeSelector from "../components/GammeSelector";
import FinitionSelector from "../components/FinitionSelector";
import IsolantSelector from "../components/IsolantSelector";
import CouvertureSelector from "../components/CouvertureSelector";
import ModuleCategorySelector from "../components/ModuleCategorySelector";
import { date } from "quasar";
const { formatDate } = date;

export default {
  components: {
    ClientSelector,
    GammeSelector,
    FinitionSelector,
    IsolantSelector,
    CouvertureSelector,
    ModuleCategorySelector
  },
  data() {
    return {
      step: 1,
      client: {},
      clients: [],
      gamme: {},
      gammes: [],
      projet: {
        nom: "",
        date: ""
      },
      modules: [{ nom: "", dimensions: "", category: "" }],
      loading: false,
      dateRules: [v => /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(v || "")]
    };
  },
  computed: {
    isStepperNextDisabled() {
      if (this.step === 1) {
        return Object.keys(this.client).length === 0;
      }

      if (this.step === 2) {
        return !(!!this.projet.nom && !!this.projet.date);
      }

      if (this.step === 3) {
        return Object.keys(this.gamme).length === 0;
      }

      return false;
    }
  },
  methods: {
    formatDate,
    async onStepperNext() {
      if (this.step < 5) {
        this.$refs.stepper.next();
        return;
      }

      this.loading = true;

      this.projet.date = this.projet.date
        .split("/")
        .reverse()
        .join("/");

      const { data: projet } = await this.$axios.post("projets", {
        ...this.projet,
        client: this.client.id,
        gamme: this.gamme.id
      });

      this.modules.forEach(mod => {
        mod.projet = projet.id;
      });

      await this.$axios.post("modules/bulk", { bulk: this.modules });

      this.loading = false;

      this.$q.notify({
        type: "positive",
        message: "Projet crée avec succès"
      });

      this.$router.push(`/projets/${projet.id}`);
    },
    addModule() {
      this.modules.push({ nom: "", dimensions: "", category: "" });
    },
    removeModule() {
      if (this.modules.length > 1) {
        this.modules.pop();
      }
    }
  },
  async created() {
    this.$q.loading.show();
    const { data: clients } = await this.$axios.get("clients");
    this.clients = clients;
    const { data: gammes } = await this.$axios.get("gammes");
    this.gammes = gammes;
    this.$q.loading.hide();
  }
};
</script>

<style>
</style>