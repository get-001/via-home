<template>
  <div class="Personal">
    <div
      class="wraper-head"
      style="background-image:url('http://p9.qhimg.com/bdm/960_593_0/t0117f49d1d025e6357.jpg')"
    >
      <mu-flex class="flex-wrapper" justify-content="center">
        <van-image
          round
          width="6rem"
          height="6rem"
          src="http://tva1.sinaimg.cn/large/007X8olVly1g8823ypwsfj30b40b4dg4.jpg"
        />
      </mu-flex>
    </div>
    <E-basic-settings />
    <p>其他</p>
    <van-cell title="项目情况" is-link :to="{name:'timeline'}" />
    <van-cell title="关于 via-home" is-link :to="{name:'via-home'}" />
    <mu-ripple class="btn-reset-all-aata" tag="p" @click="resetDataAll">重置所有数据(清空缓存)</mu-ripple>
  </div>
</template>

<script>
import EBasicSettings from "@/components/Personal/E-basic-settings";

export default {
  components: { EBasicSettings },
  methods: {
    resetDataAll() {
      this.$dialog.confirm({
        title: "清空缓存数据",
        message: "所有自定义配置和书签恢复到默认。",
        beforeClose(action, done) {
          if (action === "confirm") {
            localStorage.clear(); // 清缓存
            setTimeout(() => {
              done();
              location.reload(); // 刷新
            }, 2000);
          } else {
            done();
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.Personal {
  background: rgba(245, 245, 245, 1);
  .wraper-head {
    padding: 3rem 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  p {
    margin: 0;
    line-height: 30px;
    padding: 0 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
  }
  & > .btn-reset-all-aata {
    position: relative;
    text-align: center;
    color: #fff;
    background: #7e57c2;
    line-height: 40px;
    margin: 10px 0;
    user-select: none;
    cursor: pointer;
  }
}
</style>