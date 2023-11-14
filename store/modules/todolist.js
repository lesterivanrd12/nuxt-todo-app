
const initialState = () => {
  return {
    tasks: [
      { title: 'Learn Nuxt', completed: false},
    ]
  }
}

const state = () => {
  return initialState()
  
}

const mutations = {
  SET_TASKS(state, payload) {
    state.tasks = payload
    console.log(state)
  }
}

const actions = {
  ADD_TASK({ commit, state }, newTask) {
    const updatedTasks = [...state.tasks, newTask];
    commit('SET_TASKS', updatedTasks);
    localStorage.setItem('vuex', JSON.stringify(state));
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