<template>
	<div id="container" >
		<div class="weather">
			<div v-show="indexState==0">

				<span class="city">{{city}}</span>
				<image class="w_icon" :src="w_icon_url" mode=""></image>
			</div>

		</div>

		<div class="mapContent" @touchmove.stop.prevent="moveHandle" v-show="indexState==0">
			<map id="map" class="map" :longitude="lng" :latitude="lat" :scale="scale" @regionchange="onRegionChange"
				:markers="markers" @markertap="markertap" @tap="tap">
			</map>
			<!-- <div class="coverBox">

			</div> -->

			<div class='content'>
				<p class="myself" @tap="findway">
					<span class="point"></span>
					<span class="black_word">发布地址</span>
					<span class="green_word">{{this.address}}</span>
				</p>
				<p class="orderDetails">
					<span class="point"></span>
					<span class="black_word">订单详情</span>
					<textarea class="textarea" value="" placeholder="请输入订单详情" />
				</p>
				<p class="name">
					<span class="point"></span>
					<span class="black_word">雇主姓名</span>
					<input class="input" type="text" value="" />
				</p>
				<p class="phone">
					<span class="point"></span>
					<span class="black_word">雇主电话</span>
					<input class="input" type="text" value="" />
				</p>
			</div>
			<div class="sendOrder">
				<span>发布订单</span>
			</div>
		</div>
		<div class="myselfContent">
			<div class="information">
				<image src="../../static/userPortrait.png" mode=""></image>
				<span class="userName">{{userName}}</span>
			</div>
			<ul class="functionList">
				<li @click="order_click">
					<image src="../../static/order_icon.png" mode=""></image>
					<span>订单</span>
				</li>
				<li>
					<image src="../../static/wallet_icon.png" mode=""></image>
					<span>钱包</span>
				</li>
				<li>
					<image src="../../static/service_icon.png" mode=""></image>
					<span>客服</span>
				</li>
				<li @click="setting_click">
					<image src="../../static/setting_icon.png" mode=""></image>
					<span>设置</span>
				</li>
			</ul>

		</div>
		<!-- <Setting v-if="setting_state==1" class="com_setting"></Setting> -->




		<div class="navBottom">
			<p @click="homeBtn">
				<image v-show="indexState==0" src="../../static/home_select.png" mode=""></image>
				<image v-show="indexState==1" src="../../static/home.png" mode=""></image>
				<span v-show="indexState==0" style="color:rgb(221, 114, 56)">主页</span>
				<span v-show="indexState==1" style="color:#888">主页</span>
			</p>
			<p @click="userBtn">
				<image v-show="indexState==0" src="../../static/user.png" mode=""></image>
				<image v-show="indexState==1" src="../../static/user_select.png" mode=""></image>
				<span v-show="indexState==1" style="color:rgb(221, 114, 56)">我的</span>
				<span v-show="indexState==0" style="color:#888">我的</span>
			</p>

		</div>

	</div>
</template>
<script>
	import store from '../../store/index.js'
	// import Setting from '../myself/setting/setting.vue'
	export default {
		// components: {
		// 	Setting: Setting
		// },
		data() {
			return {
				// setting_state:0,
				// 0为企业,1为用户
				userState: 0,
				// 0为主页页面，1为我的页面
				indexState: 0,
				w_icon_url: "../../static/cloudy.png",
				city: "苏州市",
				btnWord: "发布订单",
				lng: "",
				lat: "",
				scale: "15",
				address: "",
				myself: {

				},
				user: "",
				userName: "预言家admin",
				markers: [
					// 	{
					// 	id: 1,
					// 	latitude: 31.982903,
					// 	longitude: 118.733654,
					// 	name: 'T.I.T 创意园',
					// 	width: 180,
					// 	height: 180,
					// 	title: '我是一个markers',
					// 	iconPath: '../../static/peopleIcon.png'
					// },
				],
			}
		},
		onLoad() {
			console.log(this.indexState)
			this.indexState = this.index_state
			uni.getStorage({
				key: 'user',
				success: (res) => {
					console.log(res);
				}
			});

			var that = this
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					// console.log('当前位置的经度：' + res.longitude);
					// console.log('当前位置的纬度：' + res.latitude);
					// console.log('当前位置的纬度：' + res.address);
					// console.log(res)
					this.lng = res.longitude
					this.lat = res.latitude
					let a = res.address
					// a.district + a.street + a.streetNum +
					this.address = a.poiName
					this.city = a.city
					// 获取天气
					uni.request({
						url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + this.city,
						method: 'GET',
						success: res => {
							// console.log(res.data.data);
							let today = res.data.data.forecast[0].type
							if (today === '阴') {
								this.w_icon_url = '../../static/overcast.png'
							} else if (today === '多云') {
								this.w_icon_url = '../../static/cloudy.png'
							} else if (today === '晴') {
								this.w_icon_url = '../../static/sunny.png'
							} else if (today.indexOf("雨") != -1) {
								this.w_icon_url = '../../static/rain.png'
							}
							// console.log(this.w_icon_url)
							// this.cylinderEmpty.temperature = Math.round(res.data.data.wendu);
						},
						fail: () => {
							this.openmsg("警告", "天气接口获取失败")
						},
						complete: () => {}
					});

					// 将数据缓存
					uni.setStorage({
						key: 'user',
						data: {
							lng: this.lng,
							lat: this.lat,
							address: this.address,
							user: this.user
						},
						success: function() {
							console.log('存入本地成功');
						}
					});
					this.myself = {
						id:1,
						latitude: this.lat,
						longitude: this.lng,
						name: this.address,
						width: 100,
						height: 140,
						title: this.address,
						iconPath: '../../static/myself_icon.png'
					}
					this.markers = []
					this.markers.push(this.myself)

					setTimeout(()=>{
						this.markers.push({
						id:2,
						latitude: 31.982903,
						longitude: 118.733654,
						name: '王八蛋',
						width: 100,
						height: 140,
						title: this.address,
						iconPath: '../../static/peopleIcon1.png',
						callout: {
							//自定义标记点上方的气泡窗口 点击有效
							content: 'Name:' + this.address + 'ID:',
							color: '#fff',
							fontSize: 15,
							borderRadius: 5
						}
					},1000)

					})
				}
			});
			// console.log(this.city)


			// let system = uni.getSystemInfoSync()
			// if(system.platform === 'android'){//判断平台
			//     var context = plus.android.importClass("android.content.Context")
			//     var locationManager = plus.android.importClass("android.location.LocationManager")
			//     var main = plus.android.runtimeMainActivity()
			//     var mainSvr = main.getSystemService(context.LOCATION_SERVICE)
			//     console.log('GPS',mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER))
			//     if(!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)){
			//         uni.showModal({
			//             title:'提示',
			//             content:'请打开定位服务功能',
			//             showCancel:false,
			//             success() {
			//                 if(!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)){
			//                     let main = plus.android.runtimeMainActivity();
			//                     let Intent = plus.android.importClass("android.content.Intent");
			//                     let mIntent = new Intent('android.settings.ACTION_SETTINGS');
			//                     main.startActivity(mIntent);//打开系统设置GPS服务页面 
			//                 }else{
			//                     uni.showToast({
			//                         title:'定位功能已启动',
			//                         duration:2000
			//                     })
			//                 }
			//             }
			//         })
			//     }
			// }


		},


		methods: {
			markertap(e){
				console.log(e)
			},
			tap(e){
				console.log(e)
			},
			moveHandle(){

			},
			order_click(){
				uni.navigateTo({
					url: '/pages/myself/order/order',
				});
			},
			setting_click() {
				uni.navigateTo({
					url: '/pages/myself/setting/setting',
					// url:'/pages/function/test'
				});
				// console.log('我点击setting')
				// // this.setting_state=1
				// store.dispatch('setting_state_edit_action',1)
				// console.log(store.state.setting_state)
			},
			pay() {
				// 支付宝支付
				// uni.requestPayment({
				// 	// provider:'alipay',
				// 	provider:'wxpay',
				// 	// orderInfo: res.data.paymentForm,
				// 	success: (e) => {
				// 		console.log('支付成功')
				// 	},
				// 	fail: (e) => {
				// 		console.log('支付失败')
				// 	}
				// }) 
				// 微信支付
				// uni.requestPayment({
				//     "provider": "wxpay", 
				//     "orderInfo": {
				//         "appid": "wx499********7c70e",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
				//         "noncestr": "c5sEwbaNPiXAF3iv", // 随机字符串
				//         "package": "Sign=WXPay",        // 固定值
				//         "partnerid": "148*****52",      // 微信支付商户号
				//         "prepayid": "wx202254********************fbe90000", // 统一下单订单号 
				//         "timestamp": 1597935292,        // 时间戳（单位：秒）
				//         "sign": "A842B45937F6EFF60DEC7A2EAA52D5A0" // 签名，这里用的 MD5 签名
				//     },
				//     success(res) {},
				//     fail(e) {}
				// })
				// 注册使用第三方登录
				// uni.getProvider({
				// 	service: 'oauth',
				// 	success: function(res) {
				// 		console.log(res.provider)
				// 		if (~res.provider.indexOf('qq')) {
				// 			uni.login({
				// 				provider: 'qq',
				// 				success: function(loginRes) {
				// 					console.log(JSON.stringify(loginRes));
				// 				}
				// 			});
				// 		}
				// 	}
				// });
			},
			getWeather() {
				// console.log(this.city)
				uni.request({
					url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + this.city,
					method: 'GET',
					success: res => {
						// console.log(res.data.data);
						let today = res.data.data.forecast[0].type
						if (today === '阴') {
							this.w_icon_url = '../../static/overcast.png'
						} else if (today === '多云') {
							this.w_icon_url = '../../static/cloudy.png'
						} else if (today === '晴') {
							this.w_icon_url = '../../static/sunny.png'
						} else if (today.indexOf("雨") != -1) {
							this.w_icon_url = '../../static/rain.png'
						}
						// console.log(this.w_icon_url)
						// this.cylinderEmpty.temperature = Math.round(res.data.data.wendu);
					},
					fail: () => {
						this.openmsg("警告", "天气接口获取失败")
					},
					complete: () => {}
				});
			},
			findway() {
				uni.chooseLocation({
					success: (res) => {
						// console.log(res)
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
						this.lng = res.longitude
						this.lat = res.latitude
						this.address = res.name

						this.myself = {
							// id: 1,
							latitude: this.lat,
							longitude: this.lng,
							name: this.address,
							width: 100,
							height: 140,
							title: this.address,
							iconPath: '../../static/myself_icon.png'
						}
						this.markers = []
						this.markers.push(this.myself)


						// setTimeout(()=>{
						this.getLocByLngLat()
						// },1000)
					}
				})



			},
			// 通过经纬度获取当前位置信息
			getLocByLngLat() {
				var point = new plus.maps.Point(this.lng, this.lat);
				plus.maps.Map.reverseGeocode(
					point, {},
					(event) => {
						console.log(event)
						var address = event.address; // 转换后的地理位置
						var point = event.coord; // 转换后的坐标信息
						var coordType = event.coordType; // 转换后的坐标系类型
						console.log(address);
						// that.address = address
						var reg = /.+?(省|市|自治区|自治州|县|区)/g;
						var addressList = address.match(reg).toString().split(",");
						console.log(addressList)
						if (addressList[0].indexOf('市') != -1 || addressList[0].indexOf('香港') != -1 || addressList[0]
							.indexOf('澳门') != -1) {
							this.city = addressList[0]
						} else {
							this.city = addressList[1]
						}
						console.log(this.city)
					},
				);
			},
			homeBtn() {
				this.indexState = 0
			},
			// 点击'我的'按钮
			userBtn() {
				if (this.user_state == 1) {
					// let url = '/pages/index/myself'
					// let param = {
					// 	phoneNumber: this.user
					// }
					// this.$navTo.togo(url, param,'none')
					this.indexState = 1
				} else {
					uni.navigateTo({
						url: '/pages/login/login',
					});
				}
			},
			user_icon() {
				// console.log('点击我的')
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			index_icon() {
				let curRoute = this.$mp.page.route
				console.log(curRoute)
				if (curRoute !== "pages/index/index") {
					uni.navigateTo({
						url: '/pages/index/index',
					});
				}

			},
			releaseOrder() {
				console.log('点击订单')
			},
			//中心点移动事件
			onRegionChange(e) {
				const that = this
				// if (e.type == 'end') { //在安卓中是 end 事件
				// 	console.log('andorid')
				// 	that.getCenterLatLong()
				// } else if (e.type == 'regionchange') { // 在ios中是 regionchange
				// 	console.log('ios')
				// that.getCenterLatLong()
				// }
			},
			//获取中心点位置
			getCenterLatLong() {
				const that = this
				let map = uni.createMapContext('map', this);
				map.getCenterLocation({
					success: res => {
						that.latitude = res.latitude
						that.longitude = res.longitude

						let UserLocation = res.longitude + ',' + res.latitude + ',' + res.name
						console.log(UserLocation)
						var point = new plus.maps.Point(res.longitude, res.latitude);
						plus.maps.Map.reverseGeocode(
							point, {},
							function(event) {
								console.log(event)
								var address = event.address; // 转换后的地理位置
								var point = event.coord; // 转换后的坐标信息
								var coordType = event.coordType; // 转换后的坐标系类型
								console.log(address);
								that.address = address
								var reg = /.+?(省|市|自治区|自治州|县|区)/g;
								var addressList = address.match(reg).toString().split(",");
								console.log(addressList)
							},
						);
						// uni.setStorageSync('UserLocation', UserLocation);
						// that.getRange()
					},
					fail: () => {
						uni.showToast({
							title: '获取定位失败',
							icon: 'none'
						});
					},
					// complete: () => {
					// 	that.getLocationStatus = false
					// }
				});
			},
			//计算附近点位信息
			getRange() {
				const that = this
				let lists = []
				for (let item = 0; item < that.oldMarkers.length; item++) {
					// console.log(item,that.latitude, that.longitude) 
					let isComputer = that.rangeComputer(that.latitude, that.longitude, that.oldMarkers[item].latitude, that
						.oldMarkers[item].longitude, 0.5)

					if (isComputer) {
						lists.push(that.oldMarkers[item])
					}

				}
				that.markers = lists
			},
		},
		computed: {
			index_state() {
				return store.state.index_state
			},
			user_state() {
				return store.state.user_state
			},
			setting_state() {
				return store.state.setting_state
			},
		},
		watch: {
			city(val) {
				this.getWeather()
			},
			index_state(val){
				console.log(val)
				this.indexState = val
			}
		},
		onBackPress(){
			return true
		}
	}

	// export const openPosition = ()=>{

	// }
</script>

<style lang="scss">
	uni-page-body,
	uni-page-refresh {
		height: 100%;
	}

	#container {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to right bottom, rgb(255, 217, 198), rgb(251, 250, 248), rgb(255, 217, 198));

		// background-image: linear-gradient(to right, rgb(255, 246, 231), rgb(251, 250, 248));
		.weather {
			// position: absolute;
			width: 100%;
			height: 10%;
			line-height: 8;

			.city {
				font-weight: 600;
				// position: absolute;
				// top: 10px;
				// left: 20px;
				margin-left: 20px;

			}

			.w_icon {
				width: 20px;
				height: 20px;
				position: relative;
				top: 5px;
				left: 20px;
				// position: absolute;
				// top: 8px;
				// left: 85px;
			}
		}

		.mapContent {
			width: 100%;
			height: 83%;
			position: relative;
			// overflow: auto;

			.map {
				width: 95%;
				height: 60%;
				// width: 350px;
				// height: 500px;
				// border-radius: 20px;
				// position: absolute;s
				// top: 80px;
				left: 50%;
				transform: translateX(-50%);
				// border: 2px solid red;
				// overflow: hidden;
				box-shadow: 0px 0px 18px rgb(255, 255, 255);
			}
			
			.content {
				background: rgba(255, 255, 255, 0.9);
				border-radius: 20px 20px 0 0;
				box-shadow: 0px -5px 5px rgba($color: #000000, $alpha: 0.1);
				// position: absolute;
				width: 100%;
				// top: 385px;
				// position: absolute;
				// top: 500px;

				p {
					width: 100%;
					height: 30px;
					line-height: 30px;

					.point {
						display: inline-block;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						margin-left: 20px;
						margin-right: 10px;
					}

					.black_word {
						color: #000;
						font-weight: 400;
						display: inline-block;
					}
				}

				.myself {
					margin-top: 10px;

					.point {
						background: green;
					}

					.green_word {
						color: green;
						font-weight: 600;
						margin-left: 10px;
						font-size: 14px;
						// border: 1px solid red;
						width: 250px;
						// height: 30px;
						// line-height: 15px;
						display: inline-block;
						text-overflow: ellipsis;
						overflow: hidden;
						vertical-align: bottom;
						white-space: nowrap;
					}
				}

				.orderDetails {
					margin-top: 10px;

					.point {
						background: #ff5500;
					}

					.textarea {
						width: 250px;
						height: 60px;
						line-height: 20px;
						letter-spacing: 1rpx;
						border: 1px solid #eeeeee;
						border-radius: 3px;
						display: inline-block;
						margin-left: 10px;
						font-size: 14px;
						// float: left;
					}
				}

				.name {
					margin-top: 50px;

					.point {
						background: #b5b5b5;
					}

					.input {
						width: 140px;
						border-bottom: 1px solid #ccc;
						display: inline-block;
						vertical-align: middle;
						margin-left: 10px;
						font-size: 16px;
						position: relative;
						top: -2px;
					}
				}

				.phone {
					margin-top: 10px;

					.point {
						background: #b5b5b5;
					}

					.input {
						width: 140px;
						border-bottom: 1px solid #ccc;
						display: inline-block;
						vertical-align: middle;
						margin-left: 10px;
						font-size: 16px;
						position: relative;
						top: -2px;
						text-align: center;
					}

				}
			}

			.sendOrder {
				width: 200px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				color: #FFFFFF;
				background: #092845;
				font-weight: 800;
				font-size: 16px;
				border-radius: 5px;
				margin: 0 auto;
				margin-top: 10px;
				// position: absolute;
				// left: 50%;
				// transform: translateX(-50%);
				// bottom: 60px;
			}
		}

		.myselfContent {
			width: 100%;
			height: 83%;
			// border: 1px solid red;
			position: relative;
			overflow: auto;

			.information {
				// top: 80px;
				width: 100%;
				height: 50px;
				line-height: 50px;

				image {
					width: 50px;
					height: 50px;
					border-radius: 50px;
					border: 1px solid #ffffff;
					vertical-align: bottom;
					margin-left: 17px;
				}

				.userName {
					margin-left: 15px;
					font-size: 14px;
					font-weight: 600;
				}
			}

			.functionList {
				width: 95%;
				margin: 0 auto;
				box-shadow: 0 0 10px #ccc;
				height: 120px;
				display: flex;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 100px;
				border-radius: 10px;
				background: #fff;

				// margin-top: 20px;
				li {
					flex: 1;
					list-style: none;
					// border: 1px solid red;
					position: relative;
					height: 100%;

					image {
						width: 30px;
						height: 30px;
						position: absolute;
						top: 35px;
						left: 50%;
						transform: translateX(-50%);
					}

					span {
						font-size: 14px;
						font-weight: 600;
						position: absolute;
						top: 70px;
						left: 50%;
						transform: translateX(-50%);

					}
				}
			}
		}

		.com_setting {}

		.navBottom {
			// position: absolute;
			bottom: 0;
			width: 100%;
			height: 7%;
			background: #ffffff;
			display: flex;
			position: fixed;
			box-shadow: 0 0 5px #ccc;

			p {
				// width: 100px;
				height: 45px;
				line-height: 45px;
				text-align: center;
				float: left;
				// border: 1px solid #ccb3bd;
				flex: 1;
				position: relative;

				image {
					width: 30px;
					height: 30px;
					position: absolute;
					top: 10px;
				}

				span {
					font-size: 10px;
					font-weight: 600;
					position: absolute;
					bottom: -22px;
				}
			}

			p:nth-child(1) {
				color: rgb(221, 114, 56);

				image {
					left: 60px;
				}

				span {

					left: 65px;
				}
			}

			p:nth-child(2) {
				color: #888;

				image {
					right: 60px;
				}

				span {

					right: 65px;
				}
			}
		}
	}
</style>
