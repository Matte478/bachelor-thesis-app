<template>
  <div>
    <h2 class="title">Čakajúce na schválenie</h2>
    <obd-table
      v-if="clients.length"
      class="table"
      layout="fixed"
      :data="JSON.stringify(clients)"
      :columns="JSON.stringify(columns)"
      :actions="JSON.stringify(tableActions)"
      @action="action"
    />
    <h3 v-else>Nemáte žiadne nové žiadosti</h3>
  </div>
</template>

<script>
export default {
  props: ['clients'],

  data() {
    return {
      columns: [
        {
          key: 'company',
          text: 'Klient',
        },
        {
          key: 'city',
          text: 'Mesto',
        },
      ],
      tableActions: [
        {
          text: 'Schváliť',
          action: 'confirm',
          color: '#2d4059',
        },
        {
          text: 'Zamietnúť',
          action: 'unconfirm',
          color: '#ea5455',
        },
      ],
    }
  },

  methods: {
    action(e) {
      this.$emit(e.detail.action, e.detail.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 0.3em;
}
.table {
  margin-bottom: 1.5em;
}
</style>