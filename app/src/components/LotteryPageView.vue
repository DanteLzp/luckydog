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
    <div class="main" @keyup.enter="start">
      <button @click="shuffle">
        Shuffle
      </button>
      <button @click="stopInt">
        Stop
      </button>

         <!-- <div class="ui horizontal list">
           <number-item v-for="(item, index) in numItems"
             :item="item"
             :key="item"
             :index="index">
           </number-item>
           </transition>
         </div> -->
         <button v-on:click="add">Add</button>
         <button v-on:click="remove">Remove</button>
         <transition-group name="cell" tag="div" class="container">
             <div v-for="cell in cells" :key="cell.id" class="cell">
               {{ cell.number }}
             </div>
         </transition-group>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapState, mapGetters } from 'vuex'
  import NumberItem from './NumberItem.vue'
  let addInt, rmInt

  export default {
    data () {
      return {
        nextNum: 10,
        cells: Array.apply(null, { length: 10 })
        	.map(function (_, index) {
          	return {
            	id: index,
            	number: index + 1
            }
      })
      }
    },
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
      ]),
    },
    methods: {
      shuffle: function () {
          addInt = setInterval(() => {
            $('.cell').eq(this.randomIndex()).addClass('active')
            // $(".cell.active").removeClass("active");
          }, 500)
          rmInt = setInterval(() => {
            $(".cell.active").removeClass("active");
          }, 600)
      },
      stopInt () {
        clearInterval(addInt)
        clearInterval(rmInt)
        let len = $('.cell.active').length
        if (len === 0) {
          $('.cell').eq(this.randomIndex()).addClass('active')
        }
      },
      randomIndex: function () {
        return Math.floor(Math.random() * this.cells.length)
      },
      add: function () {
        this.cells.splice(this.randomIndex(), 0, {id:this.nextNum++, number:this.nextNum})
      },
      remove: function () {
        this.cells.splice(this.randomIndex(), 1)
      },
      start () {
        setInterval(() => {
          $('.cell').eq(this.randomIndex()).addClass('active')
          // $(".cell.active").removeClass("active");
        }, 1000)
      }

    }
  }
</script>

<style scoped>
.container {
display: flex;
flex-wrap: wrap;
/*width: 238px;*/
margin-top: 100px;
}
.cell {
display: flex;
justify-content: space-around;
align-items: center;
width: 120px;
height: 120px;
border: 1px solid #aaa;
margin: 20px;
/*background-color: #A9D5DE;*/
font-size: 80px;
font-weight: 10;
}
.active {
  background-color: red;
}
/*.cell:nth-child(3n) {
margin-right: 0;
}
.cell:nth-child(27n) {
margin-bottom: 0;
}*/
.cell-move {
transition: transform 1s;
}
.cell-item {
  display: inline-block;
  margin-right: 10px;
}
.cell-enter-active, .cell-leave-active {
  transition: all 1s;
}
.cell-enter, .cell-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
</style>
