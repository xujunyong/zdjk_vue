<template>
  <el-container>
    <div style="width: 100%; position: relative">
      <el-row style="position: relative">
        <!-- <div class="title-shadow"></div> -->
        <!-- 全过程咨询 -->
        <el-row class="consultation-container consultation-containers" :gutter="30">
          <div class="whole_process_consultation">全过程咨询</div>
          <el-col
            :span="8"
            v-for="(item, index) in list"
            :key="index"
            style="margin-bottom: 19px"
          >
            <div
              class="ncon-box-heads"
              v-on:click="
                goConsultationSecond(
                  item.name,
                  item.dictType,
                  item.contentName,
                  item.activeIndex
                )
              "
            >
              <div class="con-box-image-boxs">
                <el-image :src="item.icon" />
              </div>
              <div class="con-box-name">
                <span>{{ item.name }}</span>
              </div>
              <div class="con-box-bottom">点击进入 >></div>
            </div>
          </el-col>
        </el-row>
        <!-- 中地全过程咨询论坛 -->
        <div class="consultation-containers">
          <el-row class="secondDivs">
            <div class="whole_process_consultation">中地全过程咨询论坛</div>
            <div class="secondDivsimg" @click="goForumHome"></div>
            <div class="forum">
              <div
                v-for="(item, index) in articles"
                :key="index"
                class="secondDivContents"
                :class="{
                  first: index == 0,
                  last: index == articles.length - 1,
                  cardinality: index % 2 == 0,
                  evennumber: index % 2 == 1,
                }"
                v-on:click="goForumDetail(item)"
              >
                <div class="secondDivContents-content-title">
                  {{ item.title }}
                </div>
                <div class="secondDivContents-content-container">
                  {{ item.digest }}
                </div>
                <div class="secondDivContents-title" style="font-size: 14px">
                  {{ item.createdTime }}
                </div>
              </div>
            </div>
            <!-- <el-row style="display: flex; justify-content: center">
              <el-button class="border-btn" v-on:click="goForumHome"
                >MORE</el-button
              >
            </el-row> -->
          </el-row>
        </div>
        <!-- 专家列表 -->
        <el-row class="thirdDiv expert-list">
          <div class="div-mask">
            <div class="expert-list-title">专家列表</div>
            <people-carousel
              ref="PeopleCarousel"
              :data="experts"
              @imgClick="goProfessorDetail"
            />
          </div>

        </el-row>
        <!-- 新闻中心 -->
        <div class="forthDivContainer">
          <el-row class="forthDiv">
            <div class="news-center-title">新闻中心</div>
            <el-carousel indicator-position="outside"  height="424px" arrow="never">
              <el-carousel-item v-for="(item, index) in news" :key="index">
                <div class="news-content-wrap" @click="goProfessorDetail(item)">
                  <div class="news-content">
                    <!--<div class="news-content-title">{{ item.title }}</div>-->
                    <!--<div class="news-content-text">{{item.content}}</div>-->
                    <div class="news-content-title">这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题</div>
                    <div class="news-content-text">这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容这是新闻内容</div>
                  </div>
                  <img class="news-image" :src="item.summaryUrl" alt="">
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-row>
        </div>

        <el-row class="fifthDiv company-desc-wrap">
          <div class="company-desc-title">公司简介</div>
          <div style="margin-top: 50px">
            <profiles-carousel
              ref="ProfilesCarousel"
              :data="proFiles"
              @imgClick="goProfessorDetail"
            />
          </div>
        </el-row>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import wenjianjia from "../../../assets/images/wenjianjia_1.png";
import xuke from "../../../assets/images/xuke.png";
import banli from "../../../assets/images/banli.png";
import shenpi from "../../../assets/images/shenpi.png";
import yanshou from "../../../assets/images/yanshou.png";
import shouxu from "../../../assets/images/shouxu.png";
import caikuang from "../../../assets/images/caikuang.png";
import anquan from "../../../assets/images/anquan.png";
import tudi from "../../../assets/images/tudi.png";
import shuili from "../../../assets/images/shuili.png";
import shigong from "../../../assets/images/shigong.png";
import jungong from "../../../assets/images/jungong.png";
import qita from "../../../assets/images/qita.png";
import gongsijianjie from "../../../assets/images/gongsijianjie.png";
import { getWebset } from "@/api/webset";
import { listNews } from "@/api/news";
import { listExpert } from "@/api/expert";
import { listNoFirst } from "@/api/profile";
import { listArticle, setLooked } from "@/api/article";
import PeopleCarousel from "@/components/PeopleCarousel/index";
import ProfilesCarousel from "@/components/ProfilesCarousel/index";

export default {
  name: "HomeMain",
  components: { ProfilesCarousel, PeopleCarousel },
  computed: {
    containerClass() {
      return this.$ISMOBILE ? "" : "container";
    },
  },
  data() {
    return {
      webSetData: {},
      total: 0,
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
      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      list: [
        {
          icon: shouxu,
          name: "立项手续",
          dictType: "consultation_procedures",
          initKey: 109,
          contentName: "立项审批",
          contentKey: 109,
          activeIndex: 0,
          content: [
            { contentName: "立项审批", contentKey: 109, activeIndex: 0 },
            { contentName: "环境影响评价", contentKey: 110, activeIndex: 1 },
            { contentName: "社会稳定风险评价", activeIndex: 2 },
          ],
        },
        {
          icon: caikuang,
          name: "采矿许可证办理",
          dictType: "consultation_mining_license",
          initKey: 114,
          contentName: "勘探报告及专家评审",
          activeIndex: 0,
          content: [
            { contentName: "勘探报告及专家评审", activeIndex: 0 },
            { contentName: "开发利用方案及专家评审意见", activeIndex: 1 },
            { contentName: "矿山地址环境治理与土地复垦方案", activeIndex: 2 },
          ],
        },
        {
          icon: anquan,
          name: "安全生产许可证及职业卫生办理",
          dictType: "consultation_safe_production",
          initKey: 117,
          contentName: "安全预评价",
          activeIndex: 0,
          content: [
            { contentName: "安全预评价", activeIndex: 0 },
            { contentName: "安全设施设计", activeIndex: 1 },
            { contentName: "初步设计", activeIndex: 2 },
          ],
        },
        {
          icon: tudi,
          name: "土地使用手续办理",
          dictType: "consultation_landuse",
          initKey: 122,
          contentName: "林草占用批复",
          activeIndex: 0,
          content: [
            { contentName: "林草占用批复", activeIndex: 0 },
            { contentName: "土地征收", activeIndex: 1 },
            { contentName: "土地报批", activeIndex: 2 },
          ],
        },
        {
          icon: shuili,
          name: "水利审批事项",
          dictType: "consultation_water_conservancy_approval",
          initKey: 125,
          contentName: "水土保持方案",
          activeIndex: 0,
          content: [
            { contentName: "水土保持方案", activeIndex: 0 },
            { contentName: "取水许可证", activeIndex: 1 },
            { contentName: "防洪影响评价", activeIndex: 2 },
          ],
        },
        {
          icon: shigong,
          name: "施工阶段",
          dictType: "consultation_construction_stage",
          initKey: 128,
          contentName: "地形测绘",
          activeIndex: 0,
          content: [
            { contentName: "地形测绘", activeIndex: 0 },
            { contentName: "岩土工程勘查", activeIndex: 1 },
            { contentName: "施工图设计", activeIndex: 2 },
          ],
        },
        {
          icon: jungong,
          name: "竣工验收",
          dictType: "consultation_completion_acceptance",
          initKey: 132,
          contentName: "竣工验收",
          activeIndex: 0,
          content: [
            { contentName: "竣工验收", activeIndex: 0 },
            { contentName: "环保验收", activeIndex: 1 },
            { contentName: "水保验收", activeIndex: 2 },
          ],
        },
        {
          icon: qita,
          name: "其他",
          content: [],
        },
      ],
      items: [],
      news: [],
      proFiles: [],
      experts: [],
      articles: [],
    };
  },
  mounted() {
    this.getWebSet();
    this.getNewList();
    this.getExpertList();
    this.getProFileList();
    this.getArticleList();
  },
  filters: {
    //超过20位显示...
    ellipsis: function (value) {
      if (!value) return "";
      if (value.length > 18) {
        return value.slice(0, 18) + "...";
      }
      return value;
    },
    assignment: function (value) {
      this.expertImageUrl = require(value);
    },
  },
  methods: {
    ProfessorPage(row) {
      if (row === "right") {
        if (this.expertTotal > this.queryParams.pageNum * 4) {
          this.queryParams.pageNum++;
        }
      } else {
        if (!(this.queryParams.pageNum === 1)) {
          this.queryParams.pageNum--;
        }
      }
      this.getExpertList();
    },
    ProfilePage(row) {
      if (row === "right") {
        if (this.proFileTotal > this.queryProFileParams.pageNum * 4) {
          this.queryProFileParams.pageNum++;
        }
      } else {
        if (!(this.queryProFileParams.pageNum === 1)) {
          this.queryProFileParams.pageNum--;
        }
      }
      this.getProFileList();
    },
    goProfessorDetail(row) {
      this.$router.push({
        path: "/website/Detail",
        query: { navType: "专家列表", item: row },
      });
    },
    consultationMoreClick(navName, dictType, initKey, index) {
      if (index < 7) {
        this.$router.push({
          path: "/website/company",
          query: { navType: navName, dictType: dictType, initKey: initKey },
        });
      }
    },
    goForumDetail(item) {
      let param = {};
      param.articleId = item.articleId;
      setLooked(param).then((response) => {});
      this.$router.push({
        path: "/website/forumDetail",
        query: { navType: "新闻中心", item: item },
      });
    },
    goForumHome() {
      this.$router.push({ path: "/website/forumHome" });
    },
    goConsultationSecond(navName, dictType, contentName, contentKey) {
      this.$router.push({
        path: "/website/company",
        query: {
          navType: navName,
          dictType: dictType,
          contentName: contentName,
          activeIndex: contentKey,
        },
      });
    },
    getNewList() {
      listNews(this.queryParams).then((response) => {
        this.news = response.data.rows;
        this.total = response.data.total;
      });
    },
    getProFileList() {
      listNoFirst().then((response) => {
        this.proFiles = response.data.rows;
        this.proFileTotal = response.data.total;
      });
    },
    getArticleList() {
      listArticle(this.articleQueryParams).then((response) => {
        this.articles = response.data.rows;
        this.articleTotal = response.data.total;
      });
    },
    getExpertList() {
      this.loading = true;
      this.queryParams.pageSize = 4;
      listExpert().then((response) => {
          console.log('response.data.rows', response.data.rows)
        this.experts = response.data.rows;
        this.expertTotal = response.data.total;
      });
    },
    getWebSet() {
      getWebset("1").then((response) => {
        this.webSetData = response.data;
      });
    },
  },
};
</script>

<style scoped>
.firstDiv,
.secondDiv,
.forthDiv,
.fifthDiv {
  margin: 0 auto;
  width: 1280px;
  overflow: hidden;
  padding: 60px 0 0;
}
.thirdDiv {
  width: 100%;
  height: 800px;
  opacity: 1;
  background-image: url(https://img.js.design/assets/img/6499bbc30fb19817d661c625.jpg#28f9233d2432cb7520f7935eeb1d4e2a);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.div-mask {
  width: 100%;
  height:100%;
  padding: 40px 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /*background-color: rgba(0, 0, 0, 0.8);*/
  background-color: rgba(29, 38, 58, 0.8);
}
.expert-list-title {
  width:100%;
  height:120px;
  line-height: 120px;
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -1px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  vertical-align: top;
}
.title-shadow {
  height: 90px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
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
.secondDivsimg {
  position: absolute;
  right: 76px;
  top: 99px;
  width: 168px;
  height: 68px;
  background-size: cover;
  background-image: url("../../../assets/images/nmores.png");
}
.forum {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;
}

.secondDivContents {
  display: flex;
  width: 100%;
  cursor: pointer;
  height: 90px;
  background-color: rgba(5, 193, 211, 1);
  color: #ffffff;
  box-sizing: border-box;
  padding: 10px 0;
  overflow: hidden;
  align-items: center;
}
/* .secondDivContents:hover, .secondDivContents:hover .secondDivContents-title, .secondDivContents:hover .secondDivContents-content-title {
  color: #ffffff !important;
  background-color: #005393;
} */
.first {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.last {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 54px 100px 0px rgba(10, 4, 60, 0.08);
}
.evennumber {
  background: #ffffff;
  font-family: AppleSystemUIFont;
  color: #05c1d3;
}

.secondDivContents:hover .secondDivContents-title {
  border-right: 0.5px dashed #ffffff;
}
.secondDivContents .secondDivContents-title {
  display: flex;
  justify-content: space-around;
  width: 149px;
  padding: 20px 0;
  box-sizing: border-box;
  align-items: center;
  line-height: 28px;
  flex-shrink: 0;
  text-align: center;
  height: 80px;
}

.secondDivContents-content-title {
  width: 154px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  margin-left: 31px;
  margin-right: 41px;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
.secondDivContents-content-container {
  flex: 1;
  height: 56px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
.experts {
  text-align: center;
}
.expert-img {
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
.experts_card {
  text-align: center;
  background-color: rgba(249, 249, 249, 1);
}
.experts-img {
  margin: 0 0;
  height: 325px;
  width: 233px;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: border-box;
  background-size: contain;
  z-index: 0;
}
.experts-name {
  height: 40px;
  margin-top: -60px;
  padding-top: 16px;
  width: 100%;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
  background-color: rgba(0, 83, 147, 0.8);
  position: absolute;
  z-index: 2;
}
.new-img {
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
  margin-top: 80px;
  margin-bottom: 40px;
  text-align: center;
  height: 47px;
  font-size: 18px;
  font-family: AppleSystemUIFont;
  color: #262729;
  line-height: 46px;
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
  cursor: pointer;
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
  animation: mymove 1s infinite;
}

@keyframes mymove {
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
.con-box-more img {
  width: 22px;
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
.image {
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
.con-box-text-item:last-child {
  border-bottom: none;
}
.con-box-text-item-else {
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

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.forthDivContainer .el-carousel__item {
  background-color: #FFF;
}
.consultation-containers {
  padding: 0 18%;
}
.ncon-box-heads {
  /* width: 340px; */
  height: 150px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid rgba(29, 38, 58, 0.27);
}
.con-box-image-boxs {
  margin-left: 35px;
  margin-top: 36px;
  width: 30px;
  height: 30px;
}
.con-box-name {
  margin-left: 35px;
  margin-top: 9px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #262729;
  line-height: 28px;
}
.con-box-bottom {
  float: right;
  margin-right: 20px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #05c1d3;
}
  .news-center-title {
    margin: 20px 0 100px;
    text-align: center;
    height: 46px;
    font-size: 32px;
    font-family: AppleSystemUIFont;
    color: #262729;
    line-height: 46px;
  }
  .news-content-wrap {
    background: #FFF;
    width: 100%;
    height: 364px;
    display: flex;
  }
  .news-content {
    flex: 1;
    padding: 55px 177px 55px 0;
  }
  .news-image {
    width: 600px;
    height: 364px;
    -webkit-border-radius:10px;
    -moz-border-radius:10px;
    border-radius:10px;
  }
  .news-content-title {
    margin-bottom: 58px;
    width: 100%;
    height: 122px;
    font-size: 42px;
    font-family: AppleSystemUIFont;
    color: #262729;
    line-height: 61px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .news-content-text {
    height: 74px;
    font-size: 17px;
    font-family: AppleSystemUIFont;
    color: #262729;
    line-height: 25px;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .expert-list {
    margin-top: 80px;
  }
  .company-desc-title {
    margin: 20px 0 50px;
    text-align: center;
    height: 46px;
    font-size: 32px;
    font-family: AppleSystemUIFont;
    color: #262729;
    line-height: 46px;
  }
  .company-desc-wrap {
    margin-bottom: 80px;
  }
</style>
