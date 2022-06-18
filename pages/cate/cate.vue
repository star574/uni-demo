<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧 -->
			<scroll-view scroll-y="true" :style="'height:' + windowHeight +'px'" class="left-scroll-view">
				<block v-for="(item, i) in cateList" :key="i">
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view scroll-y="true" :style="'height:' + windowHeight +'px'" class="right-scroll-view"
				:scroll-top="scrollTop">
				<block v-for="(item, i) in cateLevel2" :key="item.cat_name">
					<!-- 二级标题 -->
					<view class="right-scroll-view-title">
						- {{item.cat_name}} -
					</view>
					<!-- 三级图标 -->
					<view class="right-scroll-view-item">
						<!-- 跳转到商品列表 -->
						<navigator class="right-scroll-view-icon" v-for="(element, i) in item.children"
							:key="element.cat_id" :url="'/subpkg/goods_list/goods_list?cid='+element.cat_id">
							<image :src="element.cat_icon" mode="widthFix"></image>
							{{element.cat_name}}
						</navigator>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0,
				cateList: [],
				active: 0,
				// 二级分类列表
				cateLevel2: [],
				scrollTop: 0
			};
		},
		methods: {

			async getCateList() {
				// 发起请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 转存数据
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children

			},
			// 选中项改变的事件处理函数
			activeChanged(i) {
				this.active = i
				// 给二级分类赋值
				this.cateLevel2 = this.cateList[i].children
				// 值相同不会赋值 不会重置滚动条 所以需要赋不同的值
				if (this.scrollTop === 0) {
					this.scrollTop = 1
				} else {
					this.scrollTop = 0
				}
			},
		},
		onLoad() {
			// 获取屏幕高度（去除顶部和底部）
			const sysinfo = uni.getSystemInfoSync()
			this.windowHeight = sysinfo.windowHeight
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				line-height: 120rpx;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}

		}

		.right-scroll-view {
			background-color: #ffffff;

			.right-scroll-view-title {
				width: 100%;
				text-align: center;
				font-weight: bold;
				line-height: 120rpx;
			}

			.right-scroll-view-item {
				display: flex;
				flex-wrap: wrap;
				text-align: center;
				justify-content: flex-start;

				.right-scroll-view-icon {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 10rpx;

					image {
						width: 120rpx;
					}
				}
			}
		}

	}
</style>
