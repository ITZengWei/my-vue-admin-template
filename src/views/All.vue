<template>
  <div class="body-content">
    <h1 class="text-dark text-center mt-4">当前路径为: {{ this.$route.fullPath }}</h1>
  </div>
</template>

<script>
	export default {
		name: "All",
    mounted() {
	    console.log(this.$route)
    }
	}
</script>

<style scoped>

</style>