<template>
  <div id="placeOrder">
    <div class="title">
      <span @click="back" class="back"></span>
      <span class="word">生成订单</span>
    </div>
    <div class="content">
      <div class="addressChoose" @click="addressChoose">
        <p>
          <span>{{orderAddress.name}}</span>
          <span>{{orderAddress.phone}}</span>
        </p>
        <p>
          {{orderAddress.location+orderAddress.detailAddress}}
        </p>
      </div>
      <div class="information">
        <p>
          <span>备注：</span>
          <input type="text" v-model="orderRemarks" placeholder="请输入备注" />
        </p>
       
      </div>

      <div class="bottom">
        <div @click="confirmNow" class="confirmNow">立即下单</div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../../store/index.js'
export default {
  data() {
    return {
      orderRemarks:'',
      orderAddress: {
        "name": "",
        "phone": "",
        "detailAddress": "",
        "location": ""
      },
      alertStatus: false,
      user: {
        name: "admin",
        phone: "15312411295",
        location: "周到家园绿洲元停车场",
        detailAddress: "4号楼1单元1504",
      },
      payTypeArr: [
        {
          name: "admin",
          phone: "15312411295",
          location: "周到家园绿洲元停车场",
          detailAddress: "4号楼1单元1504",
          checked: "true",
        },
        {
          name: "王菲",
          phone: "15312411295",
          location: "周到家园绿洲元停车场",
          detailAddress: "4号楼1单元1504",
        },
        {
          name: "李云迪",
          phone: "15312411295",
          location: "周到家园绿洲元停车场",
          detailAddress: "4号楼1单元1504",
        },
      ],
      addressState: 0,
      addressId: "",
      chooseAddressData: 0
    };
  },
  onLoad(params) {
    console.log(params);
    uni.getStorage({
				key: "user",
				success: (res) => {
					console.log(res);
          this.getAddressList(res.data.user)
				},
			});
  },
  onShow() {
    console.log(store.state.orderAddress)
    this.orderAddress = store.state.orderAddress
  },
  methods: {
    getAddressList(user) {
      var data = {
        "user": user
      }
      uni.request({
        url: 'http://192.168.0.65:3000/address/searchAddress',
        method: 'POST',   //get、post、delete
        data: data,
        success: res => {
          console.log(res)
          this.addressList = res.data
          res.data.forEach((item, index) => {
            if (item.checked == 1) {
              this.orderAddress = item
            }
          })
        },
        fail: () => { console.log('调用失败') }
      })
    },
    addressChoose() {
      uni.navigateTo({
        url: '/pages/myself/setting/address/addressManagement?status=1'
      });
    },
    radioChange(e) {
      console.log(e.target.value);
      this.payType = e.target.value;
    },
    addressSetting() { },
    back() {
      uni.navigateBack();
    },
    confirmNow() {
      uni.navigateTo({
        url: '/pages/index/index'
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
          // this.lng = res.longitude;
          // this.lat = res.latitude;
          this.user.location = res.name;

          // this.myself = {
          //     // id: 1,
          //     latitude: this.lat,
          //     longitude: this.lng,
          //     name: this.address,
          //     width: 100,
          //     height: 140,
          //     title: this.address,
          //     iconPath: "../../static/myself_icon.png",
          // };
          // this.markers = [];
          // this.markers.push(this.myself);

          // setTimeout(()=>{
          // this.getLocByLngLat();
          // },1000)
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#placeOrder {
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
    .addressChoose {
      width: 100%;
      height: 100px;
      // border: 3px solid rgb(97, 184, 79);
      background: url(../../../static/addressBorder.png) no-repeat;
      background-size: 100% 100%;
      // margin: 0 auto;
      margin-top: 20px;
      overflow: hidden;
      p{
        margin-left: 20px;
        margin-top: 10px;
        
      }
      p:nth-child(1) {
         margin-top: 20px;
         span:nth-child(2) {
          margin-left: 20px;
        }
      }
    }
    .information {
      p {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fff;
        text-indent: 10px;
        position: relative;
        i {
          width: 20px;
          height: 20px;
          display: inline-block;
          position: absolute;
          top: 10px;
        }
        span {
          position: absolute;

        }
        input {
          // border-bottom: 1px solid #999;
          height: 40px;
          width: 80%;
          position: absolute;
          right: 0;
        }
        .detailAddress {
          border: 0;
        }
      }
      p:nth-child(1) {
        margin-top: 10px;
        i {
          background: url(../../../static/address_icon/head.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      p:nth-child(2) {
        i {
          background: url(../../../static/address_icon/phone.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      p:nth-child(3) {
        i {
          background: url(../../../static/address_icon/location.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      p:nth-child(4) {
        i {
          background: url(../../../static/address_icon/address.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .chooseType {
      position: absolute;
      // left: 50px;
      top: 0px;
      width: 100%;
      .uni-label-pointer {
        width: 100%;
        height: 80px;
        // line-height: 50px;
        display: inline-block;
        background: #fff;
        margin-top: 10px;
        position: relative;
        uni-radio {
          position: absolute;
          left: 20px;
          top: 30px;
        }
        .name {
          font-size: 16px;
          font-weight: 600;
          position: absolute;
          left: 60px;
          top: 15px;
          .phone {
            margin-left: 20px;
          }
        }
        .address {
          position: absolute;
          left: 60px;
          top: 45px;
        }
        .edit {
          position: absolute;
          right: 15px;
          top: 35px;
          width: 20px;
          height: 20px;
          background: url(../../../static/edit.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      height: 50px;
      background: rgb(251, 251, 251);
      line-height: 50px;
      // color: white;
      font-size: 16px;
      .confirmNow {
        position: absolute;
        bottom: 0;
        right: 0;
        text-align: center;
        width: 100px;
        height: 50px;
        background: rgb(97, 184, 79);
        line-height: 50px;
        color: white;
        font-size: 16px;
      }
    }
  }
}
</style>
