import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import './assets/scss/base.scss'
import './assets/scss/common.scss'

import {
    Form , Field, Dialog, Toast, Button, Tabbar, TabbarItem, Overlay, Tab, Tabs, NoticeBar,
    Cell, CellGroup, Popup, CountDown, Picker, DatetimePicker, Uploader, NavBar,
    List, Lazyload, RadioGroup, Radio, Checkbox, CheckboxGroup, Switch,
    Tag, Swipe, SwipeItem, Loading, ActionSheet, DropdownMenu, DropdownItem
  } from 'vant'
Vue.use(Dialog).use(Overlay).use(Popup)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Button).use(Loading)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Cell).use(CellGroup)
Vue.use(Tab).use(Tabs)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(CountDown)
Vue.use(List)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

