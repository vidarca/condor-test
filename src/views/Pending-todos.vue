<template>
  <div class="pending-todos">
    <TodosTable />
  </div>
</template>

<script>
import TodosTable from '../components/Todos-table.vue';

export default {
  name: "PendingTodos",
  components: {
    TodosTable
  }
};
</script>
