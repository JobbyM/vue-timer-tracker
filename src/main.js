import Vue from 'vue'
import App from './App'
import Home from './components/Home.vue'
import TimeEntries from './components/TimeEntries.vue'
import LogTime from './components/LogTime.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

// 注册两个组件
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()

// 路由map
router.map({
	'/Home':{
		component: Home
	},
	'/time-entries': {
		component: TimeEntries,
		subRoutes: {
			'/log-time': {
				component: LogTime
			}
		}
	}
})

router.redirect({
	'*': '/Home'
})

router.start(App, '#app')