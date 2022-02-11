<template>
	<div id="order">
		<div class="title">
			<span @click="back" class="back"></span>
			<span class="word">订单</span>
		</div>
		<div class="content">
			<ul>
				<li @click="showOrderDetail(item)" v-for="(item,index) in orderList" :key="index">
					<p>{{item.companyName}}</p>
					<p class="state">
						<span v-if="item.stata==0" >未开始 ></span>
						<span v-if="item.stata==1" style="color:green">已完成 ></span>
						<span v-if="item.stata==2" style="color:rgb(255,128,0)">待支付 ></span>
						
						<!-- {{item.stata==0?'未开始':item.stata==1?'已完成':item.stata==2?'待支付':''}} -->
					</p>
					<p><i></i>{{item.startTime}}</p>
					<p><i></i>{{item.endTime}}</p>
				</li>
			</ul>
			<!-- <p>
				<span class="word">账号与安全</span>
				<span class="icon"></span>
			</p>
			<p>
				<span class="word">法律条款与平台规则</span>
				<span class="icon"></span>
			</p>
			<p>
				<span class="word">关于售后宝</span>
				<span class="icon"></span>
			</p>
			<div @click="loginOut" class="loginOut">退出登录</div> -->
		</div>
        <div class="alertBg" v-if="alertStatus">
			<div class="title">
				<span @click="alert_back" class="back"></span>
				<span class="word">订单详情</span>
			</div>
			<div>
				<p>
					<span>订单状态：</span>
					<span>{{this.orderDetail.stata==0?'未开始':this.orderDetail.stata==1?'已完成':this.orderDetail.stata==2?'待支付':''}}</span>
				</p>
				<p>	
					<span>公司名称：</span>
					<span>{{this.orderDetail.companyName}}</span>
				</p>
				<p>	
					<span>公司地址：</span>
					<span>{{this.orderDetail.address}}</span>
				</p>
				<p>	
					<span>联系电话：</span>
					<span>{{this.orderDetail.phone}}</span>
				</p>
				<p>	
					<span>开始时间：</span>
					<span>{{this.orderDetail.startTime}}</span>
				</p>
				<p>	
					<span>结束时间：</span>
					<span>{{this.orderDetail.endTime}}</span>
				</p>
				<p>	
					<span>{{this.orderDetail.stata==0?'预估价格：':'结算价格：'}}</span>
					<span>{{this.orderDetail.price}}</span>
				</p>
				<p>	
					<span>订单详情：</span>
					<span>{{this.orderDetail.detail}}</span>
				</p>
			</div>

		</div>

	</div> 
</template>
<script>
	import store from '../../../store/index.js'
	export default {
		data() {
			return {
				alertStatus:false,
				orderList:[
					{
						companyName:'南京市云天创智科技有限公司',
						// 未开始,进行中,待支付,已完成
						stata:'0',
						startTime:'2021-12-14 12:23:12',
						endTime:'',
						address:'南京市建邺区白龙江街道1028号',
						phone:'13845625655',
						price:'720',
						detail:'到阿里中心修一台起重机，起重机无法启动,需要人带很多榜首，来扎场子，没有一个团的人是打不过的，需要火力支持，掩护后方'
					},
					{
						companyName:'南京市中冠发电有限公司',
						// 未开始,进行中,待支付,已完成
						stata:'1',
						startTime:'2021-12-15 11:23:12',
						endTime:'2021-12-15 18:23:12',
						address:'南京市建邺区白龙江街道1028号',
						phone:'13845625655',
						price:'720',
						detail:'轴承坏了'
					},
					{
						companyName:'南京市仿效团科技责任有限公司',
						// 未开始,进行中,待支付,已完成
						stata:'2',
						startTime:'2021-12-16 09:23:12',
						endTime:'2021-12-16 11:23:12',
						address:'南京市建邺区白龙江街道1028号',
						phone:'13845625655',
						price:'720',
						detail:'发电机坏了，需要换一个轴承，轴承自带'
					}
				],
				orderDetail:{}
			}
		},
		// onLoad(){
		// 	this.alertStatus = false
		// }
		methods: {
			showOrderDetail(item){
				// console.log(item)
				// this.alertStatus = true
				this.orderDetail = item

				let url = '/pages/myself/order/orderDetail'
				let params = item
				this.$navTo.togo(url, params,'pop-in')

			},
			alert_back(){
				this.alertStatus = false
			},
			back() {
				uni.navigateBack()
			},
			cancel(){
				this.alertStatus = false
			},
			confirm_loginOut(){
				this.alertStatus = false
				uni.navigateTo({
						url: '/pages/login/login',
						animationType:'none'
					});
					
				store.dispatch('user_state_edit_action',0)
				store.dispatch('index_state_edit_action',0)
			},
			loginOut(){
				this.alertStatus = true
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	#order {
		width: 100%;
		height: 100%;
		background: #f1f1f1;
		position: absolute;
		top: 0;
		z-index: 1;

		
		.content{
			width: 100%;
			height: 90%;
			overflow: auto;
			position: relative;
			ul{
				li{
					background: #fff;
					list-style: none;
					margin-top: 5px;
					color: #666;
					width: 100%;
					height: 110px;
					box-shadow: 0 0 1px rgb(209, 205, 205);
					position: relative;
					overflow: hidden;
					p{
						height: 25px;
						line-height: 25px;
						text-indent: 30px;
						i{
							width: 8px;
							height: 8px;
							border-radius: 25px;
							display: inline-block;
							margin-right: 10px;
						}
					}
					.state{
						position: absolute;
						right: 40px;
						top: 10px;
						font-size: 15px;
						color: 333;
					}
					p:nth-child(1){
						color: #000000;
						margin-top: 10px;
						// font-size: 16px;
					}
					p:nth-child(3){
						margin-top: 10px;
						i{
							background: rgb(4, 146, 4);
						}
					}
					p:nth-child(4){
						i{
							background: rgb(255, 166, 0);
						}
					}
				}
			}
		}
		.alertBg{
			width:100%;
			height: 100%;
			background-color: #fff;
			position: absolute;
			top: 0;
			left: 0;
			.outBox{
				background: #ffffff;
				position: absolute;
				width: 280px;
				height: 150px;
				top: 300px;
				left: 50%;
				transform: translateX(-50%);
				border-radius: 10px;
				.outMark{
					width: 50px;
					height: 50px;
					background: #f4f4f4;
					border-radius: 50%;
					position: absolute;
					display: flex;
					justify-content: center;
					align-items: center;
					left: 50%;
					transform: translateX(-50%);
					top: 10px;
					image{
						width: 30px;
						height: 30px;
						// display: block;
						
						// left: 50%;
						// transform: translateX(-50%);
						// top: ;
					}
				}
				
				.word{
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: 70px;
				}
				.button{
					width: 100%;
					height: 50px;
					display: flex;
					line-height: 50px;
					position: absolute;
					bottom: 0;
					span{
						flex: 1;
						text-align: center;
						border-top: 1px solid #eee;
						font-size: 16px;
					}
					span:nth-child(1){
						color: #000000;
						border-right: 1px solid #eee;
					}
					span:nth-child(2){
						color: #dd6605;
					}
				}
			}
		}
	}
</style>
