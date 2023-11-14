
const initialState = () => {
  return {
    tasks: [
      // { id: 1, title: 'Learn Nuxt', completed: false},
    ]
  }
}

const state = () => {
  return initialState()
  
}

const mutations = {
  SET_TASKS(state, payload) {
    state = payload
  }
}

const actions = {
  ADD_TASK({ commit, state }, newTask) {
    const updatedTasks = [...state.tasks, newTask];
    console.log(updatedTasks)
    commit('SET_TASKS', updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
}

const getters = {
  tasks: (state) => state.tasks
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}