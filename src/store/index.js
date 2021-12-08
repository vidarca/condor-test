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
      state.todos.push(todo);
    },
    setTodoAsCompleted(state, todo){
      if (todo){
        const index = state.todos.findIndex(t => t.id === todo.id);
        if (index > -1){
          state.todosCompleted.unshift({ ...state.todos[index] })
          state.todos.slice(index, 1);
        }
      }
    },
    setTodoAsPending(state, todo){
      if (todo){
        const index = state.todosCompleted.findIndex(t => t.id === todo.id);
        if (index > -1){
          state.todos.unshift({ ...state.todos[index] })
          state.todosCompleted.slice(index, 1);
        }
      }
    },
    deleteTodo(state, todo){
      if (todo){
        const index = state.todos.findIndex(t => t.id === todo.id);
        if (index > -1){
          state.todos.slice(index, 1);
        }
      }
    },
    editTodo(state, todo) {
      if (todo) {
        const index = state.todos.findIndex(t => t.id === todo.id);
        if (index > -1) {
          state.todos[index] = {
            ...todo
          }
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
