<template>
  <div class="E-card-item" :class="data.bgClass" @click="open(data.url)">
    <div class="nav-title">
      {{data.title}}
      <i :class="data.icon" />
    </div>
    <div class="nav-name">{{data.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          title: "数据存储",
          name: "dbank",
          icon: "el-icon-upload",
          url: "http://yun.a-1.vip"
        };
      }
    }
  },
  methods: {
    open(url) {
      url && window.location.assign(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.E-card-item {
  padding: 15px;
  position: relative;
  border-radius: 6px;
  background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
  background-size: cover;
  background-position: 50%;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    background-color: inherit;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: -10%;
    border-radius: 5px;
    opacity: 0.2;
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }
  .nav-title {
    font-size: 16px;
    font-weight: 300;
    &:first-letter {
      font-size: 20px;
      margin-right: 2px;
    }
    i {
      float: right;
      line-height: 30px;
      font-size: 25px;
      margin-right: 2px;
    }
  }
  .nav-name {
    font-size: 14px;
    text-transform: Capitalize;
    margin-top: 10px;
    position: relative;
    &:first-letter {
      font-weight: 700;
      font-size: 18px;
      margin-right: 1px;
    }
    &:before {
      content: "";
      position: absolute;
      display: block;
      width: 20px;
      height: 3px;
      background: #fff;
      bottom: 0;
      right: 0;
      opacity: 0.5;
    }
    &:after {
      content: "";
      position: absolute;
      display: block;
      width: 50px;
      height: 1px;
      background: #fff;
      bottom: 0;
      right: 20px;
      opacity: 0.3;
    }
  }
}
</style>