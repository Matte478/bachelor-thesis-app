<template>
  <obd-table
    class="day-box__table"
    :data="JSON.stringify(typeOfEmployments)"
    :columns="JSON.stringify(columns)"
    :actions="JSON.stringify(tableActions)"
    @action="action"
  />
</template>

<script>
export default {
  props: ['typeOfEmployments'],

  data() {
    return {
      columns: [
        {
          key: 'name',
          text: 'Druh pracovného pomeru',
        },
        {
          key: 'contribution',
          text: 'Príspevok',
          suffix: '€'
        },
      ],
      tableActions: [
        {
          action: 'edit',
          icon: 'fas fa-edit',
          color: '#2d4059',
        },
        {
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
    }
  }
}
</script>