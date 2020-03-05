<template>
  <q-page padding>
    <div v-if="!$q.loading.isActive" class="row q-col-gutter-lg">
      <div class="col-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Accueil" icon="home" to="/" />
          <q-breadcrumbs-el label="Projets" icon="assignment" />
          <q-breadcrumbs-el label="Liste des projets" icon="list" />
        </q-breadcrumbs>
      </div>

      <div class="col-12">
        <span class="text-h4">Projets</span>
      </div>

      <div class="col-12">
        <q-table
          flat
          bordered
          :loading="loading"
          row-key="id"
          :data="projets"
          :columns="columns"
          :rows-per-page-options="[5, 10, 25, 50]"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input
              filled
              dense
              debounce="300"
              v-model="filter"
              clearable
              placeholder="Rechercher..."
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="{row}">
            <q-td auto-width>
              <q-btn
                icon="info"
                color="primary"
                dense
                flat
                @click="$router.push(`/projets/${row.id}`)"
              />
            </q-td>
          </template>
        </q-table>
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
      projets: [],
      loading: false,
      filter: "",
      columns: [
        {
          name: "actions"
        },
        {
          name: "nom",
          field: "nom",
          label: "Nom",
          align: "left"
        },
        {
          name: "date",
          field: "date",
          label: "Date",
          align: "left",
          format: v => formatDate(v, "DD/MM/YYYY")
        },
        {
          name: "client",
          field: "client",
          label: "Client",
          align: "left",
          format: v => `${v.nom} ${v.prenom}`
        },
        {
          name: "gamme",
          field: "gamme",
          label: "Gamme",
          align: "left",
          format: v => v.nom
        },
        {
          name: "modules",
          field: "modules",
          label: "Nombre de modules",
          align: "left",
          format: v => v.length
        }
      ]
    };
  },
  methods: {},
  async created() {
    this.$q.loading.show();

    const { data: projets } = await this.$axios.get(
      "projets?join=client&join=gamme&join=modules"
    );

    this.projets = projets;

    this.$q.loading.hide();
  }
};
</script>

<style>
</style>