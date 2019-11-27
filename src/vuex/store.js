import Vue from 'vue';
import Vuex from 'vuex';
import config from './config.js';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {

  },
  modules: {
    config
  },
  mutations: {

  },
  actions: {

  }
})
