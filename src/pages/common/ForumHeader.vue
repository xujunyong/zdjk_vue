<template>
  <div class="forum-header-container" id="header">
    <div class="forum-title">中地论坛</div>
    <div class="forum-list-wrap">
      <div class="forum-list-item" v-for="(item, index) in menuList" :key="index">
        <span class="menu-item-name">{{item.name}}</span>
        <img class="menu-item-icon" v-if="item.icon" :src="item.icon" alt="">
      </div>
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="state"
        placeholder="请输入内容">
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="handleIconClick">
        </i>
      </el-autocomplete>
    </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/common/js/auth'
import { getUserInfo } from '@/api/user'
import cookie from 'js-cookie'

export default {
  name: 'MainHeader',
  data () {
    return {
      activeIndex: '0',
      name: '0',
      state: '',
      user: {},
      loginStatus: true,
      menus: [
        {
          'id': 'nav1',
          'label': '首页',
          'path': '/website/'
        },
        {
          'id': 'nav1',
          'label': '关注',
          'path': '/website/'
        },
        {
          'id': 'nav2',
          'label': '推荐',
          'path': '/website/company'
        },
        {
          'id': 'nav3',
          'label': '热榜',
          'path': '/website/consultation'
        }
      ],
      menuList: [
        {
          name: '首页'
        },
        {
          name: '关注'
        },
        {
          name: '推荐'
        },
        {
          name: '热榜',
          icon:  require('../../assets/images/rebang.png')
        }
      ],
      opened: false
    }
  },
  props: {
    currentPath: {
      type: String,
      default: '/'
    }
  },
  mounted () {
    this.menus.forEach((menu, index) => {
      if (menu.path === this.currentPath) {
        this.activeIndex = index.toString()
      }
    });
    this.verifyStatus();
  },
  computed: {
    iconClass () {
      return this.opened ? 'el-icon-menu is-opened' : 'el-icon-menu'
    }
  },
  methods: {
    iconClick () {
      this.activeIndex = '0'
      let token = getToken();
      if(token !== undefined){
      }else{
        this.$router.push('/website/Login')
      }
    },
    loginClick(){
      this.$router.push({path:'/website/login'});
    },
    verifyStatus(){
      let token = getToken();
      if(token !== undefined){
        cookie.set('token',token);
        this.loginStatus = false;
        getUserInfo().then(response => {
          this.user = response.data.data;
        });
      }
    },
    handleIconClick () {
      console.log(1)
    },
    handleSelect (val) {
      this.activeIndex = val
      this.name = '0'
      const path = this.menus[val].path
      this.$router.push(path)
    },
    handleChange () {
      this.opened = !this.opened
    }
  }
}
</script>

<style lang="scss" scoped>
  .forum-header-container {
    padding: 0 19%;
    .container {
      width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      height: 100%;
    }

    .logo {
      width: 50px;
      height: 50px;
      margin-right: 4px;
    }

    .logo-box strong{
      color: rgba(65, 65, 65, 1);
      font-size: 36px;
    }

    .login-status{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-status span{
      font-size: 18px;
      margin-left: 5px;
      cursor: pointer;

      &:hover{
        color: #409EFF;
        font-size: 20px;
      }
    }
    .login-status span:first-child {
      margin-right: 6px;
    }
    #mobile-header .logo {
      width: 40px;
      height: 40px;
    }
    .forum-right-logo{
      width: 40px;
      height: 40px;
      margin-right: 4px
    }

    ::v-deep.el-menu-item {
      font-size: 16px;
    }
    ::v-deep.el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    ::v-deep.el-menu--horizontal>.el-menu-item.is-active {
      border-color: #005393;
    }
  }


  .logo-box {
    display: flex;
    align-items: center;
  }



  .menuLeft .el-menu-item:hover{
    background: rgba(255, 255, 255, 0.99) !important;
  }
  .menuLeft .el-submenu__title:hover {
    background: rgba(255, 255, 255, 0.99) !important;
  }
  .menuLeft.el-menu--horizontal>.el-menu-item{
    height:40px;
    line-height:40px
  }
  .forum-title {
    margin: 80px 0 45px;
    text-align: center;
    height: 47px;
    font-size: 32px;
    font-family: AppleSystemUIFont;
    color: #262729;
    line-height: 46px;
  }
  .forum-list-wrap {
    display: flex;
    margin-bottom: 35px;
  }
  .forum-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 40px;
  }
  .menu-item-name {
    height: 20px;
    font-size: 16px;
    font-family: AppleSystemUIFont;
    color: #000;
    line-height: 20px;
  }
  .menu-item-name.active {
    color: #05C1D3;
  }
  .menu-item-icon {
    width:18px;
    height:18px;
    margin-left: 2px;
  }
</style>
