<template>
  <obd-table
    :data="JSON.stringify(employees)"
    :columns="JSON.stringify(columns)"
    :actions="JSON.stringify(tableActions)"
    @action="action"
  />
</template>

<script>
export default {
  props: ['employees'],

  data() {
    return {
      columns: [
        {
          key: 'name',
          text: 'Meno',
        },
        {
          key: 'email',
          text: 'Email',
        },
        {
          key: 'type-of-employment',
          text: 'Druh pracovného pomeru',
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
  }
}
</script>