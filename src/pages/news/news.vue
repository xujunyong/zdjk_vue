<template>
  <div>
    <div style="padding: 0 18%">
      <div class="coordinates-new">
        <div class="coordinate-right">{{ $route.query.navType }}</div>
      </div>
      <el-row class="forthDiv">
        <el-row :gutter="24">
          <el-col
            :span="8"
            v-for="(item, index) in news"
            :key="index"
            style="margin-bottom: 20px"
          >
            <el-card class="forthDiv-card" :body-style="{ padding: '0px' }">
              <div @click="goDetail(item)" style="cursor: pointer">
                <div class="card-img">
                  <img :src="item.summaryUrl" />
                </div>
                <div class="card-title">
                  {{ item.title }}
                </div>
                <div class="card-content">{{ item.summary | ellipsis }}</div>
                <div class="card-bottom">
                  {{ item.createdTime }}
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>

      <el-pagination
        style="text-align: center; margin: 20px"
        background
        layout="prev, pager, next"
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @current-change="handleSizeChange"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
// import CommonBanner from '@/pages/common/Banner'
import { listNews } from "@/api/news";

export default {
  name: "CompanyPage",
  components: {
    // CommonBanner,
  },
  data() {
    return {
      loading: true,
      imgLabel: "新闻中心",
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 6,
        title: null,
        createdTime: null,
      },
      news: [],
      imgPath: "",
      ionLocalPageName: "首页",
      nowPageName: "",
      activeComponentName: "News",
      dataSource: [],
    };
  },
  mounted() {
    this.getList();
  },
  filters: {
    //超过20位显示...
    ellipsis: function (value) {
      if (!value) return "";
      // if (value.length > 18) {
      //   return value.slice(0, 18) + "...";
      // }
      return value;
    },
  },
  methods: {
    getList() {
      this.loading = true;
      listNews(this.queryParams).then((response = {}) => {
        console.log("response", response);
        const { data = {} } = response;
        const { rows = [], total = 0 } = data;
        this.news = rows;
        this.total = total;
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      console.log("val", val);
      // 修改每页所存数据量的值所触发的函数
      this.queryParams.pageSize = val; // 修改页的大小
      this.getList(); // 按新的pageNo和pageSize进行查询
    },
    handleSideClick(name) {
      this.activeComponentName = name;
      if (name === "NewsPage") {
        this.nowPageName = "公司新闻";
        this.dataSource = [];
      } else if (name === "SituationPage") {
        this.nowPageName = "行业动态";
        this.dataSource = [];
      } else {
        this.dataSource = [];
      }
    },
    goDetail(row) {
      this.$router.push({
        path: "/website/Detail",
        query: { navType: "新闻中心", item: row },
      });
    },
  },
};
</script>
<style scoped>
.coordinates-new {
  text-align: center;
  font-size: 32px;
  font-family: AppleSystemUIFont;
  color: #262729;
  padding-top: 80px;
  margin-bottom: 40px;
}

.forthDiv-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888888 !important;
}

.card-img {
  width: 100%;
}
.card-img img {
  width: 100%;
  border-radius: 10px;
}

.card-title {
  padding: 10px 15px;
  font-size: 18px;
  font-family: AppleSystemUIFont;
  color: #262729;
}

.card-content {
  padding: 0 15px;
  color: lightgray;
  height: 44px;
  line-height: 22px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-bottom {
  padding: 10px 15px 15px 15px;
}
</style>
