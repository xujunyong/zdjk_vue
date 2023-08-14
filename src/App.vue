<template>
  <div id="app">
    <main-header v-if="$route.meta.navShow" :currentPath="currentPath"/>
    <forum-header v-else-if="$route.meta.isNotLogin" :currentPath="currentPath"/>
    <router-view/>
    <main-footer v-show="$route.meta.navShow"/>
  </div>
</template>

<script>
import MainHeader from '@/pages/common/Header'
import ForumHeader from '@/pages/common/ForumHeader'
import MainFooter from '@/pages/common/Footer'
export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter,
    ForumHeader
  },
  data () {
    return {
      currentPath: '/website',
      userName: ''
    }
  },
  created () {

  },
  mounted () {
    // this.$router.push('/website')

    // console.log(this.userName)
    // if (this.$router.history.current && this.$router.history.current.path) {
    //   this.currentPath = this.$router.history.current.path
    // }
  }
}
</script>

<style lang="scss">
html,body,#app{
  /*height: 100%;*/
  min-width: 1000px;
}
#app {
  font-family: 'Avenir', 'Helvetica Neue', Helvetica, 'PingFang SC', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1rem;
}
#app #mobile-header .el-collapse-item__arrow {
  display: none !important;
}
  /* 自定义样式 */
$layout-container-width: 1280px;
.layout-container {
  width: $layout-container-width;
}

.news-container {
  display: flex;
  flex-wrap: wrap;

  .news-content {
    width: 412px;
    /*height: 420px;*/
    flex-shrink: 0;
    cursor: pointer;
    &:hover {
      animation: pulse;
      animation-duration: 2s;
    }

    .newsLine, .time {
      color: #797979;
    }
  }

  .news-content:nth-child(3n+2) {
    margin: 0 22px;
  }
}
/* 自定义样式 */
</style>
