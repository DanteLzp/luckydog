<template>
  <div id="links-container">
    <div class="ui message">
      <h1>新年快乐！ {{ count }} 位小伙伴等待中</h1>
    </div>
    <div class="main">
      <div id="inner">
        <div class="ui action input setting">
          <input type="number" v-model="selectNum" @focus="selectAll" placeholder="人数">
          <select id="level" class="ui compact selection dropdown">
            <option value="1">一等奖 | 余{{levels[0].number - selectNum}}</option>
            <option value="2">二等奖 | 余{{levels[1].number - selectNum}}</option>
            <option value="3">三等奖 | 余{{levels[2].number - selectNum}}</option>
          </select>
          <div id="start-btn" type="submit" class="ui button" @click="marquee">开始</div>
          <div id="stop-btn" type="submit" class="ui button" @click="stopInt">停止</div>
          <div type="submit" class="ui button" @click="add">添加</div>
          <div type="submit" class="ui button" @click="remove">去除</div>
        </div>
        <div class="ui action input setting">
          <input type="number" v-model="specialNum" @focus="selectAll" placeholder="人数">
          <div type="submit" class="ui button" @click="special">特等奖</div>
        </div>
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

  import { between } from 'vuelidate/lib/validators'

  let addInt, rmInt, flag
  let isRun = false

  export default {
    name: 'lottery-page',
    data () {
      return {
        currentNum: ['0'],
        currentLevel: '0',
        selectNum: 0,
        specialNum: 27
      }
    },
    validations: {
      selectNum: {
        between: between(2, 10)
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
        'items',
        'levels',
        'initCells',
      ]),
      finalCells () {
        return this.cells.length === 0 ? this.initCells : this.cells
      }
    },
    mounted () {
      this.randomCellColor()
    },
    methods: {
      ...mapActions([
        'updateResults',
        'addCell',
        'removeCell'
      ]),
      marquee: function () {
        flag = $('#level').val()
        if (this.levels[flag-1].number === 0) {
          alert('no people left!')
          return
        }
        if (this.selectNum === 0) {
          alert('please input people count!')
          return
        }
        if (!isRun) {
          $('.add').parent().addClass('disabled')
          $('.minus').parent().addClass('disabled')
          addInt = setInterval(() => {
            $('.cell').eq(this.randomIndex()).addClass('active')
          }, 50)
          rmInt = setInterval(() => {
            $(".cell.active").removeClass("active");
          }, 100)
        }
        isRun = true
      },
      stopInt () {
        if (!isRun) return
        clearInterval(addInt)
        clearInterval(rmInt)
        $(".cell.active").removeClass("active");

        flag = $('#level').val()
        let tmp = []
        let indices = []
        let curIx
        _.times(this.selectNum, () => {
          curIx = this.randomIndex()
          while (indices.indexOf(curIx) !== -1) {
            curIx = this.randomIndex()
          }
          indices.push(curIx)
          // console.log('curIx:' + curIx);
          $('.cell').eq(curIx).addClass('active')
        })
        Array.prototype.forEach.call($(".cell.active"), (ele) => {
          tmp.push($.trim(ele.innerText))
        })
        this.selectNum = 0
        this.currentNum = tmp // ['1','2']
        this.currentLevel = flag // 1 or 2

        isRun = false
        $('#info-modal').modal('show')
      },
      special () {
        if (this.count !== 0) {
          alert('其他奖励没有抽取完')
          return
        }
        this.add()
        let num = this.specialNum
        let getRandomInt = this.getRandomInt
        // console.log($);
        $(function(){
          $('.cell').removeClass('clickable').addClass("specialCell")

          $('.cell').click(function() {
            if (!isRun) {
              addInt = setInterval(() => {
                $(this).text(getRandomInt(1,num))
              }, 50)
              isRun = true
            } else {
              clearInterval(addInt)
              $('.cell').removeClass('specialCell').addClass("specialCellNoAnime")
              isRun = false
            }
          })
        })
      },
      randomIndex () {
        return Math.floor(Math.random() * this.count)
      },
      getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      add () {
        this.addCell()
        setTimeout(() => {
          this.randomCellColor()
        }, 0)
      },
      remove () {
        // remove last cell
        if (this.count < 1) {
          $('.minus').parent().addClass('disabled')
          return
        }
        this.removeCell({'num': [], 'level': ''})
        this.randomCellColor()
      },
      selectAll (event) {
        setTimeout(() => {
          event.target.select()
        }, 0)
      },
      randomCellColor () {
        let colors = ['#f2e966', '#f8c367', '#fd84a3', '#c172e7', '#9cc2ef', '#a7fe93'];
        $('.cell').each((index,el) => {
          let randomColorIndex = this.getRandomInt(0,colors.length-1);
          $(el).css('background-color',colors[randomColorIndex]);
        });
      }
    }
  }
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  /*width: 238px;*/
  margin-top: 60px;
  align-items: center;
}

.message {
  background-image: url('../../static/assets/banner.jpg');
  background-size: cover;
  text-align: center;
}

.main {
  text-align: center;
}

#level {
  height:auto;
}

h1 {
  color: 	#FFDF00;
  border-bottom: 3px solid transparent;
  font-size: 40px;
}
.cell {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 126px;
  height: 180px;
  border: 1px solid #aaa;
  margin: 20px;
  font-size: 80px;
  font-weight: 10;
  border-radius: 50% / 60% 60% 40% 40%;
}

.specialCell {
  width: 530px;
  height: 700px;
  margin-left: 500px;
  animation: swinging 1.5s ease forwards infinite;
  background-color: #f8c367;
  font-size: 400px;
  font-weight: 100;
}

.specialCellNoAnime {
  width: 530px;
  height: 700px;
  margin-left: 500px;
  background-color: #f8c367;
  font-size: 400px;
  font-weight: 100;
}

@keyframes swinging{
    0%{transform: rotate(20deg);}
    50%{transform: rotate(-5deg)}
    100%{transform: rotate(20deg);}
}

.container .active {
  background-image: url('../../static/assets/bg.jpg');
}

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
