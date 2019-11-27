<template>
  <div class="E-head-btn-wrap">
    <mu-ripple class="box-btn" @click="()=>{upBg(bg.type)}">
      <van-icon name="brush-o" />
    </mu-ripple>
    <mu-ripple class="box-btn" @click="open(bg.url)">
      <i class="el-icon-download" />
    </mu-ripple>
    <mu-ripple class="box-btn" @click="showStyle=true">
      <i class="el-icon-magic-stick" />
    </mu-ripple>
    <van-popup v-model="showStyle">
      <E-config-style v-if="showStyle" @close="showStyle=false" />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EConfigStyle from "@/components/high-reuse/cell/E-config-style";
export default {
  components: { EConfigStyle },
  computed: {
    ...mapState("config", ["bg"])
  },
  data() {
    return {
      showStyle: false
    };
  },
  methods: {
    ...mapActions("config", ["upBgImage"]),
    open(url) {
      window.open(url);
    },
    upBg(type) {
      const dom = document.getElementById("dom_bg_image");
      dom.style.opacity = 0;
      this.upBgImage(type);
    }
  }
};
</script>

<style lang="scss" scoped>
.E-head-btn-wrap {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  .box-btn {
    margin-right: 7px;
    position: relative;
    background: #fff;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
}
</style>