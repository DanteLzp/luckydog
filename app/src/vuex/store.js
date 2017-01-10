import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
// import * as actions from './actions'
// import * as getters from './getters'
// import modules from './modules'

Vue.use(Vuex)

const mockData = {
  "items" : [
    {
      "number": 1,
      "level" : 1,
      "award" : "computer",
    },
    {
      "number": 2,
      "level" : 2,
      "award" : "usb",
    },
    {
      "number": 3,
      "level" : 3,
      "award" : "mouse",
    },
    {
      "number": 4,
      "level" : 3,
      "award" : "mouse",
    },
    {
      "number": 5,
      "level" : 2,
      "award" : "usb",
    }
  ]
}
const data = {
  "items" : [],
  "levels" : [
    {
      "name" : 1,
      "color" : "blue",
      "number" : 4
    },
    {
      "name" : 2,
      "color" : "purple",
      "number" : 10
    },
    {
      "name" : 3,
      "color" : "yellow",
      "number" : 12
    }
  ],
  "dict" : {
    1: '一等奖',
    2: '二等奖',
    3: '三等奖'
  },
  "awards" : {
    1: '小米手环2, 电脑包',
    2: '羽毛球拍，电脑包(手提)，罗技鼠标，保温杯',
    3: '米酒/酸奶机，纳豆/酸奶机，体脂称，移动电源，无线鼠标，铁三角耳机',
    4: 'kindle一部'
  }
}

const state = {
  count: 26,
  cells: [],
  results: data
}

const getters = {
  initCells (state) {
    return Array.apply(null, { length: state.count })
          .map(function (_, index) {
                return {
                  id: index,
                  number: index + 1
                }
          })
  },
  levels (state) {
    return state.results['levels']
  },
  dict (state) {
    return state.results['dict']
  },
  awards (state) {
    return state.results['awards']
  },
  items (state) {
    return state.results['items']
  }
}

const mutations = {
  setCount (state, payload) {
    state.results['levels'][0].number = payload.numTmp.num1
    state.results['levels'][1].number = payload.numTmp.num2
    state.results['levels'][2].number = payload.numTmp.num3
    state.count = payload.numTmp.count
  },
  setAward (state, payload) {
    state.results['awards'][1] = payload.awardTmp.award1
    state.results['awards'][2] = payload.awardTmp.award2
    state.results['awards'][3] = payload.awardTmp.award3
    state.results['awards'][4] = payload.awardTmp.award4
  },
  increment (state, payload) {
    payload.initCells.splice(state.count, 0, {id: state.count++ , number:state.count})
  },
  decrement (state, payload) {
    if (payload.numList.length < 1) {
      payload.initCells.splice(state.count--, 1)
    } else {
      let removedNum = payload.numList.length
      let curLevel = parseInt(payload.level)-1
      state.results['levels'][curLevel].number -= removedNum
      state.count -= removedNum
      if (state.cells.length === 0) {
        state.cells = payload.initCells
      }
      _.remove(state.cells, (cell)=> {
        return payload.numList.includes(cell.number.toString())
      })
    }
  },
  updateResults (state, payload) {
    state.results['items'].push(payload.item)
  }
}

let lastItem = {}

const actions = {
  setCount ({ commit }, numTmp) {
    commit({
      type: 'setCount',
      numTmp: numTmp
    })
  },
  setAward ({ commit }, awardTmp) {
    commit({
      type: 'setAward',
      awardTmp: awardTmp
    })
  },
  addCell ({ commit, getters }) {
    commit({
      type: 'increment',
      initCells: getters.initCells
    })
  },
  removeCell ({ commit, getters }, info) {
    commit({
      type: 'decrement',
      initCells: getters.initCells,
      numList: info['num'],
      level: info['level']
    })
  },
  updateResults ({ commit }, item) {
    if (item === undefined || lastItem === item ) return
    commit({
      type: 'updateResults',
      item: item
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
