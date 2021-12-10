import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuid } from 'uuid';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    todosCompleted: []
  },
  mutations: {
    addTodo(state, todo) {
      todo.id = uuid();
      const date = new Date();
      todo.createdDate = Date.UTC(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getMilliseconds()
      );
      state.todos.unshift(todo);
    },
    editTodoPending(state, todo) {
      if (todo) {
        const index = state.todos.findIndex(t => t.id === todo.id);
        if (index > -1) {
          state.todos[index] = {
            ...todo
          }
        }
      }
    },
    editTodoCompleted(state, todo) {
      if (todo) {
        const index = state.todosCompleted.findIndex(t => t.id === todo.id);
        if (index > -1) {
          state.todosCompleted[index] = {
            ...todo
          }
        }
      }
    },
    setTodoAsCompleted(state, todo){
      if (todo){
        const index = state.todos.findIndex(t => t.id === todo.id);
        if (index > -1){
          state.todos[index].done = todo.done;
          state.todosCompleted.unshift({ ...state.todos[index] })
          state.todos.splice(index, 1);
        }
      }
    },
    setTodoAsPending(state, todo){
      if (todo){
        const index = state.todosCompleted.findIndex(t => t.id === todo.id);
        if (index > -1){
          state.todosCompleted[index].done = todo.done;
          state.todos.unshift({ ...state.todosCompleted[index] })
          state.todosCompleted.splice(index, 1);
        }
      }
    },
    deletePendingTodo(state, todo){
      if (todo){
        const index = state.todos.findIndex(t => t.id === todo.id);
        if (index > -1){
          state.todos.splice(index, 1);
        }
      }
    },
    deleteCompletedTodo(state, todo){
      if (todo){
        const index = state.todosCompleted.findIndex(t => t.id === todo.id);
        if (index > -1){
          state.todosCompleted.splice(index, 1);
        }
      }
    }
  }
})
