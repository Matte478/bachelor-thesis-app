<template>
  <div>
    <h2 class="title">Schválené spolupráce</h2>
    <obd-table
      v-if="clients.length"
      class="table"
      layout="fixed"
      :data="JSON.stringify(clients)"
      :columns="JSON.stringify(columns)"
    />
    <h3 v-else>Zatiaľ nemáte žiadnych klientov</h3>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 0.3em;
}
</style>