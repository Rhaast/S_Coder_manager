// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import '../node_modules/mavon-editor/dist/css/index.css'
import store from './store/store'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(axios)
Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
