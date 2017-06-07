import Vue from 'vue'
import App from './App.vue'
import {
  Checkbox,
  Button
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Period from '../../lib/vue-period'
import '../../lib/vue-period.css'

Vue.component('Period', Period)
Vue.use(Checkbox)
Vue.use(Button)

new Vue({
    el: '#app',
    render: h => h(App)
})
