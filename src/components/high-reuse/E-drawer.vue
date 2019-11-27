<template>
  <el-drawer
    class="E-drawer"
    :title="title"
    size="70%"
    :visible.sync="value"
    direction="ltr"
    :before-close="close"
    :append-to-body="false"
  >
    <span>------------</span>
  </el-drawer>
</template>

<script>
export default {
  props: ["title", "value"],
  methods: {
    close(done) {
      //   done();
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="scss">
.E-drawer {
  .el-drawer.ltr {
    max-width: 300px;
  }
}
</style>