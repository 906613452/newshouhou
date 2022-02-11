<template>
	<div id="paying">
		<div class="title">
			<span @click="back" class="back"></span>
			<span class="word">支付</span>
		</div>
		<div class="content">
            <p class="littleWord word1">支付金额</p>
            <p class="payWord">本次支付金额：
                <span class="price">{{price}}  </span>
                <span class="yuan">元</span>
            </p>

            <p class="littleWord word2">请选择支付方式</p>
			<radio-group class="chooseType" @change="radioChange">
                <label class="radio" v-for="(item, index) in payTypeArr" :key="index">
                   <span class="radioLabel">{{item.name}} </span>
                   <radio :value="item.name" :checked="item.checked" />
                </label>
            </radio-group>
            <p class="confirmPay" @click="confirmPay">确认支付</p>
		</div>
	</div> 
</template>
<script>
	import store from '../../../store/index.js'
	export default {
		data() {
			return {
				price:'',
                payType:'支付宝',
                payTypeArr:[
                    {name:'支付宝',checked: 'true'},
                    {name:'微信'}
                ]
			}
		},
		// onLoad(){
		// 	this.alertStatus = false
		// }
        
        onLoad(params) {
			// var a =JSON.parse(decodeURIComponent(option.obj));
			console.log(params, 'option')
			this.price = params.price
		},
		methods: {
            radioChange(e){
                console.log(e.target.value)
                this.payType = e.target.value
            },
			back() {
				uni.navigateBack()
			},
            confirmPay(){}
		}
	}
</script>
<style lang="scss" scoped>
	#paying {
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
			// background: #fff;
            .littleWord{
                color: #666;
                font-size: 12px;
                text-indent: 20px;
                position: absolute;
            }
            .word1{
                top: 40px;
            }
            .word2{
                top: 130px;
            }
            .payWord{
                position: absolute;
                top: 60px;
                // left: 50%;
                // transform: translateX(-50%);
                width: 100%;
                height: 50px;
                line-height: 50px;
                // text-align: center;
                text-indent: 20px;
			    background: #fff;

                .price{
                    color: rgb(243, 140, 22);
                    font-size: 20px;
                }
                .yuan{
                    margin-left: 5px;
                }
            }
            .chooseType{
                position: absolute;
                // left: 50px;
                top: 140px;
                width: 100%;
                .uni-label-pointer{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    display: inline-block;
			        background: #fff;
                    margin-top: 10px;
                    .radioLabel{
                        margin-left: 20px;
                    }
                    uni-radio{
                        position: absolute;
                        right: 20px;
                    }
                    // text-indent: 20px;
                }
            }
            .confirmPay{
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
                top: 340px;
                margin: 0;
                font-weight: 600;
            }
		}
		
	}
</style>
