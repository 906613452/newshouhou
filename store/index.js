import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		//0为未登录，1为已登录
		"user_state": 1,
		// 主页的状态,0为主页，1为我的页面
		"index_state": 0,
		"username": "foo",
		"age": 18,
		"setting_state": 0,
		user:'',
		orderAddress:{}

	},
	mutations: {
		setUser(state, val) {
			state.user = val
		},
		setOrderAddress(state, val) {
			state.orderAddress = val
		},
		setting_state_edit(state, val) {
			state.setting_state = val
		},
		user_state_edit(state, val) {
			state.user_state = val
		},
		index_state_edit(state, val) {
			state.index_state = val
		},
	},
	actions: {
		setOrderAddress(context, val) {
			context.commit("setOrderAddress", val);
		},
		setUser(context, val) {
			context.commit("setUser", val);
		},
		setting_state_edit_action(context, val) {
			context.commit("setting_state_edit", val);
		},
		user_state_edit_action(context, val) {
			console.log(context)
			console.log(val)
			context.commit("user_state_edit", val);
		},
		index_state_edit_action(context, val) {
			context.commit("index_state_edit", val);
		},
	}
})
export default store
