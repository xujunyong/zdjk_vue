<template>
  <div class="people-card">
    <el-carousel indicator-position="outside" type="card" height="314px" arrow="never">
      <el-carousel-item v-for="(item, index) in data" :key="index">
        <div class="company-desc-item" @click="handleImgClick(item)">
          <img class="company-desc-image" :src="item.summaryUrl" alt="">
          <div class="company-desc-text">{{ item.title }}</div>
        </div>
        <!--<div class="img-container">-->
          <!--<div class="img" v-for="(img, imgIndex) in item" :key="imgIndex">-->
            <!--<img :src="img.summaryUrl" class="experts-img" @click="handleImgClick(img)" alt="专家图片">-->
            <!--<div class="name">-->
              <!--<span>{{ img.title }}</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
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
    name: 'ProfilesCarousel',
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      formatData() {
        return spliceTwoArr(4, this.data)
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
    justify-content: space-between;

    .img {
      position: relative;
      width: 306px;
      height: 325px;
      background-color: rgba(249, 249, 249, 1);
      &:hover {
        animation: pulse;
        animation-duration: 2s;
      }


      img {
        width: 272px;
        display: block;
        margin: 0 auto;
        height: 190px;
        margin-bottom: 22px;
        cursor: pointer;
      }
      .name {
        width: 272px;
        margin: 0 auto;
        font-size: 19px;
        color: #333333;
        line-height: 30px;
      }
    }
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
  .company-desc-item {
    background: #FFF;
    position: relative;
    height: 274px;
    border-radius: 12px;
    box-shadow: 0 12px 36px  rgba(0, 31, 51, 0.12);
    overflow: hidden;
  }
  .company-desc-image {
    width: 100%;
    height: 100%;
  }
  .company-desc-text {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 47px;
    padding: 0 21px;
    line-height: 47px;
    font-size: 16px;
    font-weight: 400;
    color: #FFF;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
