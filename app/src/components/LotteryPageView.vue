<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
  .list {
    margin: 50px;
    /*display: flex;
    flex-wrap: warp;*/
  }
</style>

<template>
  <div id="links-container">
    <div class="ui message">
      <h1>Welcome. lottery-page, there are {{ count }} people.</h1>
    </div>

       <div class="ui horizontal list">
         <number-item v-for="(item, index) in numItems"
           :item="item"
           :key="item"
           :index="index">
         </number-item>
       </div>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import NumberItem from './NumberItem.vue'

  export default {
    name: 'lottery-page',
    components: {
      NumberItem
    },
    computed: {
      ...mapState([
        'count'
      ]),
      ...mapGetters([
        'numItems'
      ])
    },
    created () {
      // $('.ui').marquee({
      //     //speed in milliseconds of the marquee
      //     duration: 15000,
      //     //gap in pixels between the tickers
      //     gap: 50,
      //     //time in milliseconds before the marquee will start animating
      //     delayBeforeStart: 0,
      //     //'left' or 'right'
      //     direction: 'left',
      //     //true or false - should the marquee be duplicated to show an effect of continues flow
      //     duplicated: true
      // })
    }
  }
</script>
