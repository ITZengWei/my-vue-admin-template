<template>
  <el-header class="header bg-white d-flex a-center j-sb" >

    <!-- 左侧 区域 -->
    <div class="header-left" >
      <el-button
        type="primary"
        plain
        :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="handleToggle"
      ></el-button>
      <!--<el-input v-model="input" placeholder="请输入内容"></el-input>-->
    </div>

    <div class="header-right"></div>

  </el-header>
</template>

<script>
	export default {
		name: "container-header",
		props: {
			handleToggle: {
				type: Function,
				isRequired: true
			},
			isCollapse: {
				type: Boolean,
				isRequired: true
			},
		},
	}
</script>