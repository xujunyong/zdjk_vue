<template>
  <div class="forum-container">

    <div class="card-content-item" v-for="item in articles" :key="item.id">
      <div class="card-content-head">
        <div class="card-head-image"><img class="card-head-image" src="@/assets/images/logo-1.png"/></div>
        <div class="card-head-content">
          <div class="card-head-name">
            <span>{{ item.author }}</span>
            <img class="menu-item-icon" src="../../assets/images/rebang.png" alt="">
          </div>
          <div class="card-head-time"><span>{{item.createdTime}}</span></div>
        </div>
        <div class="card-head-right">
          <img class="card-head-right-img" src="@/assets/images/viewing.png"/>
          <div class="card-head-right-text">{{item.lookedNum}}</div>
          <img class="card-head-right-img" src="@/assets/images/comment.png"/>
          <div class="card-head-right-text">{{item.commentNum}}</div>
        </div>
      </div>
      <div class="card-content-title" @click="getDetail(item)">{{item.title}}</div>
      <div class="card-content-text" @click="getDetail(item)">{{item.digest}}</div>
    </div>
    <el-pagination
      layout="prev, pager, next"
      background
      :total="articleTotal"
      :page.sync="articleQueryParams.pageNum"
      :limit.sync="articleQueryParams.pageSize"
      @current-change ="getArticleListPage"
      @pagination="getArticleList">
    </el-pagination>
  </div>
</template>

<script>
import {listArticle,setLooked} from "@/api/article";

export default {
  name: 'CompanyPage',
  components: {
  },
  data () {
    return {
      articles: [],
      articleTotal: 0,
      articleQueryParams: {
        pageNum: 1,
        pageSize: 10
      },
      state: '',
    }
  },
  mounted (){
    this.getArticleList();
  },
  methods: {
    handleIconClick () {
      console.log(1)
    },
    iconClick () {
      this.activeIndex = '0'
      this.$router.push('/website/forumDetail')
    },
    getArticleList() {
      listArticle(this.articleQueryParams).then(response => {
        this.articles = response.data.rows;
        this.articleTotal = response.data.total;
      });
    },
    getArticleListPage(val){
      this.articleQueryParams.pageNum = val;
       this.getArticleList();
    },
    getDetail(item){
      let param = {};
      param.articleId = item.articleId;
      setLooked(param).then(response => {
      });
      this.$router.push({path:"/website/forumDetail",query:{navType: '新闻中心',item: item}});
    }
  }
}
</script>
<style lang="scss">
  .forum-title {
    margin: 80px 0 45px;
    text-align: center;
    height: 47px;
    font-size: 32px;
    font-family: AppleSystemUIFont;
    color: #262729;
    line-height: 46px;
  }
.forum-container{
  width: 100%;
  padding: 0 18%;
  margin-bottom: 100px;
  box-sizing: border-box;
  background: #FFF;
}
.forum-list-wrap {
  display: flex;
  margin-bottom: 35px;
}
.forum-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
}
.menu-item-name {
  height: 20px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #000;
  line-height: 20px;
}
  .menu-item-name.active {
    color: #05C1D3;
  }
.menu-item-icon {
  width:18px;
  height:18px;
  margin-left: 2px;
}
.card-content-item {
  width: 100%;
  height: 227px;
  padding: 24px;
  background: #F7F8F9;
  border-radius: 12px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.card-content-head {
  position: relative;
  display: flex;
}
.card-head-content {
  margin-left: 18px;
}
.card-head-name {
  display: flex;
  align-items: center;
  height: 24px;
  font-size: 18px;
  font-family: AppleSystemUIFont;
  color: #000000;
  line-height: 24px;
}
.card-head-time {
  margin-top: 3px;
  height: 20px;
  font-size: 14px;
  font-family: AppleSystemUIFont;
  color: #999999;
  line-height: 20px;
}
.card-head-image {
  width: 48px;
  height:48px;
}
.card-head-right {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
}
.card-head-right-img {
  width: 18px;
  height: 16px;
  margin-left: 22px;
}
.card-head-right-text {
  height: 20px;
  font-size: 14px;
  font-family: AppleSystemUIFont;
  color: #000000;
  line-height: 20px;
  margin-left: 4px;
}
.card-content-title {
  margin: 26px 0 11px;
  height: 22px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #000000;
  line-height: 22px;
}
.card-content-text {
  width: 100%;
  height: 74px;
  font-size: 15px;
  font-family: AppleSystemUIFont;
  color: #666666;
  line-height: 18px;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.forumMain{
  width: 1280px;
  margin: 0 auto;
  border-top:1px solid rgba(247, 248, 249, 1);
}
.forumNav{
  min-height: 45px;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 1);
  height: 70px;
  display: flex;
  align-items: center;
}
.nav-tag{
  margin-left: 10px;
  background-color: rgba(211, 211, 211, 0.4);
  color: rgba(65, 65, 65, 1);
  font-size: 16px;
  border:none;
  cursor: pointer;
}
.nav-is-active {
  background-color: #005393;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  border:none;
  cursor: pointer;
}
.forumContent{
  /*margin-left: 320px;*/
  /*margin-right: 320px;*/
}
.content{
  width: 100%;
  display: inline-block;
  background: #FFFFFF ;
  padding: 20px 0;
}
.item-header{
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-header-left{
  margin-left: 27px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
}
.item-header-left-content{
  margin-left: 10px;
}
.item-header-left-name{
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  text-align: left;
  margin-bottom: 8px;
}
.item-header-left-time{
  color: rgba(171, 171, 171, 1);
  font-size: 14px;
  text-align: left;
}
.item-header-left img{
  height: 3rem;
}
.item-header-right{
  font-size: 16px;
  float: right;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 10px;
}
.item-header-right-img{
  /*display: inline-block;*/
}
.item-header-right-img img{
  width: 24px;
  height: 24px;
  filter:opacity(0.3);
}
.item-header-right-text{
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
}
.item-title{
  margin: 20px 27px;
  color: rgba(16, 16, 16, 1);
  font-size: 22px;
  text-align: left;
}
.item-content{
  margin: 20px 27px;
  padding: 21px;
  min-height: 78px;
  background: #F7F8F9;
  line-height: 30px;
  letter-spacing: 1px;
}
.item-bottom{
  margin: 20px 27px;
  border-bottom: 1px dashed rgba(187, 187, 187, 1);
}
.QR_code{
  padding: 0;
}
.QR_code img{
  margin: 0;
  width: 100%;
}

.el-pagination{
  text-align: center;
  margin-bottom: 10px;
}
</style>
