<template>
  <div class="professor-container">
<!--    <common-banner></common-banner>-->
    <div style="padding: 40px 0;">
      <div class="coordinate">
        <div class="coordinate-left"><img src="../../assets/images/coordinate.png" alt="icon"></div>
        <div class="coordinate-right">当前位置: {{consultationLocalPageName}} - {{nowPageName}}</div>
      </div>
      <el-row class="firstDiv">
<!--        <el-row>-->
<!--          <el-col v-for="(item, index) in experts" :key="index"  style="margin-bottom: 20px" >-->
<!--            <el-card :body-style="{ padding: '0px',height:'325px',width: '306px' }" >-->
<!--              <div class="expert-img" v-on:click ="goProfessorDetail(item)" :style="{backgroundImage: `url(${item.summaryUrl})` }"></div>-->
<!--&lt;!&ndash;              <img class="expert-img" v-on:click ="goProfessorDetail(item)" style="width: 100%" :src="item.summaryUrl"/>&ndash;&gt;-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--        </el-row>-->

        <div class="img-container">
          <div class="img" v-for="(img, imgIndex) in experts" :key="imgIndex" style="margin-bottom: 20px;">
            <img :src="img.summaryUrl" class="experts-img" @click="goProfessorDetail(img)" alt="专家图片">
            <div class="name">
              <span>{{ img.name }}</span>
            </div>
          </div>
        </div>
      </el-row>

      <el-pagination
        style="text-align: center;margin: 20px"
        background
        layout="prev, pager, next"
        v-show="total>0"
        :total="total"
        :hide-on-single-page="true"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @current-change="handleSizeChange"
        @pagination="getList"/>
    </div>

  </div>
</template>

<script>
import CommonBanner from '@/pages/common/Banner'
import CommonMain from '@/pages/common/Main'
import ListPage from './components/List'
import {listExpert} from '../../api/expert'

export default {
  name: 'Professor',
  components: {
    CommonBanner,
    CommonMain,
    ListPage
  },
  data () {
    return {
      consultationLocalPageName: "首页",
      nowPageName: '专家列表',
      imgLabel: '产品与服务',
      queryParams: {
        pageNum: 1,
        pageSize: 6,
        title: null,
        createdTime: null,
      },
      total: 0,
      experts: [],
      activeComponentName: 'ProductList'
    }
  },
  mounted (){
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true;
      listExpert(this.queryParams).then(response => {
        this.experts = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleSizeChange(val) { // 修改每页所存数据量的值所触发的函数
      this.queryParams.pageSize = val;   // 修改页的大小
      this.getList();       // 按新的pageNo和pageSize进行查询
    },
    goProfessorDetail(row) {
      this.$router.push({path:"/website/Detail",query:{navType: '专家列表',item: row}})
    }
  }
}
</script>
<style lang="scss">
.card{
  width: 100%;
  height: 100%;
  position: absolute;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.coordinate{
  margin-top: 10px;
  line-height: 30px;
  display: flex;
  border-bottom: 1px dashed rgba(187, 187, 187, 1);
  margin-bottom: 20px;
}
.coordinate-left{
  justify-content: flex-start;
}
.coordinate-left img{
  width: 32px;
  height: 32px;
}
.coordinate-right{
  margin-left: 7px;
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  padding-top: 5px;
  font-family: SourceHanSansSC-regular;
  justify-content: flex-start;
}
.expert-img{
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: border-box;
  background-size: contain;
}
.professor-container {
  .img-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .img {
      position: relative;
      width: 280px;
      height: 325px;
      cursor: pointer;

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
}

</style>
