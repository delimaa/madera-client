<template>
  <q-page padding>
    <div v-if="!$q.loading.isActive" class="row q-col-gutter-lg">
      <div class="col-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Accueil" icon="home" to="/" />
          <q-breadcrumbs-el label="Projets" icon="assignment" />
          <q-breadcrumbs-el label="Projet" icon="assessment" />
        </q-breadcrumbs>
      </div>

      <div class="col-12">
        <span class="text-h4">Projet</span>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <span class="text-h6">Projet</span>
          </q-card-section>

          <q-card-section>
            <q-markup-table separator="cell" flat>
              <tbody>
                <tr>
                  <td>Nom</td>
                  <td>{{projet.nom}}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{{formatDate(projet.date, "DD/MM/YYYY")}}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <span class="text-h6">Client</span>
          </q-card-section>

          <q-card-section>
            <q-markup-table separator="cell" flat>
              <tbody>
                <tr>
                  <td>Nom</td>
                  <td>{{projet.client.nom}}</td>
                </tr>
                <tr>
                  <td>Prenom</td>
                  <td>{{projet.client.prenom}}</td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td>{{projet.client.adresse.numero}} {{projet.client.adresse.voie}} {{projet.client.adresse.codePostal}} {{projet.client.adresse.ville}}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <span class="text-h6">Gamme</span>
          </q-card-section>

          <q-card-section>
            <q-markup-table separator="cell" flat>
              <tbody>
                <tr>
                  <td>Nom</td>
                  <td>{{projet.gamme.nom}}</td>
                </tr>
                <tr>
                  <td>Finition</td>
                  <td>{{projet.gamme.finition}}</td>
                </tr>
                <tr>
                  <td>Isolant</td>
                  <td>{{projet.gamme.isolant}}</td>
                </tr>
                <tr>
                  <td>Couverture</td>
                  <td>{{projet.gamme.couverture}}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-card-section class="bg-primary text-white">
            <span class="text-h6">Modules</span>
          </q-card-section>

          <q-card-section>
            <q-markup-table separator="cell" flat>
              <tbody>
                <tr>
                  <th>Module</th>
                  <th>Dimensions</th>
                </tr>
                <tr v-for="(mod, i) in projet.modules" :key="i">
                  <td>{{mod.nom}}</td>
                  <td>{{mod.dimensions}}</td>
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
import { date } from "quasar";
const { formatDate } = date;

export default {
  data() {
    return {
      projet: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: { formatDate },
  async created() {
    this.$q.loading.show();

    const { data: projet } = await this.$axios.get(
      `projets/${this.id}?join=client&join=gamme&join=modules`
    );

    this.projet = projet;

    this.$q.loading.hide();
  }
};
</script>

<style>
</style>