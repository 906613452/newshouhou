<template>
	<div id="myself"> 
		<p>
			<image src="../../static/user_icon.png"></image>
			<span>Hi,您还未登录</span>
		</p>
		<div class="navBottom">
			<p @click="homeBtn">
				<image src="../../static/home.png" mode=""></image>
				<span>主页</span>
			</p>
			<p >
				<image src="../../static/user_select.png" mode=""></image>
				<span>我的</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		methods:{
			homeBtn(){
				uni.navigateTo({
						url: '/pages/index/index',
						animationType:'none'
					});
			}
		}
	}
</script>

<style lang="scss">
	#myself{
		width: 100%;
		height: 100%;
		.navBottom {
			// position: absolute;
			bottom: 0;
			width: 100%;
			height: 55px;
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
