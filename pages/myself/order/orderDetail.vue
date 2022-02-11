<template>
	<div id="orderDetail">
		<div class="title">
			<span @click="back" class="back"></span>
			<span class="word">订单详情</span>
		</div>
		<div class="content">
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
                <p v-if="this.orderDetail.stata==2" class="goToPayBtn" @click="goToPayBtn">去支付</p>
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
						detail:'到阿里中心修一台起重机，起重机无法启动'
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
        onLoad(params) {
			// var a =JSON.parse(decodeURIComponent(option.obj));
			console.log(params.companyName, 'option')
			this.orderDetail = params
		},
		methods: {
            goToPayBtn(){
                let url = '/pages/myself/order/paying'
				let param = {
					price: this.orderDetail.price
				}
				this.$navTo.togo(url, param,'pop-in')
            },
			showOrderDetail(item){
				console.log(item)
				this.alertStatus = true
				this.orderDetail = item

				let url = '/pages/myself/order/orderDetail'
				let param = {
					orderDetail: item
				}
				this.$navTo.togo(url, param,'pop-in')

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
	#orderDetail {
		width: 100%;
		height: 100%;
		background: #f1f1f1;
		position: absolute;
		top: 0;
		z-index: 1;
        overflow: hidden;
		
		.content{
			width: 100%;
			height: 90%;
			overflow: auto;
			position: relative;
			background: #fff;
            p{
                // border: 1px solid red;
                width: 90%;
                // height: 30px;
                line-height: 30px;
                // text-indent: 20px;
                font-size: 16px;
                color: #666;
                margin-top: 20px;
                margin-left: 20px;
                span:nth-child(1){
                    
                }
                span:nth-child(2){
                    color: #444;
                    font-size: 17px;
                    width: 70%;
                    display: inline-block;
                    // border: 1px solid red;
                    vertical-align: top;
                }
            }
            .goToPayBtn{
                width: 200px;
                height: 40px;
                line-height: 40px;
                color: white;
                // background: #1f4d79;
                background: #fc7100;
                text-align: center;
                border-radius: 5px;
                border: 0;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 100px;
                margin: 0;
                font-weight: 600;
            }
		}
		
	}
</style>
