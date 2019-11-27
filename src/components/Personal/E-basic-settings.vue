<template>
  <div class="E-basic-settings">
    <p>基本设置</p>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="主页" name="1">
        <E-item-home :data="home" @change="(data)=>{changeConfig('home',data)}" />
      </van-collapse-item>
      <van-collapse-item title="背景图" name="2">
        <E-item-bg :data="bg" @change="(data)=>{changeConfig('bg',data)}" />
      </van-collapse-item>
      <van-collapse-item title="书签" name="3">
        <E-item-bookmark :data="bookmark" @change="(data)=>{changeConfig('bookmark',data)}" />
      </van-collapse-item>
    </van-collapse>
    <E-cell-text />
    <E-cell-style />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import EItemHome from "./collapse-item/E-item-home";
import EItemBookmark from "./collapse-item/E-item-bookmark";
import EItemBg from "./collapse-item/E-item-bg";
import ECellText from "@/components/high-reuse/cell/E-cell-text";
import ECellStyle from "./collapse-item/E-cell-style.vue";

export default {
  computed: {
    ...mapState("config", ["home", "bg", "bookmark"])
  },
  components: { EItemHome, ECellText, EItemBookmark, EItemBg, ECellStyle },
  data() {
    return {
      activeName: ""
    };
  },
  methods: {
    ...mapMutations("config", ["alter"]),
    changeConfig(type, data) {
      this.alter({ [type]: data });
    }
  }
};
</script>

<style lang="scss">
.E-basic-settings {
  p {
    margin: 0;
    line-height: 30px;
    padding: 0 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
  }
  .van-collapse {
    .van-collapse-item__content {
      padding: 0;
      .van-cell {
        & > .van-cell__title {
          color: #2196f3;
        }
      }
    }
  }
}
</style>