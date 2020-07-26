<template>
  <div id="app">
    <el-container style="height: 100vh;">
      <container-aside :isCollapse="isCollapse" />

      <el-container direction="vertical">
        <container-header :handleToggle="toggleCollapse" :isCollapse="isCollapse" />

        <container-body />

        <container-footer />
      </el-container>

    </el-container>
  </div>
</template>

<script>
	/* 引入布局组件 */
	import { ContainerHeader, ContainerBody, ContainerFooter, ContainerAside } from './components'

	export default {
		components: {
			ContainerHeader,
			ContainerAside,
			ContainerBody,
			ContainerFooter
		},
		data() {
			return {
				// 是否收缩，默认为 false
				isCollapse: false,
			}
		},
		methods: {
			// 切换收缩状态
			toggleCollapse() {
				this.isCollapse = !this.isCollapse
			}
		},
	}
</script>

<style lang="less">
</style>
