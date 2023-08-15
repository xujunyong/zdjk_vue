<template>
  <div>
    <div style="padding: 0 10%">
      <div class="coordinates">
        <div class="coordinate-right">{{ $route.query.navType }}</div>
      </div>
      <el-row class="forthDiv padding-10">
        <el-row :gutter="24">
          <el-col :span="8" v-for="(item, index) in news" :key="index"  >
            <el-card :body-style="{ padding: '0px' }" >
              <img :src="item.summaryUrl"
                   style="width: 100%;display: block">
              <div style="padding: 14px;">
                <span style="line-height: 30px;font-size: 20px">{{item.title}}</span>
                <div style="line-height: 20px;font-size: 16px" class="newsLine">{{item.summary | ellipsis}}
                </div>
                <div class="bottom" style="overflow: hidden;height: 28px;">
                  <span style="float: left; color: #797979;">{{ item.createdTime }}</span>
                  <span style="float: right;color: #005393; cursor: pointer;" v-on:click ="goDetail(item)">更多>></span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>

      <el-pagination
        style="text-align: center;margin: 20px"
        background
        layout="prev, pager, next"
        v-show="total>0"
        :total="total"
        :hide-on-single-page =true
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @current-change="handleSizeChange"
        @pagination="getList"/>
    </div>

  </div>
</template>

<script>
// import CommonBanner from '@/pages/common/Banner'
import { listNews } from "@/api/news";

export default {
  name: 'CompanyPage',
  components: {
    // CommonBanner,
  },
  data () {
    return {
      loading: true,
      imgLabel: '新闻中心',
      total:0,
      queryParams: {
        pageNum: 1,
        pageSize: 6,
        title: null,
        createdTime: null,
      },
      news:[],
      imgPath: '',
      ionLocalPageName: '首页',
      nowPageName: '',
      activeComponentName: 'News',
      dataSource: []
    }
  },
  mounted (){
    this.getList();
  },
  filters: {
    //超过20位显示...
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 18) {
        return value.slice(0, 18) + "...";
      }
      return value;
    }
  },
  methods: {
    getList() {
      this.loading = true;
      listNews(this.queryParams).then(response => {
        this.news = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    handleSizeChange(val) { // 修改每页所存数据量的值所触发的函数
      this.queryParams.pageSize = val;   // 修改页的大小
      this.getList();       // 按新的pageNo和pageSize进行查询
    },
    handleSideClick (name) {
      this.activeComponentName = name
      if (name === 'NewsPage') {
        this.nowPageName = '公司新闻'
        this.dataSource = []
      } else if (name === 'SituationPage') {
        this.nowPageName = '行业动态'
        this.dataSource = []
      } else {
        this.dataSource = []
      }
    },
    goDetail (row){
      this.$router.push({path:"/website/Detail",query:{navType: '新闻中心',item: row}})
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
.padding-10 {
  padding: 10px 0 40px 0;
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

</style>
