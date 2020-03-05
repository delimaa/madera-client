<template>
  <q-page padding>
    <q-form ref="form" greedy @reset="reset" @submit="submit" class="row q-col-gutter-lg">
      <div class="col-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Accueil" icon="home" to="/" />
          <q-breadcrumbs-el label="Clients" icon="supervisor_account" />
          <q-breadcrumbs-el label="Nouveau Client" icon="fiber_new" to="/creer-client" />
        </q-breadcrumbs>
      </div>

      <div class="col-12">
        <q-toolbar>
          <q-toolbar-title class="text-h4">Ajouter un client</q-toolbar-title>
          <q-btn
            type="submit"
            label="Ajouter le client"
            icon="add"
            color="primary"
            :loading="loading"
          />
        </q-toolbar>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <span class="text-h6">Informations générales</span>
          </q-card-section>

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-6">
                <q-input v-model="client.nom" label="Nom" filled :rules="rules.client.nom" />
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-input
                  v-model="client.prenom"
                  label="Prénom"
                  filled
                  :rules="rules.client.prenom"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <span class="text-h6">Adresse</span>
          </q-card-section>

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model="adresse.numero"
                  :rules="rules.adresse.numero"
                  label="Numéro"
                  filled
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input v-model="adresse.voie" :rules="rules.adresse.voie" label="Voie" filled />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model="adresse.codePostal"
                  :rules="rules.adresse.codePostal"
                  label="Code Postal"
                  filled
                />
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input v-model="adresse.ville" :rules="rules.adresse.ville" label="Ville" filled />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      client: {
        nom: "",
        prenom: ""
      },
      adresse: {
        numero: "",
        voie: "",
        codePostal: "",
        ville: ""
      },
      rules: {
        client: {
          nom: [v => !!v || "Nom requis"],
          prenom: [v => !!v || "Prénom requis"]
        },
        adresse: {
          numero: [v => !!v || "Numéro requis"],
          voie: [v => !!v || "Voie requise"],
          codePostal: [v => !!v || "Code postal requis"],
          ville: [v => !!v || "Ville requise"]
        }
      }
    };
  },
  methods: {
    reset() {
      this.client = { nom: "", prenom: "" };
      this.adresse = { numero: "", voie: "", codePostal: "", ville: "" };
    },
    async submit() {
      const client = this.client;
      client.adresse = this.adresse;

      this.loading = true;

      try {
        await this.$axios.post("clients", client);
      } catch (e) {
        this.$q.notify({ type: "negative", message: e.message });
        this.loading = false;
        return;
      }

      this.$q.notify({ type: "positive", message: "Client crée avec succès" });

      this.$refs.form.reset();

      this.loading = false;
    }
  }
};
</script>

<style>
</style>