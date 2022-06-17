<template>
	<view>
		goods_id={{goods.id}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods: {}
			};
		},
		onLoad() {

		},
		methods: {

		},
		created() {
			// 获取地址栏参数
			if (this.$route.query.goods_id) {
				this.goods.id = this.$route.query.goods_id
			} else {
				
			}
			uni.$back()
		}
	}
</script>

<style lang="scss">

</style>
