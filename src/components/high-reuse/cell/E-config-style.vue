<template>
  <div class="E-config-style">
    <div class="wrap-head">
      load.css (强迫症解决方案)
      <mu-button class="btn-flex-right" icon small @click="$emit('close')">
        <van-icon name="close" />
      </mu-button>
    </div>
    <div class="wrap-content">
      <textarea v-model="styleText" @input="compile(styleText)" />
    </div>
  </div>
</template>

<script>
import __style_content from "./__style_content.js";
export default {
  data() {
    const initStyle = __style_content;
    // --------------------------------------
    const head = document.head;
    let domStyle = document.getElementById("via-style");
    if (!domStyle) {
      domStyle = document.createElement("style");
      domStyle.id = "via-style";
      head.appendChild(domStyle);
    }
    return {
      styleText: localStorage["style"] || initStyle,
      head,
      domStyle
    };
  },
  methods: {
    compile(css) {
      localStorage["style"] = css;
      this.domStyle.innerHTML = css;
    }
  }
};
</script>

<style lang="scss" scoped>
.E-config-style {
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

      // &.mistake {
      //   border-color: rgb(255, 120, 120);
      // }
    }
  }
}
</style>