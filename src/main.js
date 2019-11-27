import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store.js';
import './plug-in/muse-ui.js';
// import './plug-in/animation.scss';
import './plug-in/init.scss';
import 'font-awesome-sass/assets/stylesheets/_font-awesome.scss';
import './plug-in/attachEvent.js';
import './plug-in/element-ui.js';
import musicCard from './plug-in/myComp.js';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
import '@/plug-in/vant.js';
Vue.use(VueAwesomeSwiper)
Vue.use(musicCard);

Vue.config.productionTip = false

Vue.prototype.bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 解析完毕执行
router.beforeResolve((to, from, next) => {
  Vue.prototype.bus.$emit('nav', to.name);
  next();
})