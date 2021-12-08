import { mapState, mapMutations } from "vuex";

export default {
  name: 'TodosTable',
  data() {
    return {
      todosFiltered: [],
      todosCompletedFiltered: []
    }
  },
  computed: {
    ...mapState(['todos', 'todosCompleted']),
    initReferences() {
      this.todosFiltered = [...todos];
      this.todosCompletedFiltered = [...todosCompleted];
    },
  },
  methods: {
    ...mapMutations(['addTodo', 'deleteTodo', 'setTodoAsCompleted', 'editTodo', 'setTodoAsPending']),
    createEmptyTodo() {
      this.todosFiltered.push({});
    },
    changeTodoStatus(todo) {
      todo.done = true;
      console.log(todo);
      //this.editTodo(todo);
    }
  }
}
