<template>
  <div>
<!--    <common-banner style="background-color: #c2e7b0" :imgSrc="imgPath" :imgLabel="imgLabel"></common-banner>-->
    <div style="position: relative;" class="consultation-container">
      <div class="title-shadow"></div>
      <div class="coordinate">
        <div class="coordinate-left"><img src="@/assets/images/coordinate.png" alt="coordinate"></div>
        <div class="coordinate-right">当前位置&nbsp;-&nbsp;{{consultationLocalPageName}}</div>
      </div>
      <el-row class="firstDiv">
        <el-col :span="6" v-for="(item,index) in list" :key="index" style="margin-bottom: 19px">
            <div class="con-box-head" v-on:click="consultationMoreClick(item.name,item.dictType,item.initKey,index)">
              <div class="con-box-image-box">
                <el-image :src="item.icon" class="con-box-image"/>
              </div>
              <div>
                <span>{{ item.name }}</span>
              </div>
            </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import CommonBanner from '@/pages/common/Banner'
import CommonMain from '@/pages/common/Main'
import IntroducePage from './components/Introduce'
import NewsPage from './components/News'
import wenjianjia from "../../assets/images/wenjianjia_1.png";
import xuke from "../../assets/images/xuke.png";
import banli from "../../assets/images/banli.png";
import shenpi from "../../assets/images/shenpi.png";
import shigong from "../../assets/images/gongcheng-3.png";
import yanshou from "../../assets/images/yanshou.png";
import qita from "../../assets/images/qita.png";

export default {
  name: 'CompanyPage',
  components: {
    CommonBanner,
    CommonMain,
    IntroducePage,
    NewsPage
  },
  data () {
    return {
      imgPath: '/static/img/banner2.jpg',
      imgLabel: '全过程咨询',
      list: [
        {
          icon: wenjianjia,
          name: '立项手续',
          dictType: 'consultation_procedures',
          initKey: 109,
          content: [
            {contentName: '立项审批',contentKey:109,activeIndex:0},
            {contentName: '环境影响评价', contentKey:110,activeIndex:1},
            {contentName: '社会稳定风险评价', contentKey:111}
          ]
        },
        {
          icon: xuke,
          name: '踩矿许可证办理',
          dictType: 'consultation_mining_license',
          initKey: 114,
          content: [
            {contentName: '勘探报告及专家评审', url: ''},
            {contentName: '开发利用方案及专家评审意见', url: ''},
            {contentName: '矿山地址环境治理与土地复垦方案', url: ''}
          ]
        },
        {
          icon: banli,
          name: '安全生产许可证及职业卫生办理',
          dictType: 'consultation_safe_production',
          initKey: 117,
          content: [
            {contentName: '安全预评价', url: ''},
            {contentName: '安全设施设计', url: ''},
            {contentName: '初步设计', url: ''}
          ]
        },
        {
          icon: xuke,
          name: '土地使用手续办理',
          dictType: 'consultation_landuse',
          initKey: 122,
          content: [
            {contentName: '林草占用批复', url: ''},
            {contentName: '土地征收', url: ''},
            {contentName: '土地报批', url: ''}
          ]
        },
        {
          icon: shenpi,
          name: '水利审批事项',
          dictType: 'consultation_water_conservancy_approval',
          initKey: 125,
          content: [
            {contentName: '水土保持方案', url: ''},
            {contentName: '取水许可证', url: ''},
            {contentName: '防洪影响评价', url: ''}
          ]
        },
        {
          icon: shigong,
          name: '施工阶段',
          dictType: 'consultation_construction_stage',
          initKey: 128,
          content: [
            {contentName: '地形测绘', url: ''},
            {contentName: '岩土工程勘查', url: ''},
            {contentName: '施工图设计', url: ''}
          ]
        },
        {
          icon: yanshou,
          name: '竣工验收',
          dictType: 'consultation_completion_acceptance',
          initKey: 132,
          content: [
            {contentName: '竣工验收', url: ''},
            {contentName: '环保验收', url: ''},
            {contentName: '水保验收', url: ''}
          ]
        },
        {
          icon: qita,
          name: '其他',
          content: []
        }
      ],
      consultationLocalPageName: '全过程咨询',
      nowPageName: '公司简介',
      activeComponentName: 'IntroducePage',
      dataSource: []
    }
  },
  methods: {
    consultationMoreClick(navName,dictType,initKey,index){
      if(index < 7){
        this.$router.push({path:"/website/company",query:{navType:navName,dictType:dictType,initKey:initKey}})
      }
    },
  }
}
</script>
<style>
.con-box-head {
  height: 217px;
  background-color: rgba(0, 83, 147, 1);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.consultation-container .con-box-head {
  width: 280px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: flex-start;
}
.consultation-container .con-box-head:hover {
  animation: pulse;
  animation-duration: 2s;
}
.consultation-container .con-box-image-box {
  margin: 54px 0 24px 0;
}
.con-box-head span {
  color: rgba(255, 255, 255, 1);
  font-size: 22px;
  text-align: center;
  font-family: SourceHanSansSC-medium;
}
.consultation-container .con-box-head span {
  font-size: 18px;
}
.con-box-image {
  width: 43px;
  height: 43px;
}

.con-box-image-box {
  padding: 16px 16px;
  border-radius: 63px;
  background-color: white;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}

.con-box-text {
  width: 530px;
  height: 217px;
  background-color: white;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

</style>
