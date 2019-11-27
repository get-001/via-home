<template>
  <div class="E-cell-input">
    <van-cell :title="title" :value="val" size="20px" @click="show=true" />
    <van-popup v-model="show">
      <div class="wrap-head">
        {{title}}
        <mu-button class="btn-flex-right" icon small @click="show=false">
          <van-icon name="close" />
        </mu-button>
      </div>
      <div class="wrap-content">
        <mu-text-field v-model="value" @input="$emit('change', value)" :placeholder="title"></mu-text-field>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["title", "val"],
  watch: {
    val(newVal) {
      this.value = newVal;
    }
  },
  data() {
    return {
      show: false,
      value: this.val
    };
  }
};
</script>

<style lang="scss">
.E-cell-input {
  & > .van-popup--center {
    width: 90vw;
    max-width: 900px;
    & > .wrap-head {
      line-height: 28px;
      padding: 5px 10px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      .btn-flex-right {
        min-width: unset;
        position: absolute;
        top: 5px;
        right: 10px;
      }
      .mu-icon-button.mu-button-small {
        width: 28px;
        height: 28px;
        font-size: 18px;
      }
    }
    & > .wrap-content {
      padding: 10px;
      .mu-input {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: unset;
      }
    }
  }
}
</style>