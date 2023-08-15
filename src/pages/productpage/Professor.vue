<template>
  <div class="professor-container">
    <div style="padding-bottom: 80px">
      <div class="coordinates">
        <div class="coordinate-right">{{ nowPageName }}</div>
      </div>
      <!-- <el-row class="consultation-containers">
        <div class="img-container">
          <div
            class="img"
            v-for="(img, imgIndex) in experts"
            :key="imgIndex"
            style="margin-bottom: 20px"
          >
            <img
              :src="img.summaryUrl"
              class="experts-img"
              @click="goProfessorDetail(img)"
              alt="专家图片"
            />
            <div class="name">
              <span>{{ img.name }}</span>
            </div>
          </div>
        </div>
      </el-row> -->
      <el-row class="consultation-containers">
        <el-col
          :span="8"
          v-for="(item, index) in experts"
          :key="index"
          style="margin-bottom: 24px"
        >
          <div class="con-box-heads" v-on:click="goProfessorDetail(item)">
            <div class="con-box-image-boxs">
              <el-image class="el-images" :src="item.summaryUrl" />
            </div>
            <div class="con-box-name">
              {{ item.name }}
            </div>
            <div class="con-box-bottom">
              田赔程？砾闻钡绞莲敬舶镜巢辈录抢团班蛄楔华能埃楼；音圈蝈馈民蒂演匝。
            </div>
            <div class="con-box-bottoms">求生员</div>
            <div class="con-box-bottoms">13123123213</div>
          </div>
        </el-col>
      </el-row>

      <el-pagination
        style="text-align: center; margin: 20px"
        background
        layout="prev, pager, next"
        v-show="total > 0"
        :total="total"
        :hide-on-single-page="true"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @current-change="handleSizeChange"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
// import CommonBanner from "@/pages/common/Banner";
// import CommonMain from "@/pages/common/Main";
// import ListPage from "./components/List";
import { listExpert } from "../../api/expert";

export default {
  name: "Professor",
  components: {
    // CommonBanner,
    // CommonMain,
    // ListPage,
  },
  data() {
    return {
      consultationLocalPageName: "首页",
      nowPageName: "专家列表",
      imgLabel: "产品与服务",
      queryParams: {
        pageNum: 1,
        pageSize: 6,
        title: null,
        createdTime: null,
      },
      total: 0,
      experts: [],
      activeComponentName: "ProductList",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      listExpert(this.queryParams).then((response) => {
        this.experts = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleSizeChange(val) {
      // 修改每页所存数据量的值所触发的函数
      this.queryParams.pageSize = val; // 修改页的大小
      this.getList(); // 按新的pageNo和pageSize进行查询
    },
    goProfessorDetail(row) {
      this.$router.push({
        path: "/website/Detail",
        query: { navType: "专家列表", item: row },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.coordinates {
  text-align: center;
  font-size: 32px;
  font-family: AppleSystemUIFont;
  color: #262729;
  line-height: 23px;
  margin-top: 80px;
  margin-bottom: 40px;
}

.consultation-containers {
  padding: 0 12%;
}
.con-box-heads {
  width: 340px;
  height: 400px;
  cursor: pointer;
  border-radius: 10px;
  background: rgba(29, 38, 58, 1);
}
.con-box-image-boxs {
  margin-left: 35px;
  margin-top: 35px;
  width: 160px;
  height: 160px;
}
.el-images {
  width: 100% !important;
  height: 100% !important;
}
.con-box-name {
  margin-left: 33px;
  margin-top: 9px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #ffffff;

}

.con-box-bottom {
  height: 100px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #ffffff;
  margin: 8px 33px;
}
.con-box-bottoms {
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #ffffff;
  margin: 8px 33px;
}
</style>
