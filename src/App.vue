<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { QSpinnerBall } from "quasar";
export default {
  created() {
    this.$q.loading.setDefaults({ spinner: QSpinnerBall });
  }
};
</script>
