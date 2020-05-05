<template>
  <q-select
    label="Isolant"
    filled
    :value="value"
    @input="v => $emit('input', v)"
    input-debounce="0"
    :options="options"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">Aucun résultat</q-item-section>
      </q-item>
    </template>
  </q-select>
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
      options: ["Synthétique", "Biologique", "Naturel"]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
</style>