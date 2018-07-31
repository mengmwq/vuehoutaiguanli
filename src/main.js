import ElementUI from 'element-ui'; //新添加
import '../static/css/color-dark.css';
import 'element-ui/lib/theme-chalk/index.css'; //新添加，避免后期打包样式不同，要放在import App from './App';之前
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

import "babel-polyfill";

Vue.prototype.$axios = axios;
Vue.use(ElementUI)   //新添加
Vue.config.productionTip = false;// 去除console提示


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
