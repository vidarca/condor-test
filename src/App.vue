<template>
  <div id="app">
    <PendingTodos />
  </div>
</template>

<script>
import PendingTodos from './views/Pending-todos.vue';

export default {
  components: {
    PendingTodos
  }
}

</script>

<style lang="scss">
@import "~@/assets/scss/main.scss";
</style>
