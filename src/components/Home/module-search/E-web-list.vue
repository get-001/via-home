<template>
  <div class="E-web-list">
    <mu-paper>
      <transition-group name="list" tag="mu-list" style="padding:0;">
        <mu-list-item
          button
          v-for="(item, index) in data"
          :key="index"
          @click="$emit('open',item,'default')"
        >
          <mu-list-item-title>{{item}}</mu-list-item-title>
          <mu-button
            style="position:relative;left:5px;"
            small
            icon
            color="primary"
            @click.stop="$emit('add',item)"
          >
            <i class="el-icon-plus" style="font-size:16px;" />
          </mu-button>
        </mu-list-item>
      </transition-group>
    </mu-paper>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
.E-web-list {
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
}
</style>