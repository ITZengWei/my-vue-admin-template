<template>
  <el-aside class="aside" style="height: 100vh; width: auto; background-color:#001529;">
    <div
      class="logo text-white d-flex a-center j-center font-lg"
      style="width: 100%; height: 60px; background-color:#333;"
    >
      LOGO
    </div>
    <!-- 搜索区域 -->

    <div
      v-if="!isCollapse"
      class="py-2 px-1"
      style="width: 200px; overflow: hidden;  height: 30px;"
    >

      <!-- 输入框 -->
      <!--<el-input-->
        <!--v-model.trim="searchMenuText"-->
        <!--placeholder="搜索菜单"-->
        <!--size="mini"-->
        <!--style="width: 80%; background-color:#001529; outline: none;"-->
      <!--/>-->
      <el-autocomplete
              class="inline-input"
              v-model.trim="searchMenuText"
              :fetch-suggestions="querySearch"
              placeholder="搜索菜单"
              size="mini"
              @select="handleSelect"
              style="width: 80%; background-color:#001529; outline: none;"
      ></el-autocomplete>



      <span class="text-white font ml" @click="handleSearch" style="cursor: pointer">查询</span>
    </div>


    <el-menu
      :default-active="this.$route.fullPath.slice(1)"
      :collapse="isCollapse"
      class="slideBar el-menu-vertical-demo "
      collapse-transition
      unique-opened
      router
      background-color="#001529"
      text-color="#ddd"
    >

      <!-- 如果是一级菜单 -->

      <template v-for="(nav, navIndex) in navList" >

        <!-- 如果是 一级菜单 -->
        <el-menu-item v-if="!hasChildren(nav)" :index="nav.pathname">
          <i :class="nav.icon"></i>{{ nav.label }}
        </el-menu-item>


         <!--二级菜单 -->
        <el-submenu
          v-else
          :key="nav.label"
          :index="'two-' + navIndex"
        >

          <template slot="title">
            <i class="el-icon-s-tools"></i>{{ nav.label }}
          </template>


          <template  v-for="(subNav, subNavIndex) in nav.children" >
            <!-- 判断是否有三级菜单 -->
            <el-menu-item v-if="!hasChildren(subNav)" :index="subNav.pathname">
              <i :class="subNav.icon"></i>{{ subNav.label }}
            </el-menu-item>

            <!--三级菜单 -->
            <el-submenu
              v-else
              :key="subNav.label"
              :index="'three-' + navIndex"
            >

              <template slot="title">
                <i class="el-icon-s-tools"></i>{{ subNav.label }}
              </template>

              <el-menu-item
                      v-for="(_subNav, _subNavIndex) in subNav.children"
                      :key="_subNav.pathname"
                      :index="_subNav.pathname"
              >
                <i :class="subNav.icon"></i>{{ _subNav.label }}
              </el-menu-item>

            </el-submenu>

          </template>

        </el-submenu>

      </template>

    </el-menu>
  </el-aside>
</template>

<script>
	const originNavList = [
		{ icon: 'el-icon-s-home', label: '首页', pathname: 'home' },
		{ icon: 'el-icon-s-custom', label: '人员监控', pathname: 'listen' },
		{
			icon: 'unordered-list', label: '超级管理员',
			children: [
				{ icon: 'user', label: '用户管理', pathname: 'user_audit' },
				{ icon: 'appstore', label: '分类管理', pathname: 'article_category' },
				{ icon: 'unordered-list', label: '相册管理', pathname: 'album_admin' },
				{ icon: 'unordered-list', label: '记录管理', pathname: 'record_admin' },
				{
					icon: 'unordered-list', label: '游戏管理', pathname: 'game_admin',
          children: [
	          { icon: 'user', label: '游戏添加', pathname: 'game_admin-add' },
	          { icon: 'appstore', label: '游戏删除', pathname: 'game_admin-remove' },
          ]
        },
			]
		},
		{
			icon: 'el-icon-s-grid', label: '分类管理',
			children: [
				{ icon: 'bars', label: '分类列表', pathname: 'category_list' },
				{ icon: 'trademark', label: '添加分类', pathname: 'add_category' },
			]
		},
		{
			icon: 'el-icon-reading', label: '文章管理',
			children: [
				{ icon: 'el-icon-s-order', label: '文章列表', pathname: 'article_list' },
				{ icon: 'el-icon-s-order', label: '我的文章', pathname: 'my_article' },
				{ icon: 'el-icon-s-order', label: '文章录入', pathname: 'add_article' }
			]
		},
		{ icon: 'el-icon-setting', label: '设置', pathname: 'setting' },
		{ icon: 'el-icon-place', label: '关于', pathname: 'about' },
	]


	export default {
		name: "container-aside",
		data() {
			return {
				// 搜索菜单文本
				searchMenuText: '',
				navList: originNavList,
        // 扁平化的路由对象
        flatNavText: {},
				restaurants: [],
			}
		},
		props: {
			isCollapse: {
				type: Boolean,
				isRequired: true
			},
		},
		methods: {
			hasChildren(target) {
        return target.children && target.children.length
			},
			handleSearch() {

        const result = this.flatNav.find(v => v.label === this.searchMenuText)
        if (!result) {
					return this.$message.info(`没有找到菜单: ${ this.searchMenuText }`)
        }

        // 当前路由
				if (this.$route.path.slice(1) === result.pathname) return

        this.$router.push(result.pathname)

      },
			handleSelect({ pathname }) {
				// 当前路由
				if (this.$route.path.slice(1) === pathname) return

				this.$router.push(pathname)
      },

			querySearch(queryString, cb) {
				const filterList = this.flatNav.filter(v => {
					let { label } = v
          return label.includes(queryString)
        })
				// console.log(filterList)
				cb(filterList.map(v => {
					let { label, pathname } = v
					return {
						value: label,
            pathname
          }
        }))
			},

			handleFlatNav(arr) {
				return arr.reduce((result, item)=> {
					let { label, pathname, children } = item
					return result.concat(Array.isArray(children) ? this.handleFlatNav(children) : { label, pathname });
				}, []);
      },



		},
    computed: {
			// 对数组扁平化
			flatNav() {
        return this.handleFlatNav(this.navList)
      }
    }/*,
    mounted() {
	    console.log(this.flatNav)
    }*/
	}
</script>

<style lang="less">

  /* 左侧区域 */
  .el-aside {
    overflow-x: hidden;



    /* 侧边栏区域 */
    .slideBar {
      width: 100%;
      border: none !important;
      height: calc(100vh - 130px);

      /* 展开动画 */
      &.el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
      &.el-menu--collapse {
        width: 40px;
        overflow: hidden;
        z-index: 99;
        border-right: none;
      }
    }


  }
</style>