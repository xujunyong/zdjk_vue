<template>
  <div class="company-containers" style="margin-bottom: 40px">
    <div>
      <div class="coordinates">
        {{ $route.query.navType }}
      </div>

      <common-main
        class="firstDiv"
        @clickSideMenu="handleSideClick"
        :title="imgLabel"
        :menus="sideMenus"
      >
        <div slot="content">
          <news-page
            :dataSource="consultationList"
            :total="total"
            :params="{ queryConsultationParams }"
          ></news-page>
        </div>
      </common-main>
    </div>
  </div>
</template>

<script>
// import CommonBanner from '@/pages/common/Banner'
import CommonMain from "@/pages/common/Main";
// import IntroducePage from './components/Introduce'
import NewsPage from "./components/News";
import { listData } from "@/api/dict/data";
import { listConsultation } from "@/api/consultation";

export default {
  name: "CompanyPage",
  components: {
    // CommonBanner,
    CommonMain,
    // IntroducePage,
    NewsPage,
  },
  data() {
    return {
      imgPath: "/static/img/banner2.jpg",
      imgLabel: "",
      consultationLocalPageName: "全过程咨询",
      nowPageName: "公司简介",
      contentName: "",
      total: 0,
      initKey: "",
      queryMenuParams: {
        pageNum: 1,
        pageSize: 10,
      },
      queryConsultationParams: {
        pageNum: 1,
        pageSize: 10,
      },
      sideMenusItem: {},
      sideMenus: [],
      consultationList: [],
      activeComponentName: "IntroducePage",
      dataSource: [],
    };
  },
  created() {
    this.getMenuList();
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.imgLabel = this.$route.query.navType;
      this.initKey = this.$route.query.initKey;
      if (this.$route.query.contentName) {
        this.contentName = this.$route.query.contentName;
      }
      this.getConsultationList(this.initKey);
    },
    getMenuList() {
      this.queryMenuParams.dictType = this.$route.query.dictType;
      listData(this.queryMenuParams).then((response) => {
        let arr = response.data.rows;
        for (let i = 0; i < arr.length; i++) {
          if (i === 0) {
            this.initKey = arr[i].dictCode;
          }
          this.sideMenusItem = {};
          this.sideMenusItem.key = arr[i].dictCode;
          this.sideMenusItem.label = arr[i].dictLabel;
          this.sideMenus.push(this.sideMenusItem);
        }
      });
    },
    getConsultationList(moduleId) {
      this.queryConsultationParams.moduleId = moduleId;
      listConsultation(this.queryConsultationParams).then((response) => {
        this.consultationList = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleSideClick(name) {
      this.getConsultationList(name);
    },
  },
};
</script>
<style scoped>
.company-containers {
  padding: 0 12%;
}
.coordinates {
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 22px;
  font-family: AppleSystemUIFont;
  color: #262729;
  text-align: left;
}
</style>
