<template>
  <div class="E-config-json">
    <div class="wrap-head">
      config.json{{mistake?' (语法检测不通过)':''}}
      <mu-button class="btn-flex-right" icon small @click="$emit('close')">
        <van-icon name="close" />
      </mu-button>
    </div>
    <div class="wrap-content">
      <textarea :class="{mistake:mistake}" v-model="config" @input="compile(config)" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      config: JSON.stringify(this.$store.state["config"], null, 2),
      mistake: false
    };
  },
  methods: {
    ...mapMutations("config", ["alter"]),
    compile(json) {
      try {
        const parse = JSON.parse(json);
        this.mistake = false;
        this.alter(parse);
      } catch (e) {
        this.mistake = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.E-config-json {
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
    padding-bottom: 5px;
    textarea {
      width: 100%;
      height: 60vh;
      resize: none;
      padding: 5px;
      border-radius: 5px;
      outline: none;
      border-width: 2px;
      background: transparent;
      border-color: #00ccff;
      transition: border-color 0.5s;

      &.mistake {
        border-color: rgb(255, 120, 120);
      }
    }
  }
}
</style>