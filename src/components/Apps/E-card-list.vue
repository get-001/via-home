<template>
  <div class="E-card-list">
    <el-row :gutter="10">
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
export default {
  components: { ECard },
  data() {
    return {
      listData: [
        {
          title: "轻插件",
          name: "plug-in",
          icon: "el-icon-s-grid",
          url: "http://via-app.cn",
          bgClass:'bg-cyan'
        },
        {
          title: "数据存储",
          name: "dbank",
          icon: "el-icon-upload",
          url: "http://yun.a-1.vip",
          bgClass:'bg-blue'
        },
        {
          title: "音乐播放器",
          name: "Music-Player",
          icon: "el-icon-headset",
          url: "http://a-1.vip/demo/myPlayer",
          bgClass:'bg-purple'
        },
        {
          title: "全网音乐解析",
          name: "music",
          icon: "el-icon-finished",
          url: "http://a-1.vip/music",
          bgClass:'bg-mauve'
        },
        {
          title: "今日热榜",
          name: "Hot list",
          icon: "el-icon-s-data",
          url: "https://tophub.today",
          bgClass:'bg-pink'
        },
        {
          title: "卧底小游戏",
          name: "dinting",
          icon: "el-icon-view",
          url: "http://a-1.vip/demo/dinting",
          bgClass:'bg-brown'
        }
      ]
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