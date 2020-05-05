<template>
  <q-layout>
    <q-page-container
      class="q-pa-md"
      style="background-image: url('statics/drawer_background.png'); background-size: cover;"
    >
      <img src="statics/full_logo.png" style="position: absolute" width="200px" />
      <q-page class="flex flex-center">
        <q-card flat bordered style="max-width: 400px;">
          <q-card-section class="row items-center">
            <q-icon name="lock" class="on-left" size="md" />
            <span class="text-h6">Authentification</span>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="row q-col-gutter-md">
            <q-input class="col-xs-12" v-model="login" filled label="Login" />
            <q-input
              v-model="password"
              filled
              label="Mot de passe"
              :type="isPwd ? 'password' : 'text'"
              class="col-xs-12"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions>
            <q-btn
              label="S'authentifier"
              icon="lock_open"
              color="primary"
              unelevated
              :disable="isAuthBtnDisabled"
              @click="auth"
              :loading="authLoading"
            />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { SessionStorage, Notify } from "quasar";

export default {
  data() {
    return {
      login: "",
      password: "",
      isPwd: true,
      authLoading: false
    };
  },
  computed: {
    isAuthBtnDisabled() {
      return !this.login || !this.password;
    }
  },
  methods: {
    async auth() {
      this.authLoading = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.authLoading = false;

      SessionStorage.set("user", {
        login: this.login,
        password: this.password
      });

      Notify.create({
        color: "primary",
        icon: "tag_faces",
        message: `Bienvenue ${this.login}`
      });

      this.$router.replace("/");
    }
  }
};
</script>

<style>
</style>