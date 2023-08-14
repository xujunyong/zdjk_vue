<template>
  <div>
<!--    <common-banner></common-banner>-->
    <div style="padding: 0 10%">
      <div class="coordinate">
        <div class="coordinate-left"><img  src="../../assets/images/coordinate.png"></div>
        <div class="coordinate-right">当前位置: &nbsp; {{consultationLocalPageName}} - {{ $route.query.navType}}</div>
      </div>
      <el-row class="forthDiv">
        <el-row style="margin-bottom: 50px">
         <div class="title">{{detail.title}}</div>
          <div style="border-bottom: 1px dashed rgba(187, 187, 187, 1);"></div>
          <div class="summary">{{detail.summary}}</div>
          <div class="updated_time">({{detail.updatedTime}})</div>
          <div class="content" v-html="detail.content"></div>
        </el-row>
      </el-row>
    </div>

  </div>
</template>

<script>
import CommonBanner from '@/pages/common/Banner'
import { getProfile } from "@/api/profile";

export default {
  name: 'CompanyPage',
  components: {
    CommonBanner,

  },
  data () {
    return {
      consultationLocalPageName: '首页',
      activeComponentName: 'News',
      detail: {}
    }
  },
  mounted (){
    this.nowPageName = this.$route.query.navType
    this.getDetail();
  },
  methods: {
    getDetail() {
      let navId = this.$route.query.navId;
      if(navId === '1'){
        getProfile(1).then(response => {
          this.detail = response.data.data;
        });
      }else{
        this.detail = this.$route.query.item;
        this.detail.title = this.$route.query.item.name;
      }
      let reg =/(\d{4})\-(\d{2})\-(\d{2})/;
      this.detail.updatedTime = this.detail.updatedTime== undefined ?"":this.detail.updatedTime.replace(reg,"$1年$2月$3日");
    }
  }
}
</script>
<style>
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
.content img{
  text-align: center;
}
.title{
  font-size: 28px;
  text-align: center;
  font-family: SourceHanSansSC-medium;
  bold: 100;
  margin-bottom: 20px;
}

.summary{
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}
.updated_time{
  font-size: 18px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}
</style>
