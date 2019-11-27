<template>
  <div class="Home">
    <!-- 更换背景-btn -->
    <mu-container>
      <E-head-btn-wrap style="animation: 2s ease 0s 1 normal none running show;" />
    </mu-container>
    <E-module-search :req="req" style="animation: 1.5s ease 0s 1 normal none running show;" />
    <E-bookmark-list style="animation: 1s ease 0s 1 normal none running show;" />
    <mu-container style="animation: 0.5s ease 0s 1 normal none running show;">
      <el-divider
        v-if="home.dividerText"
        content-position="right"
      >{{home.dividerText}}</el-divider>
    </mu-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EModuleSearch from "@/components/Home/E-module-search.vue";
import EBookmarkList from "@/components/Home/E-bookmark-list.vue";
import EHeadBtnWrap from "@/components/Home/E-head-btn-wrap";

export default {
  components: { EModuleSearch, EBookmarkList, EHeadBtnWrap },
  computed: {
    ...mapState("config", ["home"]),
    req() {
      const query = this.$router.history.current.query;
      return query;
    }
  }
};
</script>

<style lang="scss">
.Home {
  position: relative;
  // padding-top: 50px;
  padding-bottom: 20px;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>