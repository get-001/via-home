<template>
  <div class="E-cell-slider">
    <van-cell :title="title" size="20px">
      <van-slider #right-icon v-model="currentValue" @change="onSlider" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    val: {
      type: Number,
      default: 50
    },
    title: {
      type: String,
      default: "XXX"
    }
  },
  watch: {
    val(newVal) {
      this.currentValue = newVal;
    }
  },
  data() {
    return {
      currentValue: this.val
    };
  },
  methods: {
    onSlider(val) {
      this.$emit("change", val);
      this.$toast(val + "%");
    }
  }
};
</script>

<style lang="scss">
.E-cell-slider {
  .van-cell__title {
    flex: 0.4;
  }
  .van-cell__value {
    position: relative;
    align-items: center;
    display: flex;
    padding: 0 10px;
    .van-slider,
    .van-slider__bar {
      width: 100%;
      .van-slider__button {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>