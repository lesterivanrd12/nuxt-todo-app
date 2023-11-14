import Vue from 'vue';
import Vuex from 'vuex';

import todolist from './modules/todolist';

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    modules: {
      todolist
    }
  })
};

export default store;