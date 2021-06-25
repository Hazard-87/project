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

    setStepModules(state, payload) {
      state.modules.forEach(module => {
        if (module.id == payload.id) {
          module.status = "READY"
          module.stage = payload.stage

          let arr = state.modules.filter(obj => obj.suborderID == module.suborderID)
          var newArr = arr.reduce(function (prev, current) {
            if (+current.id > +prev.id) {
              return current;
            } else {
              return prev;
            }
          });

          state.suborders.forEach(suborder => {
            if (suborder.id == module.suborderID) {
              suborder.stage = newArr.stage

              let item = state.suborders.filter(obj => obj.orderID == suborder.orderID)
              var newItem = item.reduce(function (prev, current) {
                if (+current.id > +prev.id) {
                  return current;
                } else {
                  return prev;
                }
              });

              state.orders.forEach(order => {
                if (order.id == suborder.orderID) {
                  order.stage = newItem.stage
                }
              })
            }
          })
        }
      })
    },

    setStepSuborders(state, payload) {
      state.suborders.forEach(suborder => {
        if (suborder.id == payload.id) {
          suborder.status = "READY"
          suborder.stage = payload.stage

          let arr = state.suborders.filter(obj => obj.orderID == suborder.orderID)
          var newArr = arr.reduce(function (prev, current) {
            if (+current.id > +prev.id) {
              return current;
            } else {
              return prev;
            }
          });
         
          state.orders.forEach(order => {
            if (order.id == suborder.orderID) {
              order.stage = newArr.stage
            }
          })
        }
        // }
      })
    },

    setStepOrders(state, payload) {
      state.orders.forEach(order => {
        if (order.id == payload.id) {
          order.status = "READY"
          order.stage = payload.stage
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
    moduleStepAction({ commit }, payload) {
      commit('setStepModules', payload)
    },
    suborderStepAction({ commit }, payload) {
      commit('setStepSuborders', payload)
    },
    orderStepAction({ commit }, payload) {
      commit('setStepOrders', payload)
    },
  },
  modules: {
  }
})
