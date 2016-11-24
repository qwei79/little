import Vue from 'vue'
// import App from '../../components/App'
import vhead from '../../components/vhead'
import vfooter from '../../components/vfooter'
import indexmain from '../../module/index/indexmain'
import '../../assets/common.css'

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
  el: '#indexmain',
  template: '<indexmain>',
  components: { indexmain }
})
