<template>
  <div class="E-item-bg">
    <van-switch-cell
      :value="data.show"
      title="是否显示"
      size="20px"
      @click.native="$emit('change',{show:!data.show})"
    />
    <E-cell-slider
      title="不透明度"
      :val="data.opacity"
      @change="(data)=>{$emit('change',{opacity:data})}"
    />
    <van-switch-cell
      :value="data.random"
      title="是否随机"
      size="20px"
      @click.native="$emit('change',{random:!data.random})"
    />
    <!-- 壁纸类型 -->
    <E-cell-picker
      :config="bgType"
      :name="data.type"
      @change="(data)=>{$emit('change',{type:data})}"
    />
    <van-cell title="图片地址" size="20px">
      <van-icon
        slot="right-icon"
        class="el-icon-picture-outline-round"
        style="line-height: inherit;font-size:24px;"
      />
    </van-cell>
  </div>
</template>

<script>
import ECellPicker from "@/components/high-reuse/cell/E-cell-picker";
import ECellSlider from "@/components/high-reuse/cell/E-cell-slider";

export default {
  components: { ECellPicker, ECellSlider },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      bgType: {
        title: "壁纸类型",
        valueArr: ["风景", "妹子图", "二次元"],
        nameArr: ["imgSrc", "imgMzt", "imgUrl"]
      }
    };
  }
};
</script>

<style lang="scss">
.E-item-bg {
}
</style>