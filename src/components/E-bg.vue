<template>
  <div class="E-bg" v-if="bg.show">
    <img class="image" id="dom_bg_image" :src="bg.url" v-upImage />
    <div class="shade" :style="{opacity: bg.opacity/100}" />
  </div>
</template>

<script>
import { api, imgPrestrain } from "@/plug-in/api.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  // props: {
  //   opacity: {
  //     type: [String, Number],
  //     default: 50
  //   }
  // },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState("config", ["bg"])
  },
  mounted() {
    if (this.bg.random) {
      this.alter({ bg: { url: "" } });
      this.upBgImage(this.bg.type);
    }
  },
  methods: {
    ...mapMutations("config", ["alter"]),
    ...mapActions("config", ["upBgImage"])
  },
  directives: {
    upImage: {
      bind(el, bindings, vnode) {
        el.onload = () => {
          el.style.opacity = 1;
        };
      }
    }
  }
};
</script>

<style lang="scss">
.E-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  & > .image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 2s;
  }
  & > .shade {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
</style>