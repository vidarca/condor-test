import { mapState, mapMutations } from "vuex";
import { v4 as uuid } from 'uuid';

export default {
  name: 'TodosTable',
  data() {
    return {
      todosFiltered: [],
      todosFilteredRef: [],
      todosCompletedFiltered: [],
      todosCompletedFilteredRef: [],
      searchPending: '',
      searchCompleted: ''
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setTodoAsCompleted' || mutation.type === 'setTodoAsPending'){
        this.refreshTodosList(state);
      }
    })
  },
  computed: {
    ...mapState(['todos', 'todosCompleted']),
    initReferences() {
      this.todosFiltered = [...todos];
      this.todosCompletedFiltered = [...todosCompleted];
    },
  },
  methods: {
    ...mapMutations(['addTodo', 'deletePendingTodo', 'editTodoCompleted','deleteCompletedTodo', 'setTodoAsCompleted', 'editTodoPending', 'setTodoAsPending']),
    createEmptyTodo() {
      if (this.todosFiltered < this.todosFilteredRef){
        this.todosFiltered = [
          ...this.todosFilteredRef
        ];
      }
      this.todosFilteredRef = [];
      this.searchPending = '';
      this.todosFiltered.push({
        id: '',
        description: '',
        done: false,
        unsavedChanges: false,
        reference: uuid()
      });
    },
    saveTodo(todo, listType) {
      todo.unsavedChanges = false;
      if (!todo.id){
        this.addTodo(todo);
        return;
      }
      switch (listType) {
        case 'pendingList':
          this.editTodoPending(todo);
          break;      
        default:
          this.editTodoCompleted(todo);
          break;
      }
    },
    cleanTodoDescription(todo) {
      todo.description = '';
      todo.unsavedChanges = false; 
    },
    changeTodoStatus(todo) {
      this.cleanSearch('pendingList');
      this.cleanSearch('completedList');
      if (todo.id){
        if (todo.done){
          this.setTodoAsCompleted(todo);
        }else {
          this.setTodoAsPending(todo);
        }
      }
    },
    removeTodo(todo, listType) {
      this.cleanSearch(listType);
      if (listType === 'pendingList'){
        const index = this.todosFiltered.findIndex(t => t.id ? t.id === todo.id : t.reference === todo.reference);
        this.todosFiltered.splice(index, 1);
        if (todo.id){
          this.deletePendingTodo(todo);
        }
      }else {
        const index = this.todosCompletedFiltered.findIndex(t => t.id ? t.id === todo.id : t.reference === todo.reference);
        this.todosCompletedFiltered.splice(index, 1);
        if (todo.id){
          this.deleteCompletedTodo(todo);
        }
      }
    },
    refreshTodosList({todos, todosCompleted}) {
      this.searchPending = '';
      this.searchCompleted = '';
      this.todosFiltered = [
        ... new Set([
          ...this.todosFiltered.filter(t => !t.id || !t.done),
          ...todos
        ])
      ];
      this.todosCompletedFiltered = [
        ...todosCompleted
      ];
    },
    filterData(listType) {
      switch (listType) {
        case 'pendingList':
          if (!this.todosFilteredRef.length){
            this.todosFilteredRef = [
              ...this.todosFiltered
            ]
          }
          this.todosFiltered = this.todosFilteredRef.filter(t => t.description.trim().toLowerCase().includes(this.searchPending.toLowerCase().trim()));
          break;
        default:
          if (!this.todosCompletedFilteredRef.length){
            this.todosCompletedFilteredRef = [
              ...this.todosCompletedFiltered
            ]
          }
          this.todosCompletedFiltered = this.todosCompletedFilteredRef.filter(t => t.description.trim().toLowerCase().includes(this.searchCompleted.toLowerCase().trim()));
          break;
      }
    },
    focusOnInput(key){
      this.$refs[key][0].focus();
    },
    cleanSearch(listType){
      switch (listType) {
        case 'pendingList':
          this.searchPending = '';
          if (this.todosFilteredRef.length){
            this.todosFiltered = [
              ...this.todosFilteredRef
            ]
          }
          this.todosFilteredRef = [];
          break;
        default:
          this.searchCompleted = '';
          if (this.todosCompletedFilteredRef.length){
            this.todosCompletedFiltered = [
              ...this.todosCompletedFilteredRef
            ]
          }
          this.todosCompletedFilteredRef = [];
          break;
      }
    }
  }
}
