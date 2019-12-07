<template>
  <div class="E-card-list">
    <van-skeleton title :row="7" v-if="!listData.length" />
    <el-row v-else :gutter="10">
      <el-col
        :xs="12"
        :sm="12"
        :md="6"
        :lg="6"
        :xl="6"
        v-for="(item, index) in listData"
        :key="index"
      >
        <E-card :data="item" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ECard from "./E-card.vue";
import { api } from "@/plug-in/api.js";
export default {
  components: { ECard },
  created() {
    // 通过网络，获取插件数据。
    api
      .get("http://api.a-1.vip", {
        url: "http://a-1.vip/data/via_plugin.json"
      })
      .then(data => (this.listData = data || []));
  },
  data() {
    return {
      listData: []
    };
  }
};
</script>

<style lang="scss" scoped>
.E-card-list {
  .el-col {
    margin-bottom: 15px;
  }
}
</style>