<template>
  <q-select
    label="Client"
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
function adresseToStringWithEllipsis(adresse) {
  const str = `${adresse.numero} ${adresse.voie} ${adresse.codePostal} ${adresse.ville}`;
  return str.length < 28 ? str : str.slice(0, 28) + "...";
}

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    clients: {
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
      return this.clients.map(client => ({
        label: `${client.nom} ${client.prenom} - ${adresseToStringWithEllipsis(
          client.adresse
        )}`,
        value: client.id
      }));
    }
  },
  methods: {
    inputFn(id) {
      const client = this.clients.find(client => client.id === id);
      this.$emit("input", client);
    }
  }
};
</script>

<style>
</style>