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
      <h1>欢迎！当前共有 {{ count }} 人</h1>
    </div>
    <div class="main">
      <div>
      <select id="level" class="ui dropdown">
        <option value="1">一等奖 | {{levels[0].number}}</option>
        <option value="2">二等奖 | {{levels[1].number}}</option>
        <option value="3">三等奖 | {{levels[2].number}}</option>
      </select>
      <button id="start-btn" class="ui right labeled icon button" @click="marquee">
        <i class="circle icon"></i>
        开始
      </button>
      <button id="stop-btn" class="ui labeled icon button" @click="stopInt">
        <i class="pause icon"></i>
        停止
      </button>
      <button class="ui labeled icon button" @click="add">
        <i class="add icon"></i>
        添加
      </button>
      <button class="ui labeled icon button" @click="remove">
        <i class="minus icon"></i>
        去除
      </button>
       <transition-group name="cell" tag="div" class="container">
           <div v-for="cell in finalCells" :key="cell.id" class="cell clickable">
             {{ cell.number }}
           </div>
       </transition-group>
    </div>
    <info-modal :number="currentNum" :level="currentLevel"></info-modal>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapState, mapGetters, mapActions } from 'vuex'
  // import NumberItem from './NumberItem.vue'
  import InfoModal from './InfoModal.vue'
  let addInt, rmInt, flag

  export default {
    name: 'lottery-page',
    data () {
      return {
        currentNum: ['0'],
        currentLevel: '0',
      }
    },
    components: {
      InfoModal
    },
    computed: {
      ...mapState([
        'count',
        'cells'
      ]),
      ...mapGetters([
        'levels',
        'initCells',
      ]),
      finalCells () {
        return this.cells.length === 0 ? this.initCells : this.cells
      }
    },
    methods: {
      ...mapActions([
        'updateResults',
        'addCell',
        'removeCell'
      ]),
      marquee: function () {
        $('.add').parent().addClass('disabled')
        $('.minus').parent().addClass('disabled')
        addInt = setInterval(() => {
          $('.cell').eq(this.randomIndex()).addClass('active')
        }, 100)
        rmInt = setInterval(() => {
          $(".cell.active").removeClass("active");
        }, 200)
      },
      stopInt () {
        clearInterval(addInt)
        clearInterval(rmInt)
        $(".cell.active").removeClass("active");

        let flag = $('#level').val()
        let tmp = []

        if (flag === '1') {
          _.times(this.levels[0].number, () => {
            $('.cell').eq(this.randomIndex()).addClass('active')
          })
          tmp.push($.trim($(".cell.active").text()))
          $('#level').val('2')
        } else if (flag === '2') {
          _.times(this.levels[1].number, () => {
            $('.cell').eq(this.randomIndex()).addClass('active')
          })
          Array.prototype.forEach.call($(".cell.active"), (ele) => {
            tmp.push($.trim(ele.innerText))
          })
          $('#level').val('3')
          $('.circle').parent().addClass('disabled')
          $('.pause').parent().addClass('disabled')
        }
        this.currentNum = tmp // ['1','2']
        this.currentLevel = flag // 1 or 2

        $('#info-modal').modal('show')
      },
      randomIndex () {
        return Math.floor(Math.random() * this.count)
      },
      add () {
        this.addCell()
      },
      remove () {
        // remove last cell
        if (this.count < 4) {
          $('.minus').parent().addClass('disabled')
        }
        this.removeCell([])
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

.main {
  margin-left: 30px;
}

h1 {
  color: rgba(0,0,0,.54);
  border-bottom: 3px solid transparent;
}
.cell {
display: flex;
justify-content: space-around;
align-items: center;
width: 120px;
height: 120px;
border: 1px solid #aaa;
margin: 20px;
background-color: #A9D5DE;
font-size: 80px;
font-weight: 10;
}
.container .active {
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
