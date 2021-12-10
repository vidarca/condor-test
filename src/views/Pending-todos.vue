<template>
  <div class="pending-todos">
    <TodosTable />
  </div>
</template>

<script>
import TodosTable from '../components/TodosTable.vue';

export default {
  name: "PendingTodos",
  components: {
    TodosTable
  }
};
</script>
