<template>
	<div class="register">
		<u-toast ref="uToast" />
		<p class="registerP">
			<span>用户名：</span>
			<input class="input" v-model="user" type="text" placeholder="用户名" />
		</p>
		<p class="registerP">
			<span>密码：</span>
			<input class="input" v-model="password" type="password" placeholder="请输入密码" />
		</p>
		<p class="registerP">
			<span>密码：</span>
			<input class="input" v-model="rePassword" type="password" placeholder="请再次输入密码" />
		</p>
		
		<div>
			<u-radio-group v-model="userKind" @change="radioGroupChange">
				<u-radio @change="radioChange" v-for="(item, index) in userKindArr" :key="index" :name="item.name"
					:disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>
		</div>
		<div>
			<u-checkbox-group @change="checkboxGroupChange">
				<u-checkbox @change="checkboxChange" v-model="serviceChecked">同意并接受
					<span>服务条款</span>
				</u-checkbox>
			</u-checkbox-group>
		</div>
		<div class="registerBtn" @click="register">
			注册
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: "",
				password: "",
				rePassword: "",
				serviceChecked: true,
				userKind:'我是师傅',
				userKindArr: [{
						name: '我是师傅',
						disabled: false
					},
					{
						name: '我是商家',
						disabled: false
					}
				],
			}
		},
		methods: {
			radioChange() {

			},
			radioGroupChange(val) {
				console.log(val)
				if(val === '我是商家'){
					
				}else {
					
				}
			},
			checkboxGroupChange(val) {
				console.log(val)
			},
			checkboxChange(val) {
				console.log(val)
			},
			register() {
				if(this.user !== '' && this.password !== '' && this.rePassword !==''){
					if(this.password === this.rePassword){
						if (this.serviceChecked == true) {
							// uni.navigateTo({
							// 	url: '/pages/index/myself',
							// });
							this.$refs.uToast.show({
								title: '操作成功',
								type: 'success',
								url: '/pages/index/myself'
							})
						} else {
							this.$refs.uToast.show({
								title: '请选择勾选“同意并接受服务条款”',
								type: 'warning'
							})
						}
					} else {
						this.$refs.uToast.show({
							title: '两次密码输入不一致',
							type: 'error'
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '用户名和密码不能为空',
						type: 'warning'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.register{
		.registerP{
			width: 100%;
			height: 40px;
			line-height: 40px;
			// border-bottom: 1px solid #ccc;
			margin-top: 10px;
			span{
				width: 80px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				float: left;
				display: inline-block;
			}
			.input{
				float: left;
				width: 250px;
				height: 40px;
				text-indent: 5px;
				border: 1px solid #ccc;
				border-radius: 5px;
			}
		}
		
		.registerBtn{
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: rgb(5, 201, 255);
			color: white;
			text-align: center;
			line-height: 40px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	
</style>
