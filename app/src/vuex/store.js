import Vue from 'vue'
import Vuex from 'vuex'
const _ = require('lodash')
// import * as actions from './actions'
// import * as getters from './getters'
// import modules from './modules'

Vue.use(Vuex)

const results = {
  "items" : [
    {
      "number": 1,
      "level" : "gold",
      "award" : "computer",
    },
    {
      "number": 2,
      "level" : "silver",
      "award" : "usb",
    },
    {
      "number": 3,
      "level" : "copper",
      "award" : "mouse",
    },
    {
      "number": 4,
      "level" : "copper",
      "award" : "mouse",
    },
    {
      "number": 5,
      "level" : "silver",
      "award" : "usb",
    }
  ],
  "levels" : [
    {
      "name" : "gold",
      "color" : "blue",
      "number" : 1
    },
    {
      "name" : "silver",
      "color" : "purple",
      "number" : 1
    },
    {
      "name" : "copper",
      "color" : "yellow",
      "number" : 1
    }
  ]
}

const state = {
  count: 3,
  results: results
}

const getters = {
  numItems (state) {
    return _.range(1, state.count + 1)
  },
}

const mutations = {
  setCount (state, payload) {
    state.count = payload.count
  }
}

const actions = {
  setCount ({ commit }, joinNum) {
    commit({
      type: 'setCount',
      count: joinNum
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  // modules,
  strict: true
})
