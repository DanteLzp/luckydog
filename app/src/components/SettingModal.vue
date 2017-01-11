<template>
  <div id="set-modal" class="ui small modal">
    <div class="header">
      <i class="close icon right-float clickable"></i>
      人数及奖品设置
    </div>
    <div class="content">
      <form class="ui form">
        <div class="field">
          <label>人数</label>
          <div class="three fields">
            <div class="field">
              <label>一等奖</label>
              <input v-model="num1" @focus="selectAll" type="number">
            </div>
            <div class="field">
              <label>二等奖</label>
              <input v-model="num2" @focus="selectAll" type="number">
            </div>
            <div class="field">
              <label>三等奖</label>
              <input v-model="num3" @focus="selectAll" type="number">
            </div>
          </div>
          <span>总数: {{ totalJoinNum }}</span>
        </div>
        <div class="field">
          <label>奖品</label>
          <div class="fields">
            <div class="field">
              <label>一等奖</label>
              <input v-model="award1" @focus="selectAll" type="text">
            </div>
            <div class="field">
              <label>二等奖</label>
              <input v-model="award2" @focus="selectAll" type="text">
            </div>
            <div class="field">
              <label>三等奖</label>
              <input v-model="award3" @focus="selectAll" type="text">
            </div>
            <div class="field">
              <label>特等奖</label>
              <input v-model="award4" @focus="selectAll" type="text">
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="actions">
      <div @click="updateState" class="ui purple inverted button">提交</div>
    </div>
  </div>
</template>

<style scoped>
.span {
  color: #000;
}
</style>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'setting-modal',
    data () {
      return {
        num1: 0,
        num2: 0,
        num3: 0,
        award1: '',
        award2: '',
        award3: '',
        award4: ''
      }
    },
    computed: {
      ...mapGetters([
        'levels',
        'awards'
      ]),
      totalJoinNum () {
        return this.num1 + this.num2 + this.num3
      }
    },
    created () {
      this.num1 = this.levels[0].number
      this.num2 = this.levels[1].number
      this.num3 = this.levels[2].number

      this.award1 = this.awards[1]
      this.award2 = this.awards[2]
      this.award3 = this.awards[3]
      this.award4 = this.awards[4]
    },
    methods: {
      ...mapActions([
        'setCount',
        'setAward'
      ]),
      updateState () {
        let numTmp = {
          'num1': this.num1,
          'num2': this.num2,
          'num3': this.num3,
          'count': this.totalJoinNum
        }
        let awardTmp = {
          'award1': this.award1,
          'award2': this.award2,
          'award3': this.award3,
          'award4': this.award4
        }
        this.setCount(numTmp)
        this.setAward(awardTmp)
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
