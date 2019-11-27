<template>
  <div class="Apps">
    <mu-container
      class="wraper-swiper"
      style="animation: 1s ease 0s 1 normal none running show;margin-bottom:20px;"
    >
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide>
          <a class="wrap-link" href="http://via-app.cn">
            <van-image class="image" src="//ftp.bmp.ovh/imgs/2019/10/e23b53c80ad1cc36.png" />
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </mu-container>
    <mu-container
      class="wraper-swiper"
      style="animation: 0.5s ease 0s 1 normal none running show;margin-bottom:20px;"
    >
      <E-card-list />
    </mu-container>
  </div>
</template>

<script>
import ECardList from "@/components/Apps/E-card-list.vue";
export default {
  components: { ECardList },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true
        }
      }
    };
  }
};
</script>

<style lang="scss">
.Apps {
  padding: 20px 0;
  .wraper-swiper {
    .swiper-container {
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      background: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      overflow: hidden;
      .swiper-wrapper {
        .swiper-slide {
          height: 40vw;
          max-height: 300px;
          .wrap-link {
            width: 100%;
            height: 100%;
            .image {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}
</style>