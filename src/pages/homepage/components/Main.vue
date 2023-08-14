<template>
  <el-container>
    <div style="width: 100%; position: relative;">
      <el-row style="position: relative">
        <div class="title-shadow"></div>
        <el-row class="firstDiv minus-top consultation-container">
          <div class="whole_process_consultation">全过程咨询</div>
          <el-col :span="6" v-for="(item,index) in list" :key="index" style="margin-bottom: 19px">
            <div class="con-box-head" v-on:click="goConsultationSecond(item.name,item.dictType,item.contentName,item.activeIndex)">
              <div class="con-box-image-box">
                <el-image :src="item.icon" class="con-box-image"/>
              </div>
              <div>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="secondDivContainer">
          <el-row class="secondDiv">
            <div class="whole_process_consultation">中地全过程咨询论坛</div>
            <div class="forum">
              <div v-for="(item,index) in articles" :key="index" class="secondDivContent" v-on:click="goForumDetail(item)">
                <div class="secondDivContent-title" style="font-size: 14px;">
                  <span>{{item.createdTime}}</span>
                </div>
                <div class="secondDivContent-content-container">
                  <div class="secondDivContent-content-title">
                    <span>{{item.title}}</span>
                  </div>
                  <div class="wordLine">
                    <span>{{item.digest}}</span>
                  </div>
                </div>
              </div>
            </div>
            <el-row style="display:flex;justify-content: center">
              <el-button class="border-btn" v-on:click="goForumHome">MORE</el-button>
            </el-row>
          </el-row>
        </div>

        <el-row class="thirdDiv">
          <div class="whole_process_consultation">专家列表</div>
<!--          <div style="height: auto;display: flex;justify-content:space-between;">-->
<!--            <div v-for="(o, index) in experts" :key="index" style="position: relative">-->
<!--              <div v-if="index ===0" style="position:absolute;margin-top: 55%;">-->
<!--                <img v-on:click ="ProfessorPage('left')" src="../../../assets/images/left.png" style="width: 40px;background-color: #cdcdcd">-->
<!--              </div>-->
<!--              <div v-if="index ===3" style=" height:40px;width:40px;position:absolute;z-index:3;margin-top: 55%;margin-left: 82%">-->
<!--                <img v-on:click ="ProfessorPage('right')" src="../../../assets/images/right.png" style="width: 40px;background-color: #cdcdcd">-->
<!--              </div>-->
<!--                  <img :src="o.summaryUrl" class="experts-img" v-on:click ="goProfessorDetail(o)">-->
<!--                  <div class="experts-name" v-on:click ="goProfessorDetail(o)">{{ o.name }}</div>-->
<!--            </div>-->
<!--          </div>-->
          <people-carousel ref="PeopleCarousel" :data="experts" @imgClick="goProfessorDetail" />
        </el-row>

        <div class="forthDivContainer">
          <el-row class="forthDiv">
            <div class="whole_process_consultation">新闻中心</div>
            <div class="news-container">
              <div class="news-content" v-for="(o, index) in news" :key="index">
                <el-card :body-style="{ padding: 0 }">
                  <img :src="o.summaryUrl" class="new-img" v-on:click ="goProfessorDetail(o)">
                  <div style="padding: 0 14px;">
                    <div style="font-size: 20px;margin: 15px 0 15px 0;" v-on:click ="goProfessorDetail(o)">{{o.title}}</div>
                    <div style="font-size: 16px;" class="newsLine">{{o.summary | ellipsis}}
                    </div>
                    <div class="bottom" style="overflow: hidden;height: 28px;">
                      <span style="float: left; color: #797979;">{{ o.createdTime }}</span>
                      <span style="float: right;color: #005393; cursor: pointer;" v-on:click ="goProfessorDetail(o)">更多>></span>
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </el-row>
        </div>

        <el-row class="fifthDiv">
          <div class="whole_process_consultation">公司简介</div>
          <!--<div style="height: auto;display: flex;justify-content:space-between; flex-wrap:wrap;">
            <div v-for="(o, index) in proFiles" :key="index" style="position: relative">
              <div v-if="index ===0" style="position:absolute;margin-top: 30%;">
                <img v-on:click ="ProfilePage('left')" src="../../../assets/images/left.png" style="width: 40px;background-color: #cdcdcd">
              </div>
              <div v-if="index ===3" style=" height:40px;width:40px;position:absolute;z-index:3;margin-top: 30%;margin-left: 85%">
                <img v-on:click ="ProfilePage('right')" src="../../../assets/images/right.png" style="width: 40px;background-color: #cdcdcd">
              </div>
              <img :src="o.summaryUrl" class="image" v-on:click ="goProfessorDetail(o)">
              <div style="background-color: #F9F9F9;text-align: center">
                <span>{{ o.title }}</span>
              </div>
            </div>
          </div>-->
          <div style="margin-top: 50px;">
            <profiles-carousel ref="ProfilesCarousel" :data="proFiles" @imgClick="goProfessorDetail" />
          </div>

        </el-row>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import wenjianjia from '../../../assets/images/wenjianjia_1.png'
import xuke from '../../../assets/images/xuke.png'
import banli from '../../../assets/images/banli.png'
import shenpi from '../../../assets/images/shenpi.png'
import yanshou from '../../../assets/images/yanshou.png'
import shigong from '../../../assets/images/gongcheng-3.png'
import qita from '../../../assets/images/qita.png'
import gongsijianjie from '../../../assets/images/gongsijianjie.png'
import { getWebset } from "@/api/webset";
import { listNews } from "@/api/news";
import {listExpert} from "@/api/expert";
import {listNoFirst} from "@/api/profile";
import {listArticle,setLooked} from "@/api/article";
import PeopleCarousel from '@/components/PeopleCarousel/index'
import ProfilesCarousel from '@/components/ProfilesCarousel/index'

export default {
  name: 'HomeMain',
  components: { ProfilesCarousel, PeopleCarousel },
  computed: {
    containerClass() {
      return this.$ISMOBILE ? '' : 'container'
    }
  },
  data() {
    return {
      webSetData: {},
      total:0,
      expertTotal: 0,
      proFileTotal: 0,
      articleTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 3,
      },
      queryProFileParams: {
        pageNum: 1,
        pageSize: 4,
      },
      articleQueryParams: {
        pageNum: 1,
        pageSize: 6,
      },
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      list: [
        {
          icon: wenjianjia,
          name: '立项手续',
          dictType: 'consultation_procedures',
          initKey: 109,
          contentName: '立项审批',contentKey:109,activeIndex:0,
          content: [
            {contentName: '立项审批',contentKey:109,activeIndex:0},
            {contentName: '环境影响评价', contentKey:110,activeIndex:1},
            {contentName: '社会稳定风险评价', activeIndex:2}
          ]
        },
        {
          icon: xuke,
          name: '采矿许可证办理',
          dictType: 'consultation_mining_license',
          initKey: 114,
          contentName: '勘探报告及专家评审', activeIndex:0,
          content: [
            {contentName: '勘探报告及专家评审', activeIndex:0},
            {contentName: '开发利用方案及专家评审意见', activeIndex:1},
            {contentName: '矿山地址环境治理与土地复垦方案', activeIndex:2}
          ]
        },
        {
          icon: banli,
          name: '安全生产许可证及职业卫生办理',
          dictType: 'consultation_safe_production',
          initKey: 117,
          contentName: '安全预评价', activeIndex:0,
          content: [
            {contentName: '安全预评价', activeIndex:0},
            {contentName: '安全设施设计', activeIndex:1},
            {contentName: '初步设计', activeIndex:2}
          ]
        },
        {
          icon: xuke,
          name: '土地使用手续办理',
          dictType: 'consultation_landuse',
          initKey: 122,
          contentName: '林草占用批复', activeIndex:0,
          content: [
            {contentName: '林草占用批复', activeIndex:0},
            {contentName: '土地征收', activeIndex:1},
            {contentName: '土地报批', activeIndex:2}
          ]
        },
        {
          icon: shenpi,
          name: '水利审批事项',
          dictType: 'consultation_water_conservancy_approval',
          initKey: 125,
          contentName: '水土保持方案', activeIndex:0,
          content: [
            {contentName: '水土保持方案', activeIndex:0},
            {contentName: '取水许可证', activeIndex:1},
            {contentName: '防洪影响评价', activeIndex:2}
          ]
        },
        {
          icon: shigong,
          name: '施工阶段',
          dictType: 'consultation_construction_stage',
          initKey: 128,
          contentName: '地形测绘', activeIndex:0,
          content: [
            {contentName: '地形测绘', activeIndex:0},
            {contentName: '岩土工程勘查', activeIndex:1},
            {contentName: '施工图设计', activeIndex:2}
          ]
        },
        {
          icon: yanshou,
          name: '竣工验收',
          dictType: 'consultation_completion_acceptance',
          initKey: 132,
          contentName: '竣工验收', activeIndex:0,
          content: [
            {contentName: '竣工验收', activeIndex:0},
            {contentName: '环保验收', activeIndex:1},
            {contentName: '水保验收', activeIndex:2}
          ]
        },
        {
          icon: qita,
          name: '其他',
          content: []
        }
      ],
      items: [],
      news: [],
      proFiles: [],
      experts: [],
      articles: []
    }
  },
  mounted (){
    this.getWebSet();
    this.getNewList();
    this.getExpertList();
    this.getProFileList();
    this.getArticleList();
  },
  filters: {
    //超过20位显示...
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 18) {
        return value.slice(0, 18) + "...";
      }
      return value;
    },
    assignment: function(value){
      this.expertImageUrl = require(value);
    }
  },
  methods:{
    ProfessorPage(row){
      if(row === 'right'){
        if(this.expertTotal > (this.queryParams.pageNum*4)){
          this.queryParams.pageNum++;
        }
      }else{
        if(!(this.queryParams.pageNum === 1)){
          this.queryParams.pageNum--;
        }
      }
      this.getExpertList();
    },
    ProfilePage(row){
      if(row === 'right'){
        if(this.proFileTotal> (this.queryProFileParams.pageNum*4)){
          this.queryProFileParams.pageNum++;
        }
      }else{
        if(!(this.queryProFileParams.pageNum === 1)){
          this.queryProFileParams.pageNum--;
        }
      }
      this.getProFileList();

    },
    goProfessorDetail(row) {
      this.$router.push({path:"/website/Detail",query:{navType: '专家列表',item: row}})
    },
    consultationMoreClick(navName,dictType,initKey,index){
      if(index < 7){
        this.$router.push({path:"/website/company",query:{navType:navName,dictType:dictType,initKey:initKey}})
      }

    },
    goForumDetail(item){
      let param = {};
      param.articleId = item.articleId;
      setLooked(param).then(response => {
      });
      this.$router.push({path:"/website/forumDetail",query:{navType: '新闻中心',item: item}});
    },
    goForumHome(){
      this.$router.push({path:"/website/forumHome"});
    },
    goConsultationSecond(navName,dictType,contentName,contentKey){
      this.$router.push({path:"/website/company",query:{navType:navName,dictType:dictType,contentName:contentName,activeIndex:contentKey}})
    },
    getNewList() {
      listNews(this.queryParams).then(response => {
        this.news = response.data.rows;
        this.total = response.data.total;
      });
    },
    getProFileList() {
      listNoFirst().then(response => {
        this.proFiles = response.data.rows;
        this.proFileTotal = response.data.total;
      });
    },
    getArticleList() {
      listArticle(this.articleQueryParams).then(response => {
        this.articles = response.data.rows;
        this.articleTotal = response.data.total;
      });
    },
    getExpertList() {
      this.loading = true;
      this.queryParams.pageSize = 4;
      listExpert().then(response => {
        this.experts = response.data.rows;
        this.expertTotal = response.data.total;
      });
    },
    getWebSet(){
      getWebset("1").then(response => {
        this.webSetData = response.data;
      });
    }
  }
}
</script>

<style>
  .firstDiv, .secondDiv, .thirdDiv, .forthDiv, .fifthDiv {
    margin: 0 auto;
    width: 1280px;
    overflow: hidden;
    padding: 60px 0 80px 0;
  }
  .secondDivContainer, .forthDivContainer {
    background-color: rgba(248, 252, 255, 1)
  }
  .minus-top {
    margin-top: -110px;
  }
  .firstDiv {
    padding-top: 0;
    z-index: 5000;
  }
  .title-shadow {
    height: 90px;
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    position: absolute;
    top: -90px;
    left: 0;
    right: 0;
    z-index: 5000;
  }
  .coordinate {
    width: 1260px;
    margin: 0 auto;
    margin-top: 20px !important;
    margin-bottom: 30px !important;
  }
  .coordinate-left {
    margin-top: 4px;
  }
/*.firstDiv {*/
/*  margin-top: 20px;*/
/*  padding: 0 10%;*/
/*}*/

/*.secondDiv {*/
/*  padding: 0 10%;*/
/*  background-color: #F8FCFF;*/
/*}*/

/*.thirdDiv {*/
/*  padding: 0 10%;*/
/*}*/

/*.forthDiv {*/
/*  padding: 0 10%;*/
/*  margin-top: 56px;*/
/*  margin-bottom: 50px;*/
/*  background-color: #F8FCFF;*/
/*}*/

/*.fifthDiv {*/
/*  padding: 0 10%;*/
/*  margin-bottom: 20px;*/
/*}*/
.forum{
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;
}

.secondDivContent {
  cursor:pointer;
  min-height: 30px;
  max-height: 140px;
  margin-top: 20px !important;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  border: 1px solid #BBBBBB;
  color: #ABABAB;
  box-sizing: border-box;
  padding: 10px 0;
  overflow: hidden;
  align-items: center;
}
.secondDivContent:hover, .secondDivContent:hover .secondDivContent-title, .secondDivContent:hover .secondDivContent-content-title {
  color: #ffffff !important;
  background-color: #005393;
}
.secondDivContent:hover .secondDivContent-title {
  border-right: 0.5px dashed #FFFFFF;
}
.secondDivContent .secondDivContent-title {
  display: flex;
  justify-content: space-around;
  width: 100px;
  padding: 20px 0;
  border-right: 0.5px dashed #ABABAB;
  box-sizing: border-box;
  align-items: center;
  line-height: 28px;
  color: #414141;
  flex-shrink: 0;
  text-align: center;
  height: 80px;
}
.secondDivContent .secondDivContent-content-container {
  margin-left: 40px;
  height: 80px;
  overflow: hidden;
}
.secondDivContent-content-container .secondDivContent-content-title {
  margin: 4px 0 10px 0;
  color: #414141;
  font-weight: bold;
}
.border-btn {
  line-height: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(0, 83, 147, 1);
  width: 110px;
  height: 44px;
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 83, 147, 1);
}
.border-btn:hover {
  color: #ffffff;
  background-color: rgba(0, 83, 147, 1);
}
.experts{
  text-align: center;
}
.expert-img{
  margin: 5px 10px;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: border-box;
  background-size: contain;
}

.wordLine {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 24px;
  font-size: 12px;
}
.experts_card{
  text-align: center;
  background-color: rgba(249, 249, 249, 1);
}
.experts-img{
  margin: 0 0;
  height: 325px;
  width: 233px;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: border-box;
  background-size: contain;
  z-index: 0;
}
.experts-name{
  height: 40px;
  margin-top: -60px;
  padding-top: 16px;
  width: 100%;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
  background-color: rgba(0, 83, 147, 0.8);
  position:absolute;
  z-index: 2;
}
.new-img{
  margin: 0 0;
  height: 232px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: border-box;
  background-size: contain;
}
.newsLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-bottom: 20px;
}

.whole_process_consultation {
  margin-bottom: 20px;
  z-index: 100;
  text-align: center;
  color: #005393;
  font-size: 28px;
  height: 120px;
  line-height: 100px;
  background-image: url('../../../assets/images/11.png');
  background-position: center;
  background-size: 400px, 70px;
  background-repeat: no-repeat;
}

.consultation_list li {
  margin-top: 19px;
  list-style: none;
  margin-left: 120px;
}


.main-con-box-head {
  width: 237px;
  height: 210px;
  background-color: rgba(0, 83, 147, 1);
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  box-sizing: border-box;
  padding: 10px 10px 10px 20px;
  position: relative;
}

  .main-con-box-head:hover {
    animation:mymove 1s infinite;
  }

  @keyframes mymove
  {
    0% {
      background: rgba(0, 83, 147, 1);
    }
    50% {
      background: rgba(0, 83, 147, 0.6);
    }
    100% {
      background: rgba(0, 83, 147, 1);
    }
  }

.con-box-more {
  position: absolute;
    right: 20px;
    bottom: 20px;
}
.con-box-more img{
  width: 22px;
}

.main-con-box-container, .secondDivContent {
  width: 630px;
  overflow: hidden;
  margin: 5px 0;
}
.main-con-box-container:nth-child(odd), .secondDivContent:nth-child(odd) {
  margin-right: 20px;
}
.main-con-box-container:nth-child(even), .secondDivContent:nth-child(even) {
}
.main-con-box-head span {
  width: 132px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  text-align: center;
  font-family: SourceHanSansSC-medium;
  margin-left: 15px;
  margin-right: 10px;
}

.main-con-box-image {
  width: 30px;
  height: 30px;
}

.main-con-box-image-box {
  width: 52px;
  height: 52px;
  border-radius: 52px;
  flex-shrink: 0;
  background-color: white;
  display: flex;
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
.image{
  width: 272px;
  height: 189px;
}
.con-box-text-item {
  margin-left: 22px;
  border-bottom: 1px solid rgba(187, 187, 187, 1);
  line-height: 72px;
}
  .con-box-text-item:hover {
    /*font-size: 26px;*/
    transform: scale(1.06);
    cursor: pointer;
  }
.con-box-text-item:last-child{
  border-bottom:none;
}
.con-box-text-item-else{
  margin-left: 22px;
  margin-top: 15%;
  text-align: center;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
