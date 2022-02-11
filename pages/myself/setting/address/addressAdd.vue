<template>
  <div id="addressManagement">
    <div class="title">
      <span @click="back" class="back"></span>
      <span class="word">{{this.addressState==0?'新建地址':'编辑地址'}}</span>
    </div>
    <div class="content">
      <p>
        <!-- <i></i> -->
        <span class="label">联系人</span>
        <input type="text" v-model="user.name" placeholder="姓名">
      </p>
      <p>
        <span class="label">手机号</span>
        <input type="text" v-model="user.phone" placeholder="联系人手机号码">
      </p>
      <p @tap="findway">
        <span class="label">地址</span>
        <input type="text" readonly v-model="user.location" placeholder="选择地址">
        <!-- <p></p> -->
      <p>
        <span class="label">门牌号</span>
        <input class="detailAddress" type="text" v-model="user.detailAddress"
          placeholder="填写详细地址，例：1层101室">
      </p>
      <p class="defaultSet">
        <span class="word">是否设为默认地址</span>
        <switch color='#0ca114' :checked='user.checked==1' @change="defaultChange" />
      </p>

      <div @click="saveAddress" class="saveAddress">保存</div>
    </div>

  </div>
</template>
<script>
// import store from '../../../store/index.js'
import store from '../../../../store/index'
export default {
  data() {
    return {
      alertStatus: false,
      user: {
        id: null,
        name: '',
        phone: '',
        location: '',
        detailAddress: '',
        lng: '',
        lat: '',
        checked: 0
      },
      addressState: 0,
      addressId: ''
    }
  },
  onLoad(params) {
    console.log(params)
    if (JSON.stringify(params) != '{}') {
      this.addressState = 1
      let data = JSON.parse(params.data)
      console.log(data)
      //   this.addressId = data.id
      this.user = data

    } else {
      //   this.addressState = 0
      this.user.id = null
      this.user.name = ''
      this.user.phone = ''
      this.user.location = ''
      this.user.detailAddress = ''
      this.user.lng = ''
      this.user.lat = ''
      this.user.checked = 0
    }

    // if (params.state == 0) {

    // } else {


    //     // this.user.connector = data.connector
    //     // this.user.connectorPhone = data.connectorPhone
    //     // this.user.location = data.location
    //     // this.user.detailAddress = data.detailAddress

    //     console.log()
    // }
  },
  methods: {
    defaultChange(e) {
      console.log(e.target.value)
      this.user.checked = e.target.value == false ? 0 : 1
    },
    addressSetting() {

    },
    back() {
      uni.navigateBack()
    },
    saveAddress() {
      console.log(this.user)
      if (!this.user.id) {
        let data = {
          "name": this.user.name,
          "phone": this.user.phone,
          "detailAddress": this.user.detailAddress,
          "location": this.user.location,
          "lat": this.user.lat,
          "lng": this.user.lng,
          "checked": this.user.checked,
          "user": store.state.user
        }
        console.log(data)
        uni.request({
          url: 'http://192.168.0.65:3000/address/addAddress',
          method: 'POST',   //get、post、delete
          data: data,
          success: res => {
            console.log(res)
            uni.showToast({
              title: "新增成功！",
              icon: "success",
            });
            setTimeout(()=>{
                uni.redirectTo({
                url: "/pages/myself/setting/address/addressManagement",
                animationType: 'none'
            });
            })
            
          },
          fail: () => { console.log('调用失败') }
        })
      } else {
        let data = {
          "id": this.user.id,
          "name": this.user.name,
          "phone": this.user.phone,
          "detailAddress": this.user.detailAddress,
          "location": this.user.location,
          "lat": this.user.lat,
          "lng": this.user.lng,
          "checked": this.user.checked,
          "user": store.state.user
        }
        uni.request({
          url: 'http://192.168.0.65:3000/address/changeAddress',
          method: 'POST',   //get、post、delete
          data: data,
          success: res => {
            console.log(res)
            uni.showToast({
              title: "修改成功！",
              icon: "success",
            });
            uni.redirectTo({
              url: "/pages/myself/setting/address/addressManagement",
              animationType: 'none'
            });
          },
          fail: () => { console.log('调用失败') }
        })
      }

      // uni.navigateBack()



    },
    findway() {
      uni.chooseLocation({
        success: (res) => {
          console.log(res)
          // console.log('位置名称：' + res.name);
          // console.log('详细地址：' + res.address);
          // console.log('纬度：' + res.latitude);
          // console.log('经度：' + res.longitude);
          // this.lng = res.longitude;
          // this.lat = res.latitude;
          this.user.location = res.name;
          this.user.lng = res.longitude;
          this.user.lat = res.latitude;

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
    .saveAddress {
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
    p {
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: #fff;
      text-indent: 10px;
      position: relative;
      border-top: 1px solid #dfdfdf;
      .label {
        float: left;
        // display: inline-block;
        width: 20%;
        height: 100%;
        font-size: 16px;
        font-weight: 600;
        text-indent: 20px;
        // border: 1px solid red;
      }

      input {
        float: left;
        height: 60px;
        width: 80%;
        position: absolute;
        right: 0;
      }
      .detailAddress {
        border: 0;
      }
    }
    p:nth-child(1) {
      //   margin-top: 10px;
      border: 0;
      i {
        background: url(../../../../static/address_icon/head.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .defaultSet {
      .word {
        color: #918f8f;
        font-size: 16px;
        margin-left: 10px;
      }
      switch {
        transform: scale(0.7);
        position: absolute;
        right: 10px;
      }
    }
    // p:nth-child(2) {
    //   i {
    //     background: url(../../../../static/address_icon/phone.png) no-repeat;
    //     background-size: 100% 100%;
    //   }
    // }
    // p:nth-child(3) {
    //   i {
    //     background: url(../../../../static/address_icon/location.png) no-repeat;
    //     background-size: 100% 100%;
    //   }
    // }
    // p:nth-child(4) {
    //   i {
    //     background: url(../../../../static/address_icon/address.png) no-repeat;
    //     background-size: 100% 100%;
    //   }
    // }
  }
}
</style>
