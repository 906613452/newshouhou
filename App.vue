<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// @import "uview-ui/index.scss";
	/*每个页面公共css */
	uni-page-body, uni-page-refresh{
		height: 100%;
	}
	*{
		padding: 0;
		margin: 0;
	}
	body{
		height: 100%;
		overflow: hidden;
		
		.title {
			width: 100%;
			height: 10%;
			// line-height: 8;
			display: flex;
			// border: 1px solid red;
			position: relative;
			// background: #fff;
			border-bottom: 1px solid #f0f0f0;
			background: rgb(97, 184, 79);
			color: white;

			.back {
				width: 25px;
				height: 25px;
				// border: 1px solid red;
				position: absolute;
				background: url(./static/back.png)no-repeat;
				background-size: 100% 100%;
				top: 45px;
				left: 20px;
			}

			.word {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				font-size: 18px;
				font-weight: 500;
				top: 45px;
				display: inline-block;
			}
		}
	}
	.uni-radio-input-checked{
        background: rgb(97, 176, 68) !important;
        border-color: rgb(97, 176, 68) !important;
    }
</style>
