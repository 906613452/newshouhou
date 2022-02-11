<template>
	<div id="addressManagement">
		<div class="title">
			<span @click="back" class="back"></span>
			<span class="word">地址管理</span>
		</div>
		<div class="content">
			<div class="chooseType">
				<div @click="paramsStatus=='1'?backToOrder(item):nothing" class="outBox"
					v-for="(item, index) in addressList" :key="index">
					<image v-if="item.checked==1" class='addressIcon'
						src="../../../../static/address_icon/defaultPoint.png" alt="" />
					<div v-else class='addressIcon'>{{item.name.slice(0,1)}}</div>
					<p class="name">
						<span>{{item.name}} </span>
						<span class="phone">{{item.phone}} </span>
					</p>
					<p class="address">
						<span>{{item.location}} </span>
						<span>{{item.detailAddress}} </span>
					</p>
					<span v-show="paramsStatus=='1'" class="edit" @click.stop="editAddress(item)"></span>
				</div>
			</div>
			<div @click="addAddress" class="addAddress">添加地址</div>
		</div>

	</div>
</template>
<script>
	import store from '../../../../store/index.js'

	export default {
		data() {
			return {
				alertStatus: false,
				addressList: [
					// {id:'1',connector:'admin',connectorPhone:'15312411295', location:'周到家园绿洲元停车场', detailAddress:'4号楼1单元1504', checked: '0'},
					// {id:'2',connector:'王菲',connectorPhone:'15312411295', location:'周到家园绿洲元停车场', detailAddress:'4号楼1单元1504'  , checked: '0'},
					// {id:'3',connector:'李云迪',connectorPhone:'15312411295', location:'周到家园绿洲元停车场', detailAddress:'4号楼1单元1504', checked: '1'},
				],
				//   addressId: '',
				user: '',
				paramsStatus: '0'
			}
		},
		onLoad(params) {
			console.log(params)
			this.paramsStatus = params.status
			// this.alertStatus = false
			uni.getStorage({
				key: "user",
				success: (res) => {

					console.log(res);
					this.user = res.data.user
					this.getAddressList()
				},
				fail: (res) => {
					console.log(res)
				}
			});
		},
		methods: {
			getAddressList() {
				var data = {
					"user": this.user
				}
				uni.request({
					url: 'http://192.168.0.65:3000/address/searchAddress',
					method: 'POST', //get、post、delete
					data: data,
					success: res => {
						console.log(res)
						this.addressList = res.data
					},
					fail: () => {
						console.log('调用失败')
					}
				})
			},
			backToOrder(item) {
				console.log(item)
      			store.dispatch('setOrderAddress', item)


				// var pages = getCurrentPages();
				// this.pages = pages
				// var currPage = pages[pages.length - 1]; //当前页面
				// var prevPage = pages[pages.length - 2]; //上一个页面

				// //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
				// console.log(prevPage)
				// prevPage.$vm.chooseAddressData = '1'
				uni.navigateBack({
					delta: 1
				})
			},
			nothing() {

			},

			// changeAddress(id, checked) {
			//   var data = {
			//     "id": id,
			//     "checked": checked
			//   }
			//   uni.request({
			//     url: 'http://192.168.0.65:3000/chooseAddress',
			//     method: 'POST',   //get、post、delete
			//     data: data,
			//     success: res => {
			//       console.log(res)
			//       //   uni.showToast({
			//       //       title: "修改成功",
			//       //       icon: "none",
			//       //     });
			//       //   this.addressList = res.data
			//       //   this.addressList.forEach(item=>{
			//       //       if(item.checked === 1){
			//       //           this.addressId = item.id
			//       //       }
			//       //   })
			//     },
			//     fail: () => { console.log('调用失败') }
			//   })
			// },
			addressSetting() {

			},
			back() {
				uni.navigateBack()
			},
			addAddress() {
				let url = '/pages/myself/setting/address/addressAdd'
				// let params = {
				//     // 0为新增，1为编辑
				//     state:0
				// }
				this.$navTo.togo(url, {}, 'pop-in')
			},
			editAddress(item) {
				console.log(item)
				// uni.navigateTo({
				// 	url: '/pages/myself/setting/address/addressAdd'
				// });
				let url = '/pages/myself/setting/address/addressAdd'
				let params = {
					// 0为新增，1为编辑
					state: 1,
					data: JSON.stringify(item)
				}
				this.$navTo.togo(url, params, 'pop-in')
			}
		},
		onBackPress(options) {
			uni.redirectTo('../setting')
		}
	}
</script>
<style lang="scss" scoped>
	#addressManagement {
		width: 100%;
		height: 100%;
		background: #f1f1f1;
		position: absolute;
		top: 0;
		z-index: 1;

		.content {
			width: 100%;
			height: 90%;
			overflow: auto;
			position: relative;

			.chooseType {
				position: absolute;
				// left: 50px;
				top: 0px;
				width: 100%;

				.outBox {
					width: 100%;
					height: 80px;
					// line-height: 50px;
					display: inline-block;
					background: #fff;
					margin-top: 10px;
					position: relative;

					.addressIcon {
						position: absolute;
						width: 40px;
						height: 40px;
						left: 18px;
						// top: 31px;
						top: 50%;
						transform: translateY(-50%);
						background: #e8ffea;
						font-size: 18px;
						color: #0ca114;
						border-radius: 50%;
						text-align: center;
						line-height: 40px;
						font-weight: 600;
					}

					.name {
						font-size: 16px;
						font-weight: 600;
						position: absolute;
						left: 80px;
						top: 15px;

						.phone {
							margin-left: 20px;
						}
					}

					.address {
						position: absolute;
						left: 80px;
						top: 45px;
					}

					.edit {
						position: absolute;
						right: 15px;
						top: 35px;
						width: 20px;
						height: 20px;
						background: url(../../../../static/edit.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}

			.addAddress {
				position: absolute;
				bottom: 0;
				text-align: center;
				width: 100%;
				height: 50px;
				background: rgb(97, 184, 79);
				line-height: 50px;
				color: white;
				font-size: 16px;
			}
		}
	}
</style>
