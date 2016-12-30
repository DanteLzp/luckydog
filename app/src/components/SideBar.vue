<template>
  <div>
    <div id="categories">
      <div id="cat-header">
        <h2><i class="bookmark icon"></i>lottery items</h2>
      </div>
      <div class="container">
        <h2>lottery levels</h2>

        <div class="ui list">
          <div v-for="{name, color} in levels" class="item clickable">
            <div class="content">
              <a class="ui empty circular label" :class="color"></a>
              <span>
                {{ name }}
              </span>
              <level-list :items="items" :name="name"></level-list>
            </div>
          </div>
        </div>
        <button @click="setParams"
          class="ui grey inverted basic icon circular button right-float">
          <i class="icon setting large"></i>
        </button>
      </div>
    </div>
    <setting-modal></setting-modal>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import SettingModal from './SettingModal.vue'
  import LevelList from './LevelList.vue'

  export default {
    name: 'side-bar',
    props: ['results'],
    components: {
      SettingModal,
      LevelList
    },
    computed: {
      items () {
        return this.results["items"]
      },
      levels () {
        return this.results["levels"]
      }
    },
    methods: {
      setParams () {
        // $('#set-modal').show(300)
        $('#set-modal').modal('show')
      }
    }
  }
</script>
