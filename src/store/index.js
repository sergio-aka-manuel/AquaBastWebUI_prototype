import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: true,
    count: 0,
    credentials: {
      loggedIn: false,
      apiToken: '',
      username: 'Sergio',
      phone: '79185387721',
      mail: 'sergio.rudenko@gmail.com',
    },
    device: {
      hotWaterCounterEnabled: true,
      coldWaterCounterEnabled: true
    }
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {},
  modules: {}
});
