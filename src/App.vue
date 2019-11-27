<template>
  <div id="app">
    <!-- <E-drawer v-model="drawer" title="via-home" /> -->
    <E-bg />
    <mu-row justify-content="center">
      <mu-col class="app-container" span="12" sm="12" md="10" lg="10" xl="7">
        <keep-alive>
          <router-view class="wraper-navigation list-hide" v-longtap="()=>{drawer=true}"></router-view>
        </keep-alive>
        <van-tabbar v-model="bottomNav" :fixed="false">
          <van-tabbar-item replace :to="{name:'home'}" name="home" icon="wap-home-o">
            <mu-ripple color="#1989fa" :opacity="0.05">主页</mu-ripple>
          </van-tabbar-item>
          <van-tabbar-item replace :to="{name:'apps'}" name="apps" icon="apps-o">
            <mu-ripple color="#1989fa" :opacity="0.05">扩展</mu-ripple>
          </van-tabbar-item>
          <van-tabbar-item replace :to="{name:'personal'}" name="personal" icon="user-circle-o">
            <mu-ripple color="#1989fa" :opacity="0.05">我的</mu-ripple>
          </van-tabbar-item>
        </van-tabbar>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import EDrawer from "./components/high-reuse/E-drawer";
import EBg from "@/components/E-bg.vue";
import { api, getData } from "@/plug-in/api.js";
import { mapMutations } from "vuex";

// import __style_content from "@/components/high-reuse/cell/__style_content.js"; // 开发环境，调试专用、

export default {
  components: { EDrawer, EBg },
  created() {
    api.statistics("via-home"); // 流量统计
    this.bus.$on("nav", val => (this.bottomNav = val));
    // 获取缓存，并初始化配置。
    const config = getData("config");
    this.alter(config);
    document.title = this.$store.state["config"]["home"].title;
    this.extendStyle("via-style"); // 加载扩展的自定义css样式。
  },
  data() {
    return {
      bottomNav: "home",
      drawer: false
    };
  },
  methods: {
    ...mapMutations("config", ["alter"]),
    extendStyle(id) {
      const head = document.head;
      let domStyle = document.getElementById(id);
      if (!domStyle) {
        domStyle = document.createElement("style");
        domStyle.id = id;
        head.appendChild(domStyle);
      }
      domStyle.innerHTML = localStorage["style"];
      // domStyle.innerHTML = __style_content // 开发环境，调试专用、
    }
  }
};
</script>

<style lang="scss">
#app {
  .app-container {
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    & > .wraper-navigation {
      position: relative;
      height: calc(100vh - 50px);
      overflow-y: scroll;
    }
    & > .van-hairline--top-bottom {
      user-select: none;
      background: transparent;
      background: #fff;
      .van-tabbar-item {
        position: relative;
      }
      &.van-tabbar-item--active {
      }
    }
  }
}
</style>
