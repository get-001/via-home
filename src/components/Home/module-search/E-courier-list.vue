<template>
  <div class="E-courier-list">
    <mu-paper>
      <transition-group
        v-if="data.auto&&data.auto.length!=0"
        name="list"
        tag="mu-list"
        style="padding:0;"
      >
        <mu-list-item
          button
          v-for="(item, index) in data.auto"
          :key="index"
          @click="$emit('open',item.comCode,data.num)"
        >
          <div class="wrap-image">
            <img class="image" :src="`https://cdn.kuaidi100.com/images/all/56/${item.comCode}.png`" />
          </div>
          <mu-list-item-title>{{data.num}}</mu-list-item-title>
        </mu-list-item>
      </transition-group>
      <mu-list v-else style="padding:0;">
        <mu-list-item button>
          <mu-list-item-title style="text-align:center;">
            <el-link type="primary" href="https://www.kuaidi100.com">没有相关信息，进快递100查询。</el-link>
          </mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.E-courier-list {
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
  .wrap-image {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
    & > .image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>