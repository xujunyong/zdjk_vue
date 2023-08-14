<template>
  <div class="people-card">
    <el-carousel indicator-position="outside" height="325px">
      <el-carousel-item v-for="(item, index) in formatData" :key="index">
        <div class="img-container">
          <div class="img" v-for="(img, imgIndex) in item" :key="imgIndex">
            <img :src="img.summaryUrl" class="experts-img" @click="handleImgClick(img)" alt="专家图片">
            <div class="name">
              <span>{{ img.name }}</span>
            </div>
          </div>
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
    cursor: pointer;

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
