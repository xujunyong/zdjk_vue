<template>
  <div>
    <el-container id="header">
      <el-header class="header-container fixed">
        <el-menu
          @select="handleSelect"
          :default-active="activeIndex"
          mode="horizontal"
          text-color="rgba(0, 83, 147, 1)"
          active-text-color="rgba(0, 83, 147, 1)"
          background-color="rgba(255,255,255,0)"
          font-size="22px"
          class="menu"
        >
          <el-menu-item class="menu-item" v-for="(menu, index) in menus" :key="menu.id" :index="index.toString()">
            {{menu.label}}
          </el-menu-item>
        </el-menu>
      </el-header>
      <div v-if="loginStatus" class="login-status">
        <span style="cursor:pointer" @click="loginClick">登录</span>
        <span style="cursor:pointer">注册</span>
      </div>

      <main-banner style="position: relative;z-index: 0;background-color: #F9F9F9"></main-banner>
    </el-container>
  </div>
</template>

<script>
  import MainBanner from '../common/Banner'
  import { getToken, setToken, removeToken } from '@/common/js/auth'

  export default {
    name: 'MainHeader',
    components: {
      MainBanner
    },
    data() {
      return {
        activeIndex: '0',
        name: '0',
        user: {},
        menus: [
          {
            'id': 'nav1',
            'label': '首页',
            'path': '/website/'
          },
          {
            'id': 'nav2',
            'label': '企业概况',
            'path': '/website/Detail'
          },
          {
            'id': 'nav3',
            'label': '全过程咨询',
            'path': '/website/consultation'
          },
          {
            'id': 'nav4',
            'label': '专家列表',
            'path': '/website/professor'
          },
          {
            'id': 'nav5',
            'label': '新闻中心',
            'path': '/website/news'
          },
          {
            'id': 'nav6',
            'label': '中地论坛',
            'path': '/website/forumHome'
          }
          // {
          //   'id': 'nav7',
          //   'label': '关于我们',
          //   'path': '/website/about'
          // }
        ],
        loginStatus: true,
        menu_style: '',
        opened: false
      }
    },
    props: {
      currentPath: {
        type: String,
        default: '/'
      }
    },
    mounted() {
      this.menus.forEach((menu, index) => {
        if (menu.path === this.currentPath) {
          this.activeIndex = index.toString()
        }
      })
      this.verifyStatus()
    },
    computed: {
      iconClass() {
        return this.opened ? 'el-icon-menu is-opened' : 'el-icon-menu'
      }
    },
    methods: {
      loginClick() {
        this.$router.push({ path: '/website/login' })
      },
      iconClick() {
        this.activeIndex = '0'
        this.$router.push('/website')
      },
      verifyStatus() {
        let token = getToken()
        if (token !== undefined) {
          this.loginStatus = false
        }
      },
      handleSelect(val) {
        this.activeIndex = val
        this.name = '0'
        const path = this.menus[val].path
        const menuName = this.menus[val].label
        if (val === '1') {
          this.$router.push({ path, query: { navType: '企业概况', navId: val } })
        } else {
          this.$router.push({ path, query: { navType: '新闻中心', navId: val } })
        }
      },
      handleChange() {
        this.opened = !this.opened
      }
    }
  }
</script>

<style lang="scss" scoped>
  $layout-container-width: 1280px;
  $header-text-color: #005393;
  .layout-container {
    width: $layout-container-width;
  }

  .header-container {
    @extend .layout-container;
    min-width: 800px;
  }

  .el-menu-item:hover {
    background-color: rgba(255, 255, 255, 0) !important;
    font-weight: bold;
  }

  .menu-item {
    font-family:"Microsoft YaHei";
    /*margin-left: 30px;*/
    font-size: 22px;
  }

  .menu {
    text-align: center;
    display: flex;
    justify-content: space-between;
  }

  .login-status {
    position: absolute;
    right: 82px;
    top: 40px;
    font-size: 16px;
    font-family: "AlibabaPuHui-regular";
    z-index: 100;
    color: $header-text-color;
    width: 82px;
    display: flex;
    justify-content: space-between;

    & span:hover {
      font-size: 18px;
      font-weight: bold;
    }
  }

  #mobile-header .logo {
    width: 3rem;
    height: 3rem;
  }

  #header .el-menu {
    border: none;
  }

  #mobile-navbar {
    height: 100%;
  }

  #mobile-navbar i {
    font-size: 1.5rem;
  }

  .fixed {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
    top: 44px;
  }

  .menuLeft .el-menu-item:hover {
    background: rgba(255, 255, 255, 0.99) !important;
  }

  .menuLeft .el-submenu__title:hover {
    background: rgba(255, 255, 255, 0.99) !important;
  }

  .menuLeft.el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px
  }
  ::v-deep.el-menu--horizontal>.el-menu-item.is-active {
    font-weight: bold;
  }
</style>
