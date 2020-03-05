<template>
  <q-page padding>
    <div v-if="!$q.loading.isActive" class="row q-col-gutter-lg">
      <div class="col-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Accueil" icon="home" to="/" />
          <q-breadcrumbs-el label="Clients" icon="supervisor_account" />
          <q-breadcrumbs-el label="Client" icon="account_box" :to="`/clients/${id}`" />
        </q-breadcrumbs>
      </div>

      <div class="col-12">
        <span class="text-h4">Client</span>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <span class="text-h6">Informations générales</span>
          </q-card-section>

          <q-card-section>
            <q-markup-table separator="cell" flat>
              <tbody>
                <tr>
                  <td>Nom</td>
                  <td>{{client.nom}}</td>
                </tr>
                <tr>
                  <td>Prenom</td>
                  <td>{{client.prenom}}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <span class="text-h6">Adresse</span>
          </q-card-section>

          <q-card-section>
            <q-markup-table separator="cell" flat>
              <tbody>
                <tr>
                  <td>Numéro</td>
                  <td>{{client.adresse.numero}}</td>
                </tr>
                <tr>
                  <td>Voie</td>
                  <td>{{client.adresse.voie}}</td>
                </tr>
                <tr>
                  <td>Code postal</td>
                  <td>{{client.adresse.codePostal}}</td>
                </tr>
                <tr>
                  <td>Ville</td>
                  <td>{{client.adresse.ville}}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      client: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  async created() {
    this.$q.loading.show();

    const { data } = await this.$axios.get(`clients/${this.id}`);
    this.client = data;

    this.$q.loading.hide();
  }
};
</script>

<style>
</style>