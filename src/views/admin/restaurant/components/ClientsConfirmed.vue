<template>
  <div>
    <h2>Schválené spolupráce</h2>
    <obd-table
      v-if="clients.length"
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
        // {
        //   key: '',
        //   text: '',
        // }
      ],
    }
  }
}
</script>