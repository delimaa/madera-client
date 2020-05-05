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

        <div v-if="user" class="row items-center">
          <q-btn-dropdown color="white" text-color="primary" icon="face" :label="shortLogin">
            <q-list separator>
              <q-item clickable>
                <q-item-section side>
                  <q-icon name="portrait" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Voir le profil</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-btn
                  unelevated
                  label="Déconnexion"
                  icon="exit_to_app"
                  color="primary"
                  @click="disconnect"
                  :loading="disconnectLoading"
                />
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
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
          <q-item :inset-level="1" exact to="/projets">
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
          <q-item :inset-level="1" exact to="/clients">
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
import { SessionStorage } from "quasar";

export default {
  data() {
    return {
      leftDrawerOpen: false,
      user: null,
      disconnectLoading: false
    };
  },
  computed: {
    shortLogin() {
      if (!this.user) return;

      const { login } = this.user;

      if (login.length > 10) return login.slice(0, 10) + "...";

      return login;
    }
  },
  methods: {
    async disconnect() {
      this.disconnectLoading = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.disconnectLoading = false;
      SessionStorage.remove("user");
      this.$router.push("/auth");
    }
  },
  beforeCreate() {
    const user = SessionStorage.getItem("user");

    if (!user) this.$router.replace("/auth");
  },
  mounted() {
    this.user = SessionStorage.getItem("user");
  }
};
</script>
