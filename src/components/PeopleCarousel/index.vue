<template>
  <!-- height: 558px; -->
  <div class="people-card" style="margin-left: -9px; margin-right: 12px;">
    <el-carousel indicator-position="outside" class="carousel" arrow="never">
      <el-carousel-item v-for="(item, index) in formatData" :key="index" style="height: 100% !important;">
        <div class="img-container" style="height: 100% !important;">
          <el-row :gutter="10" style="width: 100%; height: 100% !important;">
            <el-col :span="8" v-for="(img, imgIndex) in item" :key="imgIndex">
              <!-- style="height: 495px;"  -->

              <div class="people-card-item" :class="{'people-back': back == '1'}" @click="handleImgClick(img)">
                <div v-if="back == '1'" :class="{'people-card-mask': back == '1'}"></div>
                <div class="people-card-image-wrap">
                  <el-image :src="img.summaryUrl" class="people-card-image" />
                </div>
                <div class="people-name">{{ img.name }}</div>
                <div class="people-desc" v-html="img.content"></div>
                <!-- <div class="people-desc">
                  这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字这是测试文字
                </div> -->
                <div class="people-job">这是职业？</div>
                <div class="people-mobile" :class="{'mobile-back': back == '1'}">18909876543</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  function spliceTwoArr(num, arr) {
    let newArr = [];
    const total = Math.ceil(arr.length / num);
    for (let i = 0; i < total; i++) {
      let a = arr.slice(i * num, (i + 1) * num);
      newArr.push(a);
    }
    return newArr;
  }

  export default {
    name: 'PeopleCarousel',
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      back: {
        type: String
      }
    },
    computed: {
      formatData() {
          console.log('this.data', this.data)
        return spliceTwoArr(3, this.data)
      }
    },
    methods: {
      handleImgClick(img) {
        this.$emit('imgClick', img)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .img-container {
    display: flex;
    cursor: pointer;
    height: 100%;
    // padding: 0 12.5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 60px;
    .img {
      position: relative;
      width: 280px;
      height: 325px;
      &:hover {
        animation: pulse;
        animation-duration: 2s;
      }

      img {
        width: 100%;
        height: 100%;
      }
      .name {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(0, 83, 147, 0.8);
      }
    }
  }
  .carousel {
    height: 558px !important;
  }
  .el-carousel__container {
    height: 100% !important;
  }
  .people-card-item {
    height: 495px;
    width: 100%;
    margin: 0 12.5px;
    padding: 34px 34px 20px;
    background: #FFFFFF;
    color: #262729;
    border-radius: 10px;
    border: 1px solid #E1ECF0;
    box-sizing: border-box;
    overflow: hidden;
  }
  .people-back {
    position: relative;
    color: #FFFFFF;
    background-image: url(https://img.js.design/assets/img/6499bbc30fb19817d661c625.jpg#28f9233d2432cb7520f7935eeb1d4e2a);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .people-card-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: rgba(29, 38, 58, 0.8);
  }
  .people-card-image-wrap {
    position: relative;
    z-index: 10;
    width: 180px;
    height: 180px;
  }

  .people-card-image {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  }
  .people-name {
    position: relative;
    z-index: 10;
    margin: 18px 0;
    width: 100%;
    height: 32px;
    line-height:32px;
    font-size: 22px;
    font-family: AppleSystemUIFont;
    // color: #262729;
  }
  .people-desc {
    position: relative;
    z-index: 10;
    height: 120px;
    font-size: 16px;
    font-family: AppleSystemUIFont;
    // color: #262729;
    line-height: 23px;
    -webkit-line-clamp: 5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .people-job {
    position: relative;
    z-index: 10;
    margin: 28px 0 6px;
    width: 100%;
    height: 22px;
    font-size: 15px;
    font-family: AppleSystemUIFont;
    // color: #262729;
    line-height: 22px;
  }
  .people-mobile {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 22px;
    font-size: 15px;
    font-family: AppleSystemUIFont;
    color: #1D263A;
    line-height: 22px;
  }
  .mobile-back {
    color: #FFFFFF;
  }

  .people-card {
    ::v-deep .el-carousel__item {
      background: none;
    }
    ::v-deep.el-carousel__arrow {
      border-radius: 4px;
      width: 50px;
      height: 50px;

      i {
        font-size: 30px;
      }
    }
  }
</style>
<style scoped>
.people-card {
  height: 558px;
}
.people-card >>> .el-carousel__indicator.is-active button {
  background-color: rgba(0, 186, 173, 1) !important;
}
.people-card >>> .el-carousel__container {
  height: 495px !important;
}
.people-card >>> .el-carousel__indicators--outside {
  bottom: 0;
  position: absolute;
}
</style>
