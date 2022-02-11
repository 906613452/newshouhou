<template>
	<div id="container">
		<div class="weather" v-show="indexState==0">
			<div>
				<!-- <span class="city">{{city}}</span>
				<image class="w_icon" :src="w_icon_url" mode=""></image> -->
				<p class="myself" @tap="findway">
					<span class="icon"></span>
					<span class="address">{{this.address}}</span>
				</p>
				<picker class="distance" @change="examinationType" :range="distanceArray">
					<label class="">{{ distanceChoose }}</label>
				</picker>
				<span class="downIcon"></span>
			</div>
		</div>

		<scroll-view class="mapContent" @touchmove.stop.prevent="moveHandle" v-show="indexState==0" :scroll-y="true">
			<ul class="engineersList">
				<li v-for="(item,index) in engineersList" :key="index">
					<image class="portrait" :src="item.headPortrait" alt="">
						<p class="engineerState" v-if="item.state==0" style="background:rgb(95,195,109)">可服务</p>
						<p class="engineerState" v-if="item.state==1" style="background:rgb(255,2,2)">服务中</p>
						<p class="name">{{item.name}}</p>
						<p class="scale">
							<i></i>
							<span>{{item.scale}}</span>
							<span>已服务：{{item.orderNum}}单</span>
							<span class="distance">{{item.distance}}km</span>
						</p>
						<p class="evaluation">
							<i></i>
							<span>{{item.evaluation}}</span>
						</p>
						<p class="appointmentBtn" @click="appointmentBtn(item)">立即预约</p>
				</li>
			</ul>
			<div class="engineerInformation" v-show="showEngineer" @click="hideEngineerInformation">
				<div @click.stop="preventSon" class="i_content">
					<div class="personInt">
						<image class="head" src="../../static/userPortrait.png" alt="">
							<p>
								<span>王凌风</span>
								<span>中级工程师4年</span>
								<span>5.0分</span>
							</p>
							<p>
								擅长维修各种小型机械，手机，电脑，起重机
							</p>
							<p>实名认证</p>
					</div>
					<div class="submit">
						<span class="submitOrderBtn" @click="submitOrderBtn">提交订单</span>
					</div>
				</div>
			</div>
		</scroll-view>
		<div class="myselfContent" v-show="indexState==1">
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
	import store from "../../store/index.js";
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
				myself: {},
				user: "",
				userName: "",
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
				distanceChoose: "<10km",
				distanceArray: ["<10km", "<30km", "<50km", "<80km"],
				engineersList: [],
				showEngineer: false,
				engineer_id: "",
			};
		},
		onLoad() {
			console.log(this.indexState);
			this.indexState = this.index_state;
			uni.getStorage({
				key: "user",
				success: (res) => {
					console.log(res);
					this.userName = res.data.user
				},
			});
			this.getEngineersList()

			uni.getLocation({
				type: "wgs84",
				geocode: true,
				success: (res) => {
					// console.log('当前位置的经度：' + res.longitude);
					// console.log('当前位置的纬度：' + res.latitude);
					// console.log('当前位置的纬度：' + res.address);
					console.log(res)
					this.lng = res.longitude;
					this.lat = res.latitude;
					this.getLocByLngLat()
					
				},
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
			getEngineersList() {
				// var data = {
				//   "user": this.user
				// }
				uni.request({
					url: 'http://192.168.0.65:3000/engineers/list',
					method: 'GET', //get、post、delete
					success: res => {
						console.log(res)
						this.engineersList = res.data
					},
					fail: () => {
						console.log('调用失败')
					}
				})
			},
			submitOrderBtn() {
				let url = "/pages/myself/order/placeOrder";
				let params = {
					id: this.engineer_id
				};
				console.log(this.$navTo)
				this.$navTo.togo(url, params, "pop-in");
				this.showEngineer = false;
			},
			preventSon() {},
			hideEngineerInformation() {
				this.showEngineer = false;
			},
			// 点击立即预约按钮
			appointmentBtn(item) {
				console.log(item);
				this.engineer_id = item.id;
				this.showEngineer = true;
			},
			examinationType(e) {
				console.log(e.target.value);
				let a = e.target.value;
				if (a == 0) {
					this.distanceChoose = "<10km";
				} else if (a == 1) {
					this.distanceChoose = "<30km";
				} else if (a == 2) {
					this.distanceChoose = "<50km";
				} else if (a == 3) {
					this.distanceChoose = "<80km";
				}
			},
			markertap(e) {
				console.log(e);
			},
			tap(e) {
				console.log(e);
			},
			moveHandle() {},
			order_click() {
				uni.navigateTo({
					url: "/pages/myself/order/order",
				});
			},
			setting_click() {
				uni.navigateTo({
					url: "/pages/myself/setting/setting",
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
					url: "http://wthrcdn.etouch.cn/weather_mini?city=" + this.city,
					method: "GET",
					success: (res) => {
						// console.log(res.data.data);
						let today = res.data.data.forecast[0].type;
						if (today === "阴") {
							this.w_icon_url = "../../static/overcast.png";
						} else if (today === "多云") {
							this.w_icon_url = "../../static/cloudy.png";
						} else if (today === "晴") {
							this.w_icon_url = "../../static/sunny.png";
						} else if (today.indexOf("雨") != -1) {
							this.w_icon_url = "../../static/rain.png";
						}
						// console.log(this.w_icon_url)
						// this.cylinderEmpty.temperature = Math.round(res.data.data.wendu);
					},
					fail: () => {
						this.openmsg("警告", "天气接口获取失败");
					},
					complete: () => {},
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
						this.lng = res.longitude;
						this.lat = res.latitude;
						this.address = res.name;
						this.getLocByLngLat();
						// },1000)
					},
				});
			},
			// 通过经纬度获取当前位置信息
			getLocByLngLat() {
				var point = new plus.maps.Point(this.lng, this.lat);
				plus.maps.Map.reverseGeocode(point, {}, (event) => {
					console.log(event);
					this.address = event.address; // 转换后的地理位置
					var address = event.address; // 转换后的地理位置
					var point = event.coord; // 转换后的坐标信息
					var coordType = event.coordType; // 转换后的坐标系类型
					console.log(address);
					// that.address = address
					var reg = /.+?(省|市|自治区|自治州|县|区)/g;
					var addressList = address.match(reg).toString().split(",");
					console.log(addressList);
					if (
						addressList[0].indexOf("市") != -1 ||
						addressList[0].indexOf("香港") != -1 ||
						addressList[0].indexOf("澳门") != -1
					) {
						this.city = addressList[0];
					} else {
						this.city = addressList[1];
					}
					console.log(this.city);
				});
			},
			homeBtn() {
				this.indexState = 0;
			},
			// 点击'我的'按钮
			userBtn() {
				if (this.user_state == 1) {
					// let url = '/pages/index/myself'
					// let param = {
					// 	phoneNumber: this.user
					// }
					// this.$navTo.togo(url, param,'none')
					this.indexState = 1;
				} else {
					uni.navigateTo({
						url: "/pages/login/login",
					});
				}
			},
			user_icon() {
				// console.log('点击我的')
				uni.navigateTo({
					url: "/pages/login/login",
				});
			},
			index_icon() {
				let curRoute = this.$mp.page.route;
				console.log(curRoute);
				if (curRoute !== "pages/index/index") {
					uni.navigateTo({
						url: "/pages/index/index",
					});
				}
			},
			releaseOrder() {
				console.log("点击订单");
			},
			//中心点移动事件
			onRegionChange(e) {
				const that = this;
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
				const that = this;
				let map = uni.createMapContext("map", this);
				map.getCenterLocation({
					success: (res) => {
						that.latitude = res.latitude;
						that.longitude = res.longitude;

						let UserLocation =
							res.longitude + "," + res.latitude + "," + res.name;
						console.log(UserLocation);
						var point = new plus.maps.Point(res.longitude, res.latitude);
						plus.maps.Map.reverseGeocode(point, {}, function(event) {
							console.log(event);
							var address = event.address; // 转换后的地理位置
							var point = event.coord; // 转换后的坐标信息
							var coordType = event.coordType; // 转换后的坐标系类型
							console.log(address);
							that.address = address;
							var reg = /.+?(省|市|自治区|自治州|县|区)/g;
							var addressList = address.match(reg).toString().split(",");
							console.log(addressList);
						});
						// uni.setStorageSync('UserLocation', UserLocation);
						// that.getRange()
					},
					fail: () => {
						uni.showToast({
							title: "获取定位失败",
							icon: "none",
						});
					},
					// complete: () => {
					// 	that.getLocationStatus = false
					// }
				});
			},
			//计算附近点位信息
			getRange() {
				const that = this;
				let lists = [];
				for (let item = 0; item < that.oldMarkers.length; item++) {
					// console.log(item,that.latitude, that.longitude)
					let isComputer = that.rangeComputer(
						that.latitude,
						that.longitude,
						that.oldMarkers[item].latitude,
						that.oldMarkers[item].longitude,
						0.5
					);

					if (isComputer) {
						lists.push(that.oldMarkers[item]);
					}
				}
				that.markers = lists;
			},
		},
		computed: {
			index_state() {
				return store.state.index_state;
			},
			user_state() {
				return store.state.user_state;
			},
			setting_state() {
				return store.state.setting_state;
			},
		},
		watch: {
			city(val) {
				this.getWeather();
			},
			index_state(val) {
				console.log(val);
				this.indexState = val;
			},
		},
		onBackPress() {
			return true;
		},
	};

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
		// background-image: linear-gradient(
		//   to right bottom,
		//   rgb(255, 217, 198),
		//   rgb(251, 250, 248),
		//   rgb(255, 217, 198)
		// );
		background-image: linear-gradient(to right bottom,
				rgb(97, 184, 79),
				rgb(190, 218, 182),
				rgb(1, 100, 95));

		// background-image: linear-gradient(to right, rgb(255, 246, 231), rgb(251, 250, 248));
		.weather {
			// position: absolute;
			width: 100%;
			height: 15%;
			// line-height: 8;
			background: rgb(97, 184, 79);
			// background: rgb(57, 112, 69);
			color: white;
			position: relative;

			.myself {
				// margin-top: 10px;
				position: absolute;
				top: 80px;

				.icon {
					// background: green;
					display: inline-block;
					width: 25px;
					height: 25px;
					// border-radius: 50%;
					margin-left: 20px;
					margin-right: 0px;
					background: url(../../static/white_address.png) no-repeat;
					background-size: 100% 100%;
				}

				.address {
					color: white;
					font-weight: 600;
					// margin-left: 10px;
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
					vertical-align: top;
					margin-top: 3px;
					// border: 1px solid red;
				}
			}

			.distance {
				position: absolute;
				top: 83px;
				right: 40px;
			}

			.downIcon {
				background: url(../../static/downIcon.png) no-repeat;
				background-size: 100% 100%;
				width: 10px;
				height: 10px;
				position: absolute;
				top: 87px;
				right: 25px;
			}
		}

		.mapContent {
			width: 100%;
			height: 78%;
			// height: 300px;
			position: relative;
			background: rgb(247, 247, 247);
			overflow: scroll;

			.engineersList {
				width: 100%;
				padding-bottom: 10px;
				//   height: 90%;
				//   border: 1px solid red;
				//   overflow: auto;

				li {
					width: 90%;
					height: 100px;
					// border: 1px solid red;
					position: relative;
					background: white;
					border-radius: 20px;
					margin: 0 auto;
					list-style: none;
					margin-top: 10px;

					// .name{}
					// .scale{}
					// .evaluation{}
					p {
						// border: 1px solid red;
						width: 80%;
						height: 25px;
						line-height: 25px;
						position: absolute;
					}

					.engineerState {
						width: 60px;
						height: 20px;
						text-align: center;
						line-height: 20px;
						color: white;
						border-radius: 20px;
						bottom: 10px;
						left: 12px;
					}

					.name {
						top: 10px;
						left: 80px;
						font-weight: 600;
						font-size: 16px;
					}

					.scale {
						top: 35px;
						left: 80px;
					}

					.evaluation {
						top: 67px;
						left: 80px;
						color: #777;
					}

					.portrait {
						width: 60px;
						height: 60px;
						border-radius: 50%;
						border: 1px solid green;
						position: absolute;
						left: 10px;
						top: 20px;
					}

					.appointmentBtn {
						width: 80px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						color: white;
						background: rgb(95, 195, 109);
						border-radius: 10px;
						position: absolute;
						right: 10px;
						bottom: 5px;
					}
				}
			}

			.engineerInformation {
				width: 100%;
				height: 78%;
				background: rgba(0, 0, 0, 0.3);
				position: fixed;
				top: 15%;

				.i_content {
					background: rgb(242, 242, 242);
					width: 100%;
					height: 400px;
					position: absolute;
					bottom: -1px;

					.personInt {
						width: 90%;
						height: 100px;
						border: 3px solid rgb(36, 195, 115);
						border-radius: 20px;
						background: #fff;

						.head {
							width: 100px;
							height: 100px;
						}
					}

					.submit {
						width: 100%;
						height: 50px;
						background: #fff;
						position: absolute;
						bottom: 0;

						.submitOrderBtn {
							display: inline-block;
							width: 100px;
							height: 50px;
							line-height: 50px;
							text-align: center;
							color: #fff;
							background: rgb(97, 183, 84);
							position: absolute;
							right: 0;
						}
					}
				}
			}
		}

		.myselfContent {
			width: 100%;
			height: 83%;
			// border: 1px solid red;
			position: relative;
			overflow: auto;

			.information {
				position: absolute;
				top: 100px;
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
					color: white;
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
				top: 200px;
				border-radius: 10px;
				background: #fff;
				//     background-image: linear-gradient(
				//   to right,
				//   rgb(166, 241, 150),
				//   rgb(78, 131, 128)
				// );

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
