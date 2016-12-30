<template lang="html">

  <li class="item">
    <md-card class="article_card">
      <div class="md-card-link" @click="emitUrl(item)">
        <md-card-header>
          <div class="md-title">{{item}}</div>
        </md-card-header>
      </div>
    </md-card>
  </li>


</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['item'],
  methods: {
    emitUrl: function (item) {
      // console.log(item.resolved_id);
      // this.$emit('articleUrlSelected', item.resolved_url)
    }
  },
  name: 'number-item'
};
</script>

<style lang="scss" scoped>
.item {
  margin: 30px;
}

.md-card {

  &-actions {
    justify-content: flex-end;
    margin-top: auto;
    display: none !important;
  }

  &-link {
    height: 100%;
  }
  .md-title {
    line-height: 1.2;
    top: -10px !important;
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 80px;
    font-weight: 10;
    // padding: .25em .75em;
    // text-transform: capitalize;
    color: #3a3a3a;
  }

  &-header {
    height: 120px;
    // padding: 0 !important;
    background: #A9D5DE;
  }

  // &-content {
  //   display: none;
  // }
}


  .article_card {
    // padding: 1em 2em;
    overflow: hidden;
    height: 120px;
    width: 120px;
    // height: 475px !important;
    transition: .3s ease;
    // border: 2px solid transparent;

    &:hover {
      cursor: pointer;
      box-shadow: 0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);
      transform: scale(1.03);
      // border: 2px solid #ef3e56;
    }
  }
</style>
