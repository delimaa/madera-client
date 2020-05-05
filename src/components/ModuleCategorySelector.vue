<template>
  <q-select :value="value" @input="v => $emit('input', v)" filled :options="options" label="Type" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: [
        "Murs extérieurs",
        "Cloisons intérieures",
        "Plancher sur dalle",
        "Plancher porteur",
        "Fermes de charpente",
        "Couverture"
      ]
    };
  }
};
</script>

<style>
</style>