<template>
  <div id="info-modal" class="ui small modal">
    <div class="header">
      <!-- <i class="close icon right-float clickable"></i> -->
      获奖结果
    </div>
    <div class="content">
      <div class="ui message">
        <div class="header">
          恭喜{{number.toString()}} 号中奖!
        </div>
        <p>你获得了 {{awards[level]}}</p>
      </div>
    </div>
    <div class="actions">
      <div @click="pushToSideBar" class="ui purple inverted button">确定</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'info-modal',
    data () {
      return {
      }
    },
    props: ['number', 'level'],
    computed: {
      ...mapState([
        'count'
      ]),
      ...mapGetters([
        'awards',
      ])
    },
    methods: {
      ...mapActions([
        'updateResults',
        'removeCell'
      ]),
      pushToSideBar () {
        let item = {}
        this.number.forEach((num)=> {
          item = {
            "number": parseInt(num),
            "level" : parseInt(this.level),
            "award" : this.awards[this.level],
          }
          // console.log(item);
          this.updateResults(item)
        })
        this.removeCell({'num':this.number, 'level':this.level}) // remove ['1', '2'] cell
        $('#info-modal').modal('hide')
      }
    }
  }
</script>

<style scoped>
.message {
  font-size: 50px;
  font-weight: bolder;
  text-align: center;
}

.header {
  word-break:break-all;
}
</style>
