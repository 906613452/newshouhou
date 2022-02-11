<template>
	<div id="map"></div>
</template>
<script>
	import jquery from '../../static/js/jquery.js'
	export default {
		data() {
			return {
				latitude: 0,
				longitude: 0,
				latitudeLength: 85390,
				longitudeLength: 111000,
				earthRadius: 6378.137,
				scale: 16,
				getLocationStatus: false,
				
				oldMarkers: [],
				markers: [],
				mapChangeIndex: 0,
			}
		},
		mounted() {
			// this.getRange()
		},
		onLoad() {
			console.log('ahhah')
			uni.request({
			      url:'http://192.168.0.65:3000/search',
			      method:'GET',   //get、post、delete
			      // header:{'Content-Type':'application/x-www-form-urlencoded'},
				  // timeout:'2000',
			      success:res=>{
					  console.log(res)
					  console.log(this.oldMarkers)
					  this.oldMarkers = res.data
					  
					  this.getRange()
				  },
			      fail:()=>{console.log('gua')}
			    })
			// uni.request({
			//       url:'http://192.168.0.65:3000/search',
			//       header:{'Content-Type':'application/json;charset=utf8'},
			//       method:'get',   //get、post、delete
			//     }).then((result)=>{
			// 		console.log(result)
			//     })
		},
		methods: {
			
			//计算附近点位信息
			getRange() {
				console.log('yse')
				const that = this
				let lists = []
				for (let item = 0; item < that.oldMarkers.length; item++) {
					let isComputer = that.rangeComputer(32.031632,118.703335, that.oldMarkers[item].lat, that
						.oldMarkers[item].lng, 10)

					if (isComputer) {
						lists.push(that.oldMarkers[item])
						console.log(lists)
					}

				}
				that.markers = lists
			},
	
			rangeComputer(userLatitude, userLongitude, latitude, longitude, range = 4) {
				console.log('into')
				if (isNaN(range)) {
					return Error("错误的距离参数")
				}
				const radUserLatitude = this.rad(userLatitude)
				const radLatitude = this.rad(latitude)
				const x = this.rad(userLongitude) - this.rad(longitude)
				const y = radUserLatitude - radLatitude
				console.log(this.distanceComputer(x, y, radUserLatitude, radLatitude))
				console.log(range)
				if (this.distanceComputer(x, y, radUserLatitude, radLatitude) <= range) {
					return true
				} else {
					return false
				}

			},
			
			distanceComputer(x, y, userLatitude, latitude) {

				const radLength = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(y / 2), 2) + Math.cos(userLatitude) * Math.cos(
					latitude) * Math.pow(Math.sin(x / 2), 2)));
				console.log('原始值:',radLength)
				console.log('计算后的值:',radLength * this.earthRadius)
				return radLength * this.earthRadius
			},
			
			rad(d) {
				return d * Math.PI / 180.0;
			},
			
		}
	}
</script>

<style>
</style>
