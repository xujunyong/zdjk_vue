<template>
  <el-container>
    <el-main class="jq-news-container">
      <el-row v-for="item in dataSource" :key="item.id">
        <div class="line">
          <span style="font-weight: bold;">{{item.title}}</span>
          <span class="time" style="color: #ABABAB; font-size: 18px;margin-left: auto;">{{item.createdTime}}</span>
        </div>
      </el-row>
      <el-pagination
        style="text-align: center;margin: 20px"
        background
        layout="prev, pager, next"
        :hide-on-single-page= true
        :total="total"
        :page.sync="params.pageNum"
        :limit.sync="params.pageSize"
        @pagination="dataSource"/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'NewsPage',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true

    },
    params: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.jq-news-container {
  color: #101010;
  font-size: 20px;
  padding: 0;
}
.jq-news-container .line {
  display: flex;
  margin: 26px 0;
  flex-wrap: wrap;
  line-height: 28px;
}
.jq-news-container .line:hover {
  color: rgba(0, 83, 147, 1);
  cursor: pointer;
}
.jq-news-container .line:hover .time {
  color: rgba(0, 83, 147, 1) !important;
}
</style>
