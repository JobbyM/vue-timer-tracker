<template>
	<div>
		<!-- `v-if` 是vue 的一个指令
		`$route.path` 是当前路由对象的路径，会被解析为绝对路径
		`$route.path !== '/time-entries/log-time'` 为`true` 是显示，`false` 为不显示
		`v-link` 路由跳转地址 -->
		<button
			v-if="$route.path !== '/time-entries/log-time'"
			v-link="'/time-entries/log-time'"
			class="btn btn-primary">
			创建
		</button>

		<div v-if="$route.path !== '/time-entries/log-time'">
			<h3>创建</h3>
		</div>

		<hr>
	
		<!-- 下一级视图 -->
		<router-view></router-view>

		<div class="time-entries">
			<p v-if="!timeEntries.length"><strong>还没有任何内容</strong></p>

			<div class="list-group">
				<!-- v-for 循环渲染 -->
				<a class="list-group-item" v-for="timeEntry in timeEntries">
					<div class="row">
						
						<div class="col-sm-2 user-details">
							<!-- `:src` 实行，这个是vue 的属性绑定简写`v-bind` 可以缩写为`:`
							比如a 标签的`href` 可以写为`:href` 并且在vue 的指令里就一定不要写
							插值表达式了（`:src={{xxx}}`）,vue自己会解析 -->
							<img src="https://avatars1.githubusercontent.com/u/10184444?v=3&s=460" class="avatar img-circle img-responsive">
							<p class="text-center">
								<strong>
									令狐冲
								</strong>
							</p>
						</div>

						<div class="col-sm-2 text-center time-block">
							<h3 class="list-group-item-text total-time">
								<i class="glyphicon glyphicon-time"></i>
								{{ timeEntry.totalTime}}
							</h3>
							<p class="label label-primary text-center">
								<i class="glyphicon glyphicon-calendar"></i>
								{{ timeEntry.date}}
							</p>
						</div>

						<div class="col-sm-7 comment-section">
							<p>{{ timeEntry.comment }}</p>
						</div>

						<div class="col-sm-1">
							<!-- 事件绑定简写 @xxx -->
							<button
								class="btn btn-xs btn-danger delete-button"
								@click="deleteTimeEntry(timeEntry)">
								X
							</button>
						</div>
					</div>
				</a>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data () {
			// 事先模拟一个数据
			// let existingEntry = {
			// 	user: {
			// 		name: '令狐冲',
			// 		email: 'linghuchong@xiaoaojianghu.com',
			// 		image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
			// 	},
			// 	comment: '我的一个备注',
			// 	totalTime: 1.5,
			// 	date: '2016-09-01'
			// }

			return {
				timeEntries: [existingEntry]
			}
		},
		methods: {
			deleteTimeEntry (timeEntry) {
				// 这个方法用于删除某一项计划
				let index = this.timeEntries.indexOf(timeEntry)
				if(window.confirm('确定要删除吗？')){
					this.timeEntries.splice(index, 1)
					// 这里会派发到父组件上，执行父组件events 里的deleteTime 方法
					this.$dispatch('deleteTime', timeEntry)
				}
			}
		},
		events: {
			timeUpdate (timeEntry) {
				this.timeEntries.push(timeEntry)
				// 继续向上派发
				return true
			}
		}
	}
</script>

<style>
	.avatar {
		height: 75px;
		margin: 10px auto;
	}
	.user-details {
		background-color: #f5f5f5;
		border-right: 1px solid #ddd;
		margin: -10px 0;
	}
	.time-block {
		padding: 10px;
	}
	.comment-section {
		padding: 20px;
	}
</style>
