<template>
  <div id="set-modal" class="ui small modal">
    <div class="header">
      <i class="close icon right-float clickable"></i>
      设置人数
    </div>
    <div class="content">
      <form class="ui form">
        <div class="fields">
          <!-- <div class="field" v-for="{name, color} in levels">
            <label>
              <a class="ui empty circular label" :class="color"></a>
              {{name}}
            </label>
            <input v-model="num1" @focus="selectAll" type="number" placeholder="">
          </div> -->
          <div class="field">
            <label>一等奖</label>
            <input v-model="num1" @focus="selectAll" type="number" placeholder="level1 count...">
          </div>
          <div class="field">
            <label>二等奖</label>
            <input v-model="num2" @focus="selectAll" type="number" placeholder="level2 count...">
          </div>
          <div class="field">
            <label>三等奖</label>
            <input v-model="num3" @focus="selectAll" type="number" placeholder="level3 count...">
          </div>

        </div>
        <span>总数: {{ totalJoinNum }}</span>

        <!-- <div class="field">
          <label>Category color</label>
          <select v-model="catColor" class="ui simple dropdown">
            <option value="">Select a color</option>
            <option v-for="color in categoryColors"
              :value="color">
              {{color}}
            </option>
          </select>
        </div> -->
      </form>
    </div>
    <div class="actions">
      <div @click="updateState" class="ui purple inverted button">Save</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'setting-modal',
    data () {
      return {
        num1: 0,
        num2: 0,
        num3: 0
        // catName: '',
        // catColor: '',
        // categoryColors: ['red', 'orange', 'yellow', 'olive', 'green',
        //   'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
      }
    },
    computed: {
      ...mapGetters([
        'levels'
      ]),
      totalJoinNum () {
        return this.num1 + this.num2 + this.num3
      }
    },
    created () {
      this.num1 = this.levels[0].number
      this.num2 = this.levels[1].number
      this.num3 = this.levels[2].number
    },
    methods: {
      ...mapActions([
        'setCount'
      ]),
      updateState () {
        let numTmp = {
          'num1': this.num1,
          'num2': this.num2,
          'num3': this.num3,
          'count': this.totalJoinNum
        }
        this.setCount(numTmp)
        $('#set-modal').modal('hide')
      },
      selectAll (event) {
        setTimeout(() => {
          event.target.select()
        }, 0)
      }
    }
  }
</script>
