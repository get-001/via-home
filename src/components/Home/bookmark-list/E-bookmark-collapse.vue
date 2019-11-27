<template>
  <div class="E-bookmark-collapse">
    <el-collapse class="wraper-collapse" accordion>
      <el-collapse-item v-for="(item, index) in data" :key="index" :name="item.name">
        <template slot="title">
          <i class="header-icon" :class="item.icon" />
          {{item.title}}
        </template>
        <mu-list textline="two-line" style="padding:0;">
          <mu-list-item
            v-for="(item, index) in item.list"
            :key="index"
            :href="item.url"
            avatar
            button
          >
            <mu-list-item-action>
              <mu-avatar style="background:transparent;">
                <div class="box-image">
                  <span
                    v-if="!bookmark.forbidIcon&&item.imgUrl"
                    :style="`background-image:url(${item.imgUrl})`"
                  ></span>
                  <span
                    v-else
                    :style="{background:color[randomNum(0, color.length)]}"
                  >{{item.title[0]}}</span>
                </div>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
              <mu-list-item-sub-title>
                <span style="color: rgba(0, 0, 0, 0.6)">{{item.content}}</span>
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import safetyColor from "@/plug-in/safetyColor.js";
import { randomNum } from "@/plug-in/api.js";
import { mapState } from "vuex";

export default {
  props: {
    data: {
      type: Array
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
  }
};
</script>

<style lang="scss">
.E-bookmark-collapse {
  user-select: none; // 禁止文本内容选中
  .wraper-collapse {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    & > .el-collapse-item {
      .el-collapse-item__header {
        padding-left: 20px;
        .header-icon {
          font-size: 30px;
          margin-right: 10px;
        }
      }
      .el-collapse-item__wrap {
        & > .el-collapse-item__content {
          padding: 0;
          border-top: 1px solid rgba(0, 0, 0, 0.12);
          .mu-list-two-line {
            // overflow-y: scroll;
            // max-height: 364px;
            & > li {
              border-bottom: 1px solid rgba(0, 0, 0, 0.12);
              &:last-of-type {
                border-bottom: none;
              }
              .box-image {
                position: relative;
                width: 40px;
                height: 40px;
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
            }
          }
        }
      }
    }
  }
}
</style>