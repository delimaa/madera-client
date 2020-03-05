<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-uppercase">
          Madera -
          <span class="text-weight-light">Projets & Devis</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-style="background-image: url('statics/drawer_background.png'); background-size: cover;"
    >
      <q-list>
        <q-item class="row justify-center">
          <img src="statics/full_logo.png" width="180px" />
        </q-item>

        <q-item-label header>Menu</q-item-label>

        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Accueil</q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          icon="assignment"
          label="Projets"
          caption="Voir ou initier un projet"
        >
          <q-item :inset-level="1" to="/projets">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>Liste des projets</q-item-section>
          </q-item>

          <q-item :inset-level="1" to="/creer-projet">
            <q-item-section avatar>
              <q-icon name="fiber_new" />
            </q-item-section>
            <q-item-section>Initier un projet</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="supervisor_account"
          label="Clients"
          caption="Lister ou ajouter"
        >
          <q-item :inset-level="1" to="/clients">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>Liste des clients</q-item-section>
          </q-item>

          <q-item :inset-level="1" to="/creer-client">
            <q-item-section avatar>
              <q-icon name="fiber_new" />
            </q-item-section>
            <q-item-section>Ajouter un client</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view style="max-width: 800px;" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
