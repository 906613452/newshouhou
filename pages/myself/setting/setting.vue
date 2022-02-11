<template>
	<div id="setting">
		<div class="title">
			<span @click="back" class="back"></span>
			<span class="word">设置</span>
		</div>
		<div class="content">
			<p>
				<span class="word">账号与安全</span>
				<span class="icon"></span>
			</p>
			<p @click="addressSetting">
				<span class="word">地址管理</span>
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
			<div @click="loginOut" class="loginOut">退出登录</div>
		</div>
        <div class="alertBg" v-if="alertStatus">
			<div class="outBox">
				<div class="outMark"> 
					<image src="../../../static/sighMark.png" mode=""></image>
				</div>
                <p class="word">确定退出吗？</p>
                <p class="button">
                    <span @click="cancel">取消</span>
                    <span @click="confirm_loginOut">确定</span>
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
				alertStatus:false
			}
		},
		// onLoad(){
		// 	this.alertStatus = false
		// }
		methods: {
			addressSetting(){
				uni.redirectTo({
						url: '/pages/myself/setting/address/addressManagement'
					});
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
	#setting {
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
			p{
				width: 100%;
				height: 50px;
				background: white;
				line-height: 50px;
				border-bottom: 1px solid #f1f1f1;
				position: relative;
				font-size: 16px;
				margin-top: 10px;
				color: #444;
				span:nth-child(1){
					position: absolute;
					left: 20px;
				}
				span:nth-child(2){
					position: absolute;
					right: 30px;
					top: 17px;
					width: 16px;
					height: 16px;
					display: inline-block;
					background: url(../../../static/turn_right.png)no-repeat;
					background-size: 100% 100%;
					// border: 1px solid red;
				}
			}
			.loginOut{
				position: absolute;
				bottom: 0;
				text-align: center;
				width: 100%;
				height: 50px;
				background: white;
				line-height: 50px;
				color: #ee9802;
				font-size: 16px;
			}
		}
		.alertBg{
			width:100%;
			height: 100%;
			background-color: rgba(0,0,0,0.3);
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
