import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import router from './router'
import router from './router/index.js'
import store from '@/store/store.js'
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuetify)
export default new Vuetify({
  icons: {
    iconfont: 'md' // 'md' || 'mdi' || 'fa' || 'fa4'
  },
  theme: {
    dark: false
  },
  themes: {
    light: {
      primary: "#4682b4",
      secondary: "#b0bec5",
      accent: "#8c9eff",
      error: "#b71c1c",
    }
  }
})




new Vue({
  vuetify : new Vuetify(),
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
