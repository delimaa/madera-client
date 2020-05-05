<template>
  <q-select
    label="Gamme"
    filled
    :value="model"
    @input="inputFn"
    map-options
    emit-value
    :loading="loading"
    input-debounce="0"
    :options="options"
    style="max-width: 350px;"
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
      type: Object,
      required: true
    },
    gammes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    model() {
      return this.value.id || null;
    },
    options() {
      return this.gammes.map(gamme => ({
        label: gamme.nom,
        value: gamme.id
      }));
    }
  },
  methods: {
    inputFn(id) {
      const gamme = this.gammes.find(gamme => gamme.id === id);
      this.$emit("input", gamme);
    }
  }
};
</script>

<style>
</style>