<template>
  <div class="E-cell-style">
    <van-cell title="注入css样式" value="点击编辑" size="20px" @click="show=true" />
    <van-popup v-model="show">
      <E-config-style v-if="show" @close="show=false" />
    </van-popup>
  </div>
</template>

<script>
import EConfigStyle from "@/components/high-reuse/cell/E-config-style";
export default {
  components: { EConfigStyle },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="scss" scoped>
.E-cell-style {
}
</style>