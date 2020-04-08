<template>
  <div>
    <h2>Čakajúce na schválenie</h2>
    <obd-table
      v-if="clients.length"
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
          color: '#f07b3f',
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