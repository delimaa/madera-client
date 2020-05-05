<template>
  <q-page padding>
    <div v-if="!$q.loading.isActive" class="row q-col-gutter-lg">
      <div class="col-12">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Accueil" icon="home" to="/" />
          <q-breadcrumbs-el label="Clients" icon="supervisor_account" />
          <q-breadcrumbs-el label="Liste des clients" icon="list" to="/clients" />
        </q-breadcrumbs>
      </div>

      <div class="col-12">
        <span class="text-h4">Clients</span>
      </div>

      <div class="col-12">
        <q-table
          flat
          bordered
          :loading="loading"
          row-key="id"
          :data="clients"
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
                @click="$router.push(`/clients/${row.id}`)"
              />
              <q-btn class="q-ml-sm" icon="delete" color="red" dense flat @click="remove(row.id)" />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      clients: [],
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
          align: "left",
          sortable: true
        },
        {
          name: "prenom",
          field: "prenom",
          label: "Prenom",
          align: "left",
          sortable: true
        }
      ]
    };
  },
  methods: {
    async remove(id) {
      if (!confirm("Êtes-vous sur de vouloir supprimer le client ?")) {
        return;
      }

      this.loading = true;

      await this.$axios.delete(`clients/${id}`);

      this.clients = this.clients.filter(client => client.id !== id);

      this.loading = false;

      this.$q.notify({
        type: "positive",
        message: "Client supprimé avec succès"
      });
    }
  },
  async created() {
    this.$q.loading.show();

    const { data } = await this.$axios.get("clients");
    this.clients = data;

    this.$q.loading.hide();
  }
};
</script>

<style>
</style>