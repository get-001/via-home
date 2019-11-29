<template>
  <div class="E-bookmark-list">
    <van-skeleton title :row="7" v-if="!collapseData.length" />
    <mu-container style="margin-bottom:20px;" v-if="collapseData.length">
      <E-bookmark-collapse :data="collapseData" />
    </mu-container>
    <mu-container v-if="exhibitionData.length">
      <E-bookmark-exhibition
        v-for="(item, index) in exhibitionData"
        :key="index"
        style="margin-bottom:20px;"
        :data="item"
      />
    </mu-container>
  </div>
</template>

<script>
import EBookmarkCollapse from "./bookmark-list/E-bookmark-collapse";
import EBookmarkExhibition from "./bookmark-list/E-bookmark-exhibition";
import { api } from "@/plug-in/api.js";

export default {
  components: { EBookmarkCollapse, EBookmarkExhibition },
  data() {
    return {
      collapseData: [],
      exhibitionData: []
    };
  },
  created() {
    api
      .get("http://api.a-1.vip", {
        url: "http://a-1.vip/data/via_bookmark.json"
      })
      .then(data => {
        data.forEach(ele => {
          ele.type === "exhibition" && this.exhibitionData.push(ele);
          ele.type === "collapse" && this.collapseData.push(ele);
        });
      });
  }
};
</script>

<style lang="scss">
.E-bookmark-list {
}
</style>