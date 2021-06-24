import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
    suborders: [],
    modules: [],
    details: [],
  },
  mutations: {
    setOrders: (state, payload) => {
      state.orders = payload
    },
    setSuborders: (state, payload) => {
      state.suborders = payload
    },
    setModules: (state, payload) => {
      state.modules = payload
    },
    setDetails: (state, payload) => {
      state.details = payload
    },
    setStepModules(state, id) {
      state.modules.forEach(module => {
        if (module.id == id) {
          module.status = "READY"
        }
      })
    },
    setStepSuborders(state, id) {
      state.suborders.forEach(suborder => {
        if (suborder.id == id) {
          suborder.status = "READY"
        }
      })
    },
    setStepOrders(state, id) {
      state.orders.forEach(order => {
        if (order.id == id) {
          order.status = "READY"
        }
      })
    },
  },
  getters: {
    Orders(state) {
      return state.orders
    },
    Suborders(state) {
      return state.suborders
    },
    Modules(state) {
      return state.modules
    },
    Details(state) {
      return state.details
    },
  },
  actions: {
    ordersAction({ commit }, payload) {
      commit('setOrders', payload)
    },
    subordersAction({ commit }, payload) {
      commit('setSuborders', payload)
    },
    modulesAction({ commit }, payload) {
      commit('setModules', payload)
    },
    detailsAction({ commit }, payload) {
      commit('setDetails', payload)
    },
    moduleStepAction({commit}, id) {
      commit('setStepModules', id)
    },
    suborderStepAction({commit}, id) {
      commit('setStepSuborders', id)
    },
    orderStepAction({commit}, id) {
      commit('setStepOrders', id)
    },
  },
  modules: {
  }
})
