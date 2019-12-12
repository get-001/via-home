<template>
  <div class="E-item-home">
    <E-cell-input
      title="HTML标题"
      :val="data.title"
      @change="(data)=>{$emit('change',{title:data})}"
    />
    <E-cell-input
      title="搜索框占位"
      :val="data.placeholder"
      @change="(data)=>{$emit('change',{placeholder:data})}"
    />
    <E-cell-input
      title="分割线标签"
      :val="data.dividerText"
      @change="(data)=>{$emit('change',{dividerText:data})}"
    />
    <!-- 搜索引擎 -->
    <E-cell-picker
      :config="searchEngine"
      :name="data.defaultSeo"
      @change="(data)=>{$emit('change',{defaultSeo:data})}"
    />
    <van-switch-cell
      title="高效搜索"
      :value="data.efficientSearch"
      @click.native="$emit('change',{efficientSearch:!data.efficientSearch})"
      size="20px"
    />
    <!-- 导航类型 -->
    <E-cell-picker
      :config="navType"
      :name="data.navType"
      @change="(data)=>{$emit('change',{navType:data})}"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ECellPicker from "@/components/high-reuse/cell/E-cell-picker";
import ECellInput from "@/components/high-reuse/cell/E-cell-input";
export default {
  props: {
    data: {
      type: Object
    }
  },
  components: { ECellPicker, ECellInput },
  data() {
    return {
      searchEngine: {
        title: "搜索引擎",
        valueArr: ["百度", "神马", "Google", "必应"],
        nameArr: ["baidu", "sm", "google", "bing"]
      },
      navType: {
        title: "导航类型",
        valueArr: ["传统", "简约"],
        nameArr: ["tradition", "simple"]
      }
    };
  },
  computed: {
    ...mapState("config", ["home"])
  },
  methods: {
    ...mapMutations("config", ["alter"])
  }
};
</script>