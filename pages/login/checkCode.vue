<template>
  <div id="checkCode">
    <div class="checkCode_title">
      <p @click="back" class="back"></p>
      <p class="word">请输入四位验证码</p>
      <p class="word sendWord">验证码已发送至&nbsp;&nbsp;&nbsp;{{phoneNumber}}</p>
    </div>
    <div class="phone">
      <div class="codeInput">
        <p class="fakeInput"></p>
        <p class="fakeInput"></p>
        <p class="fakeInput"></p>
        <p class="fakeInput"></p>
        <input class="realInput" type="number" pattern="[0-9]*" :focus="inputFocus"
          v-model="codeValue" maxlength="4" />
        <p class="coverWord">{{codeValue}}</p>
        <p class="countDownP" @click="getCode" v-if="countDown == 0">重新获取</p>
        <p class="countDownP" v-else><b>{{countDown}}s</b>后重新获取</p>
      </div>
    </div>

  </div>
</template>

<script>
import store from '../../store/index.js'
export default {

  data() {
    return {
      countDown: 0,
      phoneNumber: "",
      codeValue: "",
      inputValue2: "",
      inputValue3: "",
      inputValue4: "",
      inputFocus: true,
      userState: true,
    }
  },
  onLoad(option) {
    // var a =JSON.parse(decodeURIComponent(option.obj));
    console.log(option, 'option')
    this.phoneNumber = option.phoneNumber.trim()
  },
  mounted() {
    // this.$refs.focus2.focus()
    // this.focus1 = true
    this.countDown = 60
    var ss;
    if (this.countDown === 60) {
      ss = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown -= 1;
        }
      }, 1000)
    }
    if (this.countDown === 0) {
      clearInterval(ss)
    }
  },
  methods: {
    getCode() {
      this.countDown = 60
    },
    back() {
      uni.navigateBack()
    },
    signIn() {
      // this.userState = true
	  uni.setStorage({
          key: "user",
          data: {
            user: this.phoneNumber,
          },
          success: function () {
            console.log("存入本地成功");
          },
        });
      store.dispatch('setUser', this.phoneNumber)
		
      store.dispatch('user_state_edit_action', 1)
    //   store.dispatch('index_state_edit_action',0)
      // uni.navigateTo({
      // 	url: '/pages/index/index'
      // });
      let data = {
        user: this.phoneNumber
      }
      uni.request({
        url: 'http://192.168.0.65:3000/address/searchAddress',
        method: 'POST',   //get、post、delete
        data: data ? JSON.stringify(data) : "",
        // header:{'Content-Type':'application/x-www-form-urlencoded'},
        // timeout:'2000',
        success: res => {
          console.log(res)
          if (res.data.length > 0) {
            console.log('已有用户，可登录')
            uni.navigateTo({
              url: '/pages/index/index'
            });
          } else {
            console.log('注册新用户')
            this.addUser()
          }
        },
        fail: () => { console.log('调用失败') }
      })
    },
    addUser() {
      console.log('我要添加新用户了')
      //   uni.getStorage({
      //     key: 'user',
      //     success: (res) => {
      //       console.log(res);
      //       let d = res.data

      //     }
      //   });
      let data = {
        user: this.phoneNumber,
        password: "",
      }

      uni.request({
        url: 'http://192.168.0.65:3000/add',
        method: 'POST',   //get、post、delete
        data: data ? JSON.stringify(data) : "",
        // header:{'Content-Type':'application/x-www-form-urlencoded'},
        // timeout:'2000',
        success: res => {
          console.log(res)
		  uni.showToast({
            title:"创建成功！",
			icon: 'success'
          })
		  uni.navigateTo({
            url: '/pages/index/index'
          });
        },
        fail: () => { console.log('调用失败') }
      })


    },
  },
  watch: {
    codeValue(val) {
      if (val.length == 4) {
        this.inputFocus = false
        // 先校验验证码（未写）后执行此函数
        this.signIn()


      }
      if (val == '') {
        this.inputFocus = true
      }
      // 	if(val.length == 1){
      // 		this.focus1 = false
      // 		this.focus2 = true
      // 		this.focus3 = false
      // 		this.focus4 = false

    },
    countDown(val) {

    }

  }
}
</script>

<style lang="scss">
#checkCode {
  width: 100%;
  height: 720px;

  .checkCode_title {
    width: 100%;
    height: 250px;
    // background-image: linear-gradient(to right, rgb(255, 217, 198), rgb(251, 250, 248));
    background-image: linear-gradient(
      to left bottom,
      rgb(97, 184, 79),
      rgb(190, 218, 182),
      rgb(1, 100, 95)
    );
    .back {
      width: 25px;
      height: 25px;
      // border: 1px solid red;
      position: relative;
      background: url(../../static/back.png) no-repeat;
      background-size: 100% 100%;
      top: 60px;
      left: 20px;
    }

    .word {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-indent: 25px;
      font-weight: 600;
      position: absolute;
      top: 120px;
      font-size: 20px;
    }

    .sendWord {
      font-size: 14px;
      font-weight: 400;
      top: 150px;
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

    .codeInput {
      width: 100%;
      height: 80px;
      margin-top: 50px;

      .fakeInput {
        width: 60px;
        height: 60px;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        box-shadow: 0 0 5px #f0f0f0;
        float: left;
        margin-left: 14px;
      }

      .fakeInput:nth-child(1) {
        margin-left: 45px;
      }

      .realInput {
        caret-color: rgba(231, 142, 95, 0);
        position: absolute;
        width: 300px;
        height: 80px;
        // border: 1px solid green;
        left: 40px;
        top: 40px;
        font-size: 30px;
        letter-spacing: -17px;
        text-indent: -10px;
        overflow: hidden;
        opacity: 0;
        text-align: justify;
      }

      .coverWord {
        position: absolute;
        width: 300px;
        height: 80px;
        line-height: 80px;
        // border: 1px solid red;
        left: 40px;
        top: 40px;
        font-size: 30px;
        // letter-spacing: 60px;
        // text-indent: 25px;
        letter-spacing: 59px;
        text-indent: 27px;
        overflow: hidden;
        pointer-events: none;
      }
    }

    .countDownP {
      position: absolute;
      top: 155px;
      right: 30px;
    }
  }
}
</style>
