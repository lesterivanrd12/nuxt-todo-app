import Vue from 'vue';
import Vuex from 'vuex';
import localStoragePlugin from '../plugins/localStorage';

import todolist from './modules/todolist';

Vue.use(Vuex);

const store = () => {

  return new Vuex.Store({
    modules: {
      todolist
    },
    plugins: [localStoragePlugin]
  })
};

export default store;