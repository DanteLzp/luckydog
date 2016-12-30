<template>
  <div id="app">
    <side-bar
      :results="results">
    </side-bar>
    <lottery-page
      :count="count">
    </lottery-page>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SideBar from './components/SideBar.vue'
  import LotteryPage from './components/LotteryPageView.vue'

  export default {
    components: {
      SideBar,
      LotteryPage,
    },
    computed: mapState([
      'count',
      'results'
    ]),
    created () {
      // this.$store.dispatch('getParams')
    },
    methods: {

    }
  }
</script>
