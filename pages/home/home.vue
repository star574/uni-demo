<template>
	<view>
		<!-- 轮播图 -->
		<!--  小点点 自动播放 间隔3s 单张耗时1s 反复滚动 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
				<!-- 点击跳转到商品详情 -->
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav">
			<view v-for="(item,index) in navList" :key="index" class="nav-item" @click="navClickHandler(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>

		<!-- 楼层标题 -->
		<view class="floor">
			<view v-for="(item,index) in floorList" :key="index" class="floor-item">
				<!-- 标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<!-- 大图 -->
					<navigator class="floor-left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="'width:'+item.product_list[0].image_width+'rpx'" mode="widthFix"></image>
					</navigator>
					<!-- 小图 -->
					<view class="floor-right-img-box">
						<navigator class="floor-right-img-box-item" v-for="(product,i) in item.product_list" :key="i"
							:url="product.url">
							<image :src="product.image_src" v-if="i!==0" :style="'width:'+product.image_width+'rpx'"
								mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			// 轮播图
			this.getSwiperList()
			// Nav
			this.getNavList()
			// 楼层数据
			this.getFloorList()
		},
		methods: {
			// 获取轮播图
			async getSwiperList() {
				// 解构 别名
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg("轮播图加载失败")
				this.swiperList = res.message
			},
			// 获取图标
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg("导航数据加载失败")
				this.navList = res.message
			},
			// Nav点击事件
			navClickHandler(item) {
				if (item.name === "分类") {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg("楼层数据加载失败")
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
		},
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 15rpx 0;

		.nav-item {
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	.floor {
		.floor-item {
			.floor-title {
				width: 100vw;
				height: 60rpx;
			}

			.floor-img-box {
				width: 100%;
				display: flex;
				padding-left: 10rpx;

				.floor-left-img-box {
					height: 100%;
					flex: 1
				}

				.floor-right-img-box {
					height: 100%;
					flex: 2;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					padding-right: 20rpx;
				}
			}
		}

	}
</style>
