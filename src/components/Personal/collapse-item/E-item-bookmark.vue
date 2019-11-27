<template>
  <div class="E-item-bookmark">
    <van-switch-cell
      :value="data.forbidIcon"
      title="禁用图标"
      size="20px"
      @click.native="$emit('change',{forbidIcon:!data.forbidIcon})"
    />
    <van-cell title="管理书签" is-link :to="{name:'home'}" />
    <van-cell title="配置书签" value="点击编辑" />
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

<style lang="scss">
.E-item-bookmark {
}
</style>