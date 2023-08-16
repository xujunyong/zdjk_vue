<template>
  <el-container>
    <el-main class="jq-news-container">
      <el-row v-for="(item, index) in dataSource" :key="item.id">
        <div class="line" :class="{'firsts': index == 0}">
          <div class="titles">{{ item.title }}</div>
          <div class="time">
            {{ item.createdTime }} >>
          </div>
        </div>
      </el-row>
      <!-- <el-pagination
        style="text-align: center;margin: 20px"
        background
        layout="prev, pager, next"
        :hide-on-single-page= true
        :total="total"
        :page.sync="params.pageNum"
        :limit.sync="params.pageSize"
        @pagination="dataSource"/> -->
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "NewsPage",
  props: {
    dataSource: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    params: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.jq-news-container {
  color: #333333;
  font-size: 16px;
  padding: 0;
}
.jq-news-container .line {
  display: flex;
  height: 26px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #333333;
  line-height: 18px;
  margin-top: 18px;
  border-bottom: 1px solid rgba(233, 236, 240, 1);
}
.firsts {
  margin-top: 26px;
}
.titles {
  flex: 1;
}
.jq-news-container .line:hover {
  color: rgba(0, 83, 147, 1);
  cursor: pointer;
}
.jq-news-container .line:hover .time {
  color: rgba(0, 83, 147, 1) !important;
}
</style>
