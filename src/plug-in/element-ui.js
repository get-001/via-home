import Vue from 'vue';
import {
  Button, Loading, Tabs, TabPane, Collapse, CollapseItem, Timeline, TimelineItem, Divider, Link, Drawer, Row, Col
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Divider);
Vue.use(Link);
Vue.use(Drawer);
Vue.use(Row);
Vue.use(Col);
Vue.prototype.$loading = Loading.service;