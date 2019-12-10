import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import MpvueCropper from 'mpvue-cropper'

Vue.use(MpvueRouterPatch)
Vue.use(MpvueCropper)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
