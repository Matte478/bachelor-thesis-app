<template>
  <obd-table
    v-if="meals.length"
    :data="JSON.stringify(meals)"
    :columns="JSON.stringify(columns)"
    :actions="JSON.stringify(tableActions)"
    @action="action"
  />
</template>

<script>
export default {
  props: ['meals'],

  data() {
    return {
      columns: [
        {
          key: 'id',
          text: 'ID',
        },
        {
          key: 'meal',
          text: 'Názov jedla',
        },
        {
          key: 'price',
          text: 'Cena v €',
        },
      ],
      tableActions: [
        {
          text: '',
          action: 'edit',
          icon: 'fas fa-edit',
          color: '#2d4059',
        },
        {
          text: '',
          action: 'delete',
          icon: 'fas fa-trash-alt',
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