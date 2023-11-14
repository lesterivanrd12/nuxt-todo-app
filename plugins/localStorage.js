const localStoragePlugin = store => {

  if (store.subscribe) {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'SET_TASKS') {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    });
  } else {
    console.warn('Vuex version does not support subscribe method');
  }
};

export default localStoragePlugin;