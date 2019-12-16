import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FirebaseApp from './firebase'
import './assets/scss/app.scss'
import './utils/directives'

Vue.use(FirebaseApp)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
