<template>
  <div class="forum-container">
<!--    <ForumHeader :currentPath="currentPath"/>-->
    <div class="forumMain">
        <div class="forumNav">
          <el-tag class="nav-tag nav-is-active">全部</el-tag>
          <el-tag class="nav-tag">立项手续</el-tag>
          <el-tag class="nav-tag">采矿许可证办理</el-tag>
          <el-tag class="nav-tag">安全生产许可证几职业卫生办理</el-tag>
          <el-tag class="nav-tag">土地使用手续办理</el-tag>
          <el-tag class="nav-tag">水利审批事项</el-tag>
          <el-tag class="nav-tag">施工阶段</el-tag>
          <el-tag class="nav-tag">竣工验收</el-tag>
        </div>
        <div class="forumContent">
          <el-row>
            <el-col :span="19">
              <div class="content">
                <el-row v-for="item in articles" :key="item.id" :gutter="10">
                  <el-col :span="24">
                    <div class="item-header">
                      <div class="item-header-left">
                        <div class="item-header-left-img"><img src="@/assets/images/logo-1.png"/></div>
                        <div class="item-header-left-content">
                          <div class="item-header-left-name"><span>{{ item.author }}</span></div>
                          <div class="item-header-left-time"><span>{{item.createdTime}}</span></div>
                        </div>
                      </div>
                      <div class="item-header-right">
                        <div class="item-header-right-img"><img src="@/assets/images/viewing.png"/></div>
                        <div class="item-header-right-text">{{item.lookedNum}}</div>
                        <div class="item-header-right-img"><img src="@/assets/images/comment.png"/></div>
                        <div class="item-header-right-text">{{item.commentNum}}</div>
                      </div>
                    </div>
                    <div v-on:click="getDetail(item)" class="item-title">{{item.title}}</div>
                    <div v-on:click="getDetail(item)" class="item-content">{{item.digest}}</div>
                    <div class="item-bottom"></div>
                  </el-col>
                </el-row>
                <el-pagination
                  layout="prev, pager, next"
                  :total="articleTotal"
                  :page.sync="articleQueryParams.pageNum"
                  :limit.sync="articleQueryParams.pageSize"
                  @current-change ="getArticleListPage"
                  @pagination="getArticleList" />
              </div>
            </el-col>
            <el-col class="QR_code" :span="4" :offset="1" style="align-items: center">
              <img  src="@/assets/images/qr_code.png" alt="qr_code">
            </el-col>
          </el-row>

        </div>
    </div>
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
      }
    }
  },
  mounted (){
    this.getArticleList();
  },
  methods: {
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
.forum-container{
  background: rgba(247, 248, 249, 1);
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
