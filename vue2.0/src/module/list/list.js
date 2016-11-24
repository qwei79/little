import Vue from 'vue'
// import App from '../../components/App'
import vhead from '../../components/vhead'
import vfooter from '../../components/vfooter'
import listmain from '../../module/list/list.vue'
import '../../assets/common.css'

import VueResource from 'vue-resource'
// 开启debug模式
Vue.config.debug = true

Vue.use(VueResource)

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App>',
//   components: { App }
// })

new Vue({
  el: '#vhead',
  template: '<vhead>',
  // components: { vhead },
  components: { vhead }
})

new Vue({
  el: '#vfooter',
  template: '<vfooter>',
  components: { vfooter }
})

new Vue({
  el: '#listmain',
  template: '<listmain>',
  components: { listmain }
})
