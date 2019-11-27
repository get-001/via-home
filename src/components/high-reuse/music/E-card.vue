<template>
  <E-mask-layer :opacity="30" v-acquire>
    <div class="E-card">
      <div class="card-gif">
        <audio
          autoplay
          :src="data.url"
          @pause="play=false"
          @play="play=true"
          @timeupdate="timeupdate"
          v-control
        ></audio>
        <img class="bg-image" :class="{active:show}" :src="bgUrl" />
        <div class="wrap-content">
          <div class="wrap-lyrie list-hide" v-if="data.lyric_obj" v-scroll="lyricIndex">
            <ul class="lyrie">
              <li
                class="lyrie-item"
                :class="{active:index===lyricIndex}"
                v-for="(item, index) in data.lyric_obj"
                :key="index"
              >{{item.content}}</li>
            </ul>
          </div>
          <div class="wrap-control">
            <div class="wrap-progress">
              <div class="progress-bg" v-progressBar>
                <div
                  class="progress-bar"
                  :style="{width:(decorateProgress!==-1?decorateProgress:musicProgress)+'%'}"
                >
                  <i class="bar" />
                </div>
              </div>
            </div>
            <div class="box-content">
              <div class="flex-left">
                <p class="title Some-show">{{data.name}}</p>
                <p class="content Some-show">{{data.artistName}}</p>
              </div>
              <div class="flex-right">
                <mu-button v-if="!play" icon small full-width @click="emit_play(true)">
                  <i class="fa fa-play-circle-o" />
                </mu-button>
                <mu-button v-else icon small full-width color="#5cb6ff" @click="emit_play(false)">
                  <i class="fa fa-pause-circle-o" />
                </mu-button>
                <mu-button
                  v-if="!underway"
                  icon
                  small
                  full-width
                  @click="download(data.url,data.fileName)"
                >
                  <i class="fa fa-download" />
                </mu-button>
                <mu-button v-else icon small full-width color="#5cb6ff">
                  <i
                    class="fa fa-spinner fa-spin"
                    style="font-size:20px;line-height:30px;color:#5cb6ff;"
                  />
                </mu-button>
              </div>
            </div>
          </div>
          <mu-button
            class="btn-download"
            small
            flat
            color="grey50"
            :href="data.url"
            target="_blank"
          >兼容下载</mu-button>
          <mu-button class="close" @click="close" small icon color="grey700">
            <i class="fa fa-close" />
          </mu-button>
        </div>
      </div>
    </div>
  </E-mask-layer>
</template>

<script>
import EMaskLayer from "../E-mask-layer.vue";
import { imgPrestrain, api, addEvent, eDragPercentage } from "@/plug-in/api.js";

export default {
  components: { EMaskLayer },
  props: {
    data: {
      type: Object,
      default() {
        return {
          name: "芒种",
          artistName: "音阙诗听、赵方婧",
          url:
            "http://m7.music.126.net/20191016222936/26b37b163c195bef94b49f10b7db088f/ymusic/0152/055a/5308/681ef6f50f20971ac5bddb07161fc6b5.mp3",
          pic:
            "https://p3.music.126.net/7ZKMPIvPcwaK08ffDBTjJw==/109951164124664532.jpg",
          lyric_obj: [
            {
              time: 0,
              content: "音阙诗听、赵方婧 - 芒种"
            },
            {
              time: 50,
              content: "编曲：Morri3on(喬凡三)"
            }
          ]
        };
      }
    },
    router: Object
  },
  data() {
    return {
      el: null,
      audio: null,
      active: false,
      show: false,
      underway: false,
      play: false,
      lyricIndex: -1,
      musicProgress: 0,
      decorateProgress: -1,
      bgUrl: ""
    };
  },
  mounted() {
    // 图片预加载
    this.alterBg(this.data.pic);
    this.router.replace({ query: { type: "music", id: this.data.id } });
  },
  methods: {
    close() {
      this.router.replace({ query: {} });
      this.el.querySelector(".card-gif").style.animationName = "overturnF"; // 播放CSS动图效果
      setTimeout(() => {
        this.$emit("close");
        this.el.remove();
      }, 1000); // 预留点时间播放动图效果
    },
    alterBg(imgUrl) {
      this.show = false;
      imgPrestrain(imgUrl).then(url => {
        this.bgUrl = url;
        this.show = true;
      });
    },
    emit_play(is) {
      is ? this.audio.play() : this.audio.pause();
    },
    download(url, filename) {
      this.underway = true;
      api
        .download(url, filename + ".mp3")
        .then(() => (this.underway = false), () => (this.underway = false));
    },
    timeupdate() {
      const dom = this.audio;
      let total = dom.duration || 0,
        newTime = dom.currentTime || 0,
        progress = newTime / total;
      this.musicProgress = progress * 100 || 0; // 0 ~ 100
      const arr = this.data.lyric_obj,
        len = this.data.lyric_obj.length;
      let index = false;
      for (let i = 0; i < len; i++) {
        const time = arr[i].time / 1000;
        if (newTime > time) {
          index = i;
        }
      }
      if (index !== this.lyricIndex) this.lyricIndex = index;
    }
  },
  directives: {
    acquire: {
      bind(el, binding, vnode) {
        vnode.context.el = el;
      }
    },
    control: {
      bind(el, binding, vnode) {
        vnode.context.audio = el;
      }
    },
    scroll(el, binding, vnode) {
      // 歌词滚动、
      let domActive = el.querySelector("li.active");
      if (domActive) {
        const scrollTop =
          domActive.offsetTop - el.offsetTop - (el.offsetHeight / 2 - 70);
        // 兼容
        if (el.scrollTo) {
          el.scrollTo({ top: scrollTop, behavior: "smooth" });
        } else {
          el.scrollTop = scrollTop;
        }
      }
    },
    progressBar: {
      bind(el, binding, vnode) {
        const self = vnode.context; // vue实例
        addEvent(el, "mousedown", event => {
          eDragPercentage(event, (progress, is) => {
            self.decorateProgress = progress * 100;
            if (is) {
              self.decorateProgress = -1;
              self.musicProgress = progress * 100;
              const total = self.audio.duration || 0;
              self.audio.currentTime = progress * total;
            }
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
.E-card {
  margin-top: -50%;
  width: 85vw;
  max-width: 450px;
  height: 300px;
  perspective: 1000px;
  user-select: none;

  @keyframes overturn {
    0% {
      opacity: 0;
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(0);
      opacity: 1;
    }
  }

  @keyframes overturnF {
    0% {
      transform: rotateY(0);
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: rotateY(180deg);
    }
  }

  & > .card-gif {
    height: 100%;
    position: relative;
    overflow: hidden;
    background: rgb(240, 240, 240);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    animation: overturn 1s forwards;

    & > .bg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 2s;
      &.active {
        opacity: 1;
      }
    }
    & > .wrap-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      & > .wrap-lyrie {
        overflow-y: scroll;
        height: 100%;
        color: #fff;
        ul {
          padding: 0;
          margin: 0;
          margin-top: 20px;
          margin-bottom: 100px;
          & > li {
            list-style: none;
            text-align: center;
            margin: 2px 0;
            &.active {
              color: #d5ff85;
            }
          }
        }
      }
      & > .wrap-control {
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.7);
        width: 100%;
        padding-bottom: 10px;
        .wrap-progress {
          padding: 10px;
          .progress-bg,
          .progress-bar {
            position: relative;
            height: 5px;
            border-radius: 5px;

            background: #d9d9d9;
          }
          .progress-bar {
            position: relative;
            width: 0%;
            background: #77bbd0;
            i.bar {
              display: inline-block;
              width: 12px;
              height: 12px;
              background: #77bbd0;
              border: 3px solid #fff;
              border-radius: 50%;
              position: absolute;
              top: -4px;
              right: -5px;
              cursor: pointer;
              transition: all 0.5s;
              &:hover {
                transform: scale(1.3);
              }
            }
          }
        }
        .box-content {
          padding: 0 10px;
          display: flex;
          & > .flex-left {
            width: calc(100% - 100px);
            p.title {
              margin: 0;
              line-height: 25px;
              vertical-align: middle;
              font-size: 16px;
            }
            p.content {
              margin: 0;
              color: #444;
              line-height: 20px;
              font-size: 12px;
            }
          }
          & > .flex-right {
            width: 100px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            .btn {
              width: 30px;
              height: 30px;
              line-height: 30px;
              font-size: 30px;
              text-align: center;
              i {
                vertical-align: super;
              }
            }
          }
        }
      }
      & > .btn-download {
        position: absolute;
        top: 190px;
        right: 5px;
        min-width: unset;
      }
      & > .close {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
  }
}
</style>