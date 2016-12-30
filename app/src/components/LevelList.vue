<template>
  <div class="ui list">
    <div v-for="item in filteredItems" class="item clickable">
      <div class="content">
        <span>
          {{ item.number }} get a {{ item.award }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'level-list',
  props: ['items', 'name'],
  computed: {
    filteredItems () {
      return this.items.filter(item => {
        return item.level === this.name
      })
    }
  }
}
</script>
