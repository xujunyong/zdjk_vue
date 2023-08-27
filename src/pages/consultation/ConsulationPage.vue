<template>
  <div>
    <div style="position: relative" class="consultation-container">
      <div class="coordinates">
        <div class="coordinate-right">{{ consultationLocalPageName }}</div>
      </div>
      <el-row class="consultation-containers" :gutter="30">
        <el-col
          :span="8"
          v-for="(item, index) in list"
          :key="index"
          style="margin-bottom: 24px; padding-right: 0;"
        >
          <div
            class="con-box-heads"
            v-on:click="
              consultationMoreClick(
                item.name,
                item.dictType,
                item.initKey,
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
    </div>
  </div>
</template>

<script>
// import CommonBanner from "@/pages/common/Banner";
// import CommonMain from "@/pages/common/Main";
// import IntroducePage from "./components/Introduce";
// import NewsPage from "./components/News";
import wenjianjia from "../../assets/images/wenjianjia_1.png";
import xuke from "../../assets/images/xuke.png";
import banli from "../../assets/images/banli.png";
import shenpi from "../../assets/images/shenpi.png";
import yanshou from "../../assets/images/yanshou.png";
import shouxu from "../../assets/images/shouxu.png";
import caikuang from "../../assets/images/caikuang.png";
import anquan from "../../assets/images/anquan.png";
import tudi from "../../assets/images/tudi.png";
import shuili from "../../assets/images/shuili.png";
import shigong from "../../assets/images/shigong.png";
import jungong from "../../assets/images/jungong.png";
import qita from "../../assets/images/qita.png";
import gongsijianjie from "../../assets/images/gongsijianjie.png";

export default {
  name: "CompanyPage",
  components: {
    // CommonBanner,
    // CommonMain,
    // IntroducePage,
    // NewsPage,
  },
  data() {
    return {
      imgPath: "/static/img/banner2.jpg",
      imgLabel: "全过程咨询",
      list: [
        {
          icon: shouxu,
          name: "立项手续",
          dictType: "consultation_procedures",
          initKey: 109,
          activeIndex: 0,
          content: [
            { contentName: "立项审批", contentKey: 109, activeIndex: 0 },
            { contentName: "环境影响评价", contentKey: 110, activeIndex: 1 },
            { contentName: "社会稳定风险评价", contentKey: 111 },
          ],
        },
        {
          icon: caikuang,
          name: "踩矿许可证办理",
          dictType: "consultation_mining_license",
          initKey: 114,
          activeIndex: 0,
          content: [
            { contentName: "勘探报告及专家评审", url: "" },
            { contentName: "开发利用方案及专家评审意见", url: "" },
            { contentName: "矿山地址环境治理与土地复垦方案", url: "" },
          ],
        },
        {
          icon: anquan,
          name: "安全生产许可证及职业卫生办理",
          dictType: "consultation_safe_production",
          initKey: 117,
          activeIndex: 0,
          content: [
            { contentName: "安全预评价", url: "" },
            { contentName: "安全设施设计", url: "" },
            { contentName: "初步设计", url: "" },
          ],
        },
        {
          icon: tudi,
          name: "土地使用手续办理",
          dictType: "consultation_landuse",
          initKey: 122,
          activeIndex: 0,
          content: [
            { contentName: "林草占用批复", url: "" },
            { contentName: "土地征收", url: "" },
            { contentName: "土地报批", url: "" },
          ],
        },
        {
          icon: shuili,
          name: "水利审批事项",
          dictType: "consultation_water_conservancy_approval",
          initKey: 125,
          activeIndex: 0,
          content: [
            { contentName: "水土保持方案", url: "" },
            { contentName: "取水许可证", url: "" },
            { contentName: "防洪影响评价", url: "" },
          ],
        },
        {
          icon: shigong,
          name: "施工阶段",
          dictType: "consultation_construction_stage",
          initKey: 128,
          activeIndex: 0,
          content: [
            { contentName: "地形测绘", url: "" },
            { contentName: "岩土工程勘查", url: "" },
            { contentName: "施工图设计", url: "" },
          ],
        },
        {
          icon: jungong,
          name: "竣工验收",
          dictType: "consultation_completion_acceptance",
          initKey: 132,
          activeIndex: 0,
          content: [
            { contentName: "竣工验收", url: "" },
            { contentName: "环保验收", url: "" },
            { contentName: "水保验收", url: "" },
          ],
        },
        {
          icon: qita,
          name: "其他",
          content: [],
        },
      ],
      consultationLocalPageName: "全过程咨询",
      nowPageName: "公司简介",
      activeComponentName: "IntroducePage",
      dataSource: [],
    };
  },
  methods: {
    consultationMoreClick(navName, dictType, initKey, index) {
      if (index < 7) {
        this.$router.push({
          path: "/website/company",
          query: { navType: navName, dictType: dictType, initKey: initKey, activeIndex: index },
        });
      }
    },
  },
};
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
.consultation-containers {
  padding: 0 18%;
}

.coordinates {
  text-align: center;
  font-size: 32px;
  font-family: AppleSystemUIFont;
  color: #262729;
  line-height: 23px;
  margin-top: 80px;
  margin-bottom: 40px;
}

.con-box-heads {
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
</style>
