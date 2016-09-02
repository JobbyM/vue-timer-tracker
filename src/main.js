import Vue from 'vue'
import App from './App'
import Hello from './components/Hello.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 注册两个组件
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()

// 路由map
router.map({
	'/hello':{
		components: Hello
	}
})

router.redirect({
	'*': '/hello'
})

router.start(App, '#app')