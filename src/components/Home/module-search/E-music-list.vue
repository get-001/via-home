<template>
  <div class="E-music-list">
    <mu-paper>
      <transition-group name="list" tag="mu-list" style="padding:0;">
        <mu-list-item button v-for="(item, index) in data" :key="index">
          <mu-list-item-title>{{item.fileName}}</mu-list-item-title>
          <mu-button style="position:relative;left:5px;" small icon @click="openMusic(item)">
            <i class="el-icon-video-play" />
          </mu-button>
        </mu-list-item>
      </transition-group>
      <mu-list style="padding:0;">
        <mu-list-item button style="border-top:1px solid rgba(0, 0, 0, 0.12);">
          <mu-list-item-title style="text-align:center;">
            <el-link type="primary" href="http://a-1.vip/music">没有相关结果？试试全网音乐解析吧~</el-link>
          </mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
import musicApi from "@/plug-in/musicApi.js";
export default {
  props: {
    data: {
      type: Array
    },
    value: {
      type: Number,
      default: -1
    }
  },
  watch: {
    data() {
      if (this.value !== -1) {
        this.$emit("input", -1);
        if (typeof this.data[this.value] === "object") {
          this.openMusic(this.data[this.value]);
        }
      }
    }
  },
  data() {
    return {
      show: false,
      songData: null
    };
  },
  methods: {
    openMusic(data) {
      musicApi.getSong(data, true).then(data => {
        this.$musicCard({ data, router: this.$router });
        this.songData = data;
        this.show = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.E-music-list {
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
}
</style>