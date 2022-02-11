<template>
	<div id="login">
		<div class="login_title">
			<!-- <web-view class="webView" :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view> -->
			<p @click="back" class="back"></p>
			<p>嗨，欢迎回来</p>
			<p>登录之后更精彩，无忧售后即将开始</p>
		</div>
		<div class="phone">
			<input maxlength="11" class="phoneInput" type="number" v-model="phoneNumber" placeholder="请输入号码" />
			<p class="nextTick" @click="nextTick">下一步</p>
			<p class="loginProblems">登录遇到问题</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: "",
				icon: '<',
				title: 'Hello',
				value: '你好',
				border: false,
				user: "",
				password: "",
			}
		},
		onLoad() {

		},
		methods: {
			back() {
				// uni.navigateBack({
				// 	delta:100
				// })
				uni.navigateTo({
						url: '/pages/index/index',
						animationType:'none'
					});
				// uni.navigateTo({
				// 	url: '/pages/index/index',
				// 	animationType:'slide-in-right'
				// });
			},
			nextTick() {
				// uni.navigateTo({
				// 	url: '/pages/login/checkCode'
				// });
				let url = '/pages/login/checkCode'
				let param = {
					phoneNumber: this.phoneNumber
				}
				this.$navTo.togo(url, param,'pop-in')
			},
			signIn() {
				uni.navigateTo({
					url: '/pages/index/index',
				});

				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						// console.log('当前位置的经度：' + res.longitude);
						// console.log('当前位置的纬度：' + res.latitude);
						// console.log('当前位置的纬度：' + res.address);
						uni.$emit('update', {
							lng: res.longitude,
							lat: res.latitude,
							address: res.address
						})
					}
				});
			},
			register() {
				uni.navigateTo({
					url: '/pages/login/register',
				});
			},
			
		},
		watch: {
			// phoneNumber(newValue, oldValue) { // 监听电话号码
			// 	if (newValue.length > oldValue.length) {
			// 		this.phoneNumber = newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3')
			// 	} else {
			// 		this.phoneNumber = this.phoneNumber.trim()
			// 	}
			// }
		},
		onBackPress(){
			return true
		}
	}
</script>

<style lang="scss">
	#login {
		width: 100%;
		height: 720px;

		.login_title {
			width: 100%;
			height: 250px;
			// background-image: linear-gradient(to right, rgb(255, 217, 198), rgb(251, 250, 248));
			// background-image: linear-gradient(to right, rgb(97, 184, 79), rgb(251, 250, 248));
			background-image: linear-gradient(
				to left bottom,
				rgb(97, 184, 79),
				rgb(190, 218, 182),
				rgb(1, 100, 95)
			);
			// color: white;
			.webView {
				width: 200px;
				height: 400px;
			}

			

			// position: relative;
			p {
				width: 100%;
				text-indent: 25px;
				display: inline-block;
			}

			.back {
				width: 25px;
				height: 25px;
				// border: 1px solid red;
				position: relative;
				background: url(../../static/back.png)no-repeat;
				background-size: 100% 100%;
				top: 60px;
				left: 20px;
			}

			// p:nth-child(1){
			// 	font-size: 30px;
			// 	margin-top:40px;
			// }
			p:nth-child(2) {
				font-size: 30px;
				font-weight: 600;
				margin-top: 100px;
			}

			p:nth-child(3) {
				margin-top: 10px;
				text-indent: 30px;
			}
		}

		.phone {
			width: 100%;
			height: 400px;
			border-radius: 20px 20px 0 0;
			box-shadow: 0px -5px 5px rgba($color: #000000, $alpha: 0.1);
			// border: 1px solid red;
			position: absolute;
			background: white;
			top: 240px;

			.phoneInput {
				width: 300px;
				height: 50px;
				border-radius: 10px;
				box-shadow: 0px 0px 2px rgba($color: #000000, $alpha: 0.3);
				position: absolute;
				top: 50px;
				left: 50%;
				transform: translateX(-50%);
				font-size: 20px;
				text-align: center;
				caret-color: rgb(231, 142, 95);
				font-weight: 700;
			}

			.nextTick {
				width: 300px;
				height: 50px;
				border-radius: 10px;
				background: rgb(9, 40, 69);
				color: #ffffff;
				position: absolute;
				top: 180px;
				left: 50%;
				transform: translateX(-50%);
				font-size: 20px;
				text-align: center;
				line-height: 50px;
				font-weight: 600;

			}

			.loginProblems {
				width: 120px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				color: #808080;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 240px;
			}
		}
	}
</style>
