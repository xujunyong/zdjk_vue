<template>
  <div>
    <el-carousel :height="widths * 0.48125 + 'px'">
      <el-carousel-item v-for="item in pics" :key="item.id">
        <el-image :src=item.url style="width: 100%; height: 100%"></el-image>
        <!-- <div class="logo-box">
          <el-col :span="24" style="text-align: center" v-on:click="iconClick">
            <img v-on:click="iconClick" class="logo" src="@/assets/images/logo-diaphragm.png" alt="logo">
          </el-col>
        </div> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import { listBanner } from '@/api/banner'

  export default {
    name: 'CommonBanner',
    props: {},
    data() {
      return {
        pics: [],
        widths: document.documentElement.clientWidth
      }
    },
    computed: {
      className() {
        return this.$ISMOBILE ? 'image mobile-image' : 'image'
      }

    },
    mounted() {
      this.bannerFunction()
    },
    methods: {
      iconClick() {
        this.activeIndex = '0'
        this.$router.push('/website')
      },
      bannerFunction() {
        listBanner().then(response => {
          this.pics = response.data.rows
        })
      }

    }
  }
</script>

<style scoped>
  .logo {
    width: 48rem;
  }

  .image.mobile-image {
    height: 15rem;
  }

  .logo_c {
    /*left: 760px;*/
    /*top: 224px;*/
    /*width: 615px;*/
    /*height: 72px;*/
    color: rgba(0, 83, 147, 1);
    font-size: 52px;
    text-align: left;
    margin-left: 30px;
    font-family: AlibabaPuHui-regular;
    /*display: flex;*/
    justify-content: flex-end;
    /*align-items: center;*/
  }

  .logo_e {
    color: rgba(255, 255, 255, 1);
    font-size: 21px;
    text-align: left;
    font-family: Arial-regular;
    margin-top: 15px;
    text-align: left;
    margin-left: 30px;
    justify-content: flex-end;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .logo-box {
    position: absolute;
    width: 100%;
    /*left: 603px;*/
    top: 217px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .home-bottom {
    font-size: 16px;
    font-family: AppleSystemUIFont;
    color: #FFFFFF;
    text-align: center;
    width: 100%;
    height: 80px;
    background: #1D263A;
    align-items: center;
  }
  .home-bottom img {
    width: 24px;
    height: 24px;
  }

</style>
