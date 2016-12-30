<template>
  <div id="set-modal" class="ui small modal">
    <div class="header">
      <i class="close icon right-float clickable"></i>
      Setting number of people
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
            <label>level 1</label>
            <input v-model="num1" @focus="selectAll" type="number" placeholder="level1 count...">
          </div>
          <div class="field">
            <label>level 2</label>
            <input v-model="num2" @focus="selectAll" type="number" placeholder="level2 count...">
          </div>
          <div class="field">
            <label>level 3</label>
            <input v-model="num3" @focus="selectAll" type="number" placeholder="level3 count...">
          </div>

        </div>
        <span>Total: {{ totalJoinNum }}</span>

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
  import { mapActions } from 'vuex'

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
      totalJoinNum () {
        return this.num1 + this.num2 + this.num3
      }
    },
    methods: {
      ...mapActions([
        'setCount'
      ]),
      updateState () {
        this.setCount(this.totalJoinNum)
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
