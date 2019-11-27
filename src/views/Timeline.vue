<template>
  <div class="Timeline">
    <h3 style="text-align:center;">Timeline 时间线</h3>
    <mu-container class="wraper-content">
      <el-timeline reverse>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
    </mu-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          content: "项目构建",
          timestamp: "2019-08-14"
        },
        {
          content: "完成书签、搜索的基本功能",
          timestamp: "2019-08-15"
        },
        {
          content: "音乐卡片的展示(歌词、下载、进度)",
          timestamp: "2019-08-17"
        },
        {
          content: "融合音乐搜索功能，提升性能，修复bug",
          timestamp: "2019-08-18"
        },
        {
          content: "发布第一个beta版本 v1.0 beta",
          timestamp: "2019-10-18 20:29:43"
        },
        {
          content: "支持音乐URL分享、对接随机背景图、新增轮播式书签",
          timestamp: "2019-10-20"
        },
        {
          content:
            "个性化自定义配置、一键更换壁纸、支持下载当前壁纸、缓存配置数据、远程加载书签、界面优化处理、扩展个人中心页面...",
          timestamp: "2019-10-25"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.Timeline {
  background: rgba(245, 245, 245, 1);
}
</style>