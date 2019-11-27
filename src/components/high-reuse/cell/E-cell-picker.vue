<template>
  <div>
    <van-cell
      :title="config.title"
      :value="config.valueArr[config.nameArr.lastIndexOf(name)]"
      size="20px"
      @click="showPicker=true"
    />
    <van-popup position="bottom" v-model="showPicker">
      <van-picker
        show-toolbar
        :visible-item-count="3"
        :title="config.title"
        :columns="config.valueArr"
        :default-index="config.nameArr.lastIndexOf(name)"
        @cancel="showPicker=false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          title: "搜索引擎",
          valueArr: ["百度", "神马", "Google"],
          nameArr: ["baidu", "sm", "google"]
        };
      }
    },
    name: {
      type: String,
      default: "sm"
    }
  },
  data() {
    return {
      showPicker: false
    };
  },
  methods: {
    onConfirm(value, index) {
      this.$emit("change", this.config.nameArr[index]);
      this.showPicker = false;
    }
  }
};
</script>