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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
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
			}
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
</style>
