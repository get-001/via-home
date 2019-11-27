<template>
  <div class="E-bookmark-exhibition">
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in data.list" :key="index">
        <div class="box-image">
          <a :href="item.url">
            <span
              v-if="!bookmark.forbidIcon&&item.imgUrl"
              :style="`background-image:url(${item.imgUrl})`"
            ></span>
            <span v-else :style="{background:color[randomNum(0, color.length)]}">{{item.title[0]}}</span>
          </a>
        </div>
        <el-link :underline="false" :href="item.url">{{item.title}}</el-link>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
import safetyColor from "@/plug-in/safetyColor.js";
import { randomNum } from "@/plug-in/api.js";
import { mapState } from "vuex";

export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    ...mapState("config", ["bookmark"]),
    color() {
      return safetyColor;
    },
    randomNum() {
      return randomNum;
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 50,
        // loop: true,
        // loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          paginationHide: true,
          clickable: true
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true
        },
        breakpoints: {
          2000: {
            slidesPerView: 10,
            spaceBetween: 30
          },
          1500: {
            slidesPerView: 10,
            spaceBetween: 20
          },
          1300: {
            slidesPerView: 10,
            spaceBetween: 10
          },
          990: {
            slidesPerView: 9,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 7,
            spaceBetween: 10
          },
          575: {
            slidesPerView: 6,
            spaceBetween: 10
          },
          470: {
            slidesPerView: 5,
            spaceBetween: 10
          },
          380: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          310: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          240: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          170: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.E-bookmark-exhibition {
  // background: #fff;
  // box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
  //   0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  .swiper-slide {
    justify-content: center;
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    .box-image {
      position: relative;
      width: 40px;
      height: 40px;
      margin: 5px 0;
      overflow: hidden;
      border-radius: 50%;
      cursor: pointer;
      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
      }
    }
    a {
      margin: 0;
      padding: 0;
      height: 20px;
      line-height: 20px;
      width: 100%;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>