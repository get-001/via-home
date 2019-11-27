<template>
  <div class="E-mask-layer">
    <div class="wrap-layer" :style="{opacity:opacity/100}" />
    <div class="wrap-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opacity: {
      type: [Number, String],
      default: 50
    }
  }
};
</script>

<style lang="scss" scoped>
.E-mask-layer {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  & > .wrap-layer {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: #000;
  }
  & > .wrap-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>