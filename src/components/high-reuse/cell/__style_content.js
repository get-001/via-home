
const navigation = '#app .app-container > .van-hairline--top-bottom';
// 主页(home)
const home = '#app .Home ';
// 扩展(apps)
const apps = '#app .Apps ';
// 扩展(Personal)
const personal = '#app .Personal ';

const initStyle = `
/* 初始化样式 */
${home} > .E-module-search .wrap-entry>.el-tabs .el-tab-pane .mu-paper-round{background-color:transparent;}
/* - 书签，折叠面板，header 样式 */ ${home} .E-bookmark-list .E-bookmark-collapse .wraper-collapse .el-collapse-item__header {background-color:transparent;}
/* - 书签，折叠面板，wrap 样式 */ ${home} .E-bookmark-list .E-bookmark-collapse .wraper-collapse .el-collapse-item__wrap {background-color:transparent;}
`;


export default
  `
/* 演示Demo - 自定义附加全局样式
 * css语法可参考：http://css.doyoe.com
 * 不会弄，需要帮助？(留言) https://dwz.cn/FKzZP2WL
 * (修改时自动保存 input事件) */

${initStyle}

/* 底部导航区 ---------- */
${navigation} {
  background-color: rgba(255, 255, 255, 1);
}

/* 主页(home)样式 ---------- */
/* - 顶部的小按钮 */
${home} .E-head-btn-wrap > .box-btn {
  /* 背景色-白色-透明度为50% */
  background-color: rgba(255, 255, 255, 0.8);
}

/* - 搜索区 */
${home} .E-module-search {}
/* - 搜索区，搜索框样式 */
${home} .E-module-search .wrap-search>.mu-paper-round {
  background-color: rgba(255, 255, 255, 0.8);
}
/* - 搜索区，词条选项卡样式 */
${home} .E-module-search .wrap-entry>.el-tabs{
  background-color: rgba(255, 255, 255, 0.8);
}
/* - 搜索区，词条'收起'面板样式 */
${home} .E-module-search .wrap-entry>.mu-paper-round {
  background-color: rgba(255, 255, 255, 0.8);
}
/* - 横向书签的样式 */
${home} .E-bookmark-exhibition .box-image {
  opacity: 0.6; /* 整体透明 */
}
/* - 书签，折叠面板，header 样式 */
${home} .E-bookmark-list .E-bookmark-collapse .wraper-collapse{
  background-color: rgba(255, 255, 255, 0.8);
}
/* - 分割线样式 */
${home} .el-divider--horizontal {
  background-color: transparent;
}
/* - 分割线样式，内容区 */
${home} .el-divider--horizontal > .el-divider__text {
  background-color: rgba(255, 255, 255, 0.5);
}
`