<template>
  <div style="height: 100%;">
    <div class="forumDetailMain">

      <div class="forumDetailContent">
        <div class="forumDetailHeader">立项手续</div>
        <div class="forumDetailBody">
          <div class="forumDetailTitle">{{ detail.title }}</div>
          <div v-html="content" ></div>
        </div>
      </div>

      <div class="forumDetailExperts firstDiv">
        <div class="forumDetailHeader">专家列表</div>
<!--        <div style="height: auto;display: flex;justify-content:space-between; flex-wrap:wrap;margin: 20px ">-->
<!--          <div v-for="(o, index) in experts" :key="index" style="position: relative">-->
<!--            <div v-if="index ===0" style="position:absolute;margin-top: 55%;">-->
<!--              <img v-on:click ="professorPage('left')" src="../../assets/images/left.png" style="width: 40px;background-color: #cdcdcd">-->
<!--            </div>-->
<!--            <div v-if="index ===3" style=" height:40px;width:40px;position:absolute;z-index:3;margin-top: 55%;margin-left: 82%">-->
<!--              <img v-on:click ="professorPage('right')" src="../../assets/images/right.png" style="width: 40px;background-color: #cdcdcd">-->
<!--            </div>-->
<!--            <img :src="o.summaryUrl" class="forum-experts-img" v-on:click ="goProfessorDetail(o)">-->
<!--            <div class="forum-experts-name" v-on:click ="goProfessorDetail(o)">{{ o.name }}</div>-->
<!--          </div>-->
<!--        </div>-->
        <people-carousel :data="experts" />
      </div>

      <div class="forumDetailExperts firstDiv">
        <div class="forumDetailHeader">咨询列表</div>
        <el-form ref="form" :model="form" :rules="rules" style="margin: 20px;width: 95%;">
          <el-form-item prop="content">
            <el-input
              v-model="form.content"
              placeholder="发表留言"
              type="textarea"
              class="forum-textarea"
            />
          </el-form-item>
          <el-form-item>
            <el-button style="float: right; width: 110px; height: 40px; background-color: #005393;" round type="primary" @click="addCommentForm">发表</el-button>
          </el-form-item>
        </el-form>
        <div class="forum-comment-list">
          <div class="content">
            <el-row v-for="item in comments" :key="item.id" :gutter="10">
              <el-col :span="24">
                <div class="item-header">
                  <div class="item-header-left">
                    <div class="item-header-left-img"><img src="@/assets/images/logo-1.png"/></div>
                    <div class="item-header-left-content">
                      <div class="item-header-left-name"><span>{{ item.userName }}</span></div>
                      <div class="item-header-left-time"><span>{{item.createdTime}}</span></div>
                    </div>
                  </div>
                </div>
                <div v-on:click="getDetail(item)" class="item-content">{{item.content}}</div>
                <div class="item-bottom"></div>
              </el-col>
            </el-row>
            <el-pagination
              layout="prev, pager, next"
              :total="commentTotal"
              :page.sync="commentQueryParams.pageNum"
              :limit.sync="commentQueryParams.pageSize"
              :hide-on-single-page =true
              @pagination="getCommentsList" />
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import ForumHeader from '@/pages/common/ForumHeader'
import {listExpert} from "@/api/expert";
import {listComment,addComment} from "@/api/comment";
import { getToken } from '@/common/js/auth'
import cookie from 'js-cookie'
import { getUserInfo } from '@/api/user'
import PeopleCarousel from "@/components/PeopleCarousel/index.vue";

export default {
  name: 'CompanyPage',
  components: {
    PeopleCarousel,
    // ForumHeader
  },
  data () {
    return {
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        content: [
          { max: 30, message: '最多可评论30个字', trigger: 'blur' }
        ]
      },
      detail: {},
      user: {},
      content: '',
      comments: [],
      commentTotal: 0,
      commentQueryParams: {
        pageNum: 1,
        pageSize: 10
      },
      experts: [],
      expertTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 3
      }
    }
  },
  mounted (){
    this.getDetail();
    this.getExpertList();
    this.getCommentsList();
    this.init();
  },
  methods: {
    init(){
      let token = getToken();
      if(token !== undefined){
        cookie.set('token',token);
        getUserInfo().then(response => {
          this.user = response.data.data;
        });
      }
    },
    getDetail() {
      this.detail = this.$route.query.item;
      console.log(this.detail);
      this.content = this.detail.content;
    },
    addCommentForm(){
      let token = getToken();
      if(token === undefined){
        this.$router.push('/website/Login')
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.articleId = this.$route.query.item.articleId;
          this.form.userId =  this.user.userId;
          console.log(this.user);
          addComment(this.form).then(response => {
            let code = response.data.code;
            if(code === 200){
              this.$message({
                message: "发表成功",
                type: 'success'
              });
              this.getCommentsList();
            }else{
              this.$message({
                message: response.data.msg,
                type: 'error'
              });
            }

          });
        }
      });
    },
    professorPage(row){
      if(row === 'right'){
        if(this.expertTotal > (this.queryParams.pageNum*4)){
          this.queryParams.pageNum++;
        }
      }else{
        if(!(this.queryParams.pageNum === 1)){
          this.queryParams.pageNum--;
        }
      }
      this.getExpertList();

    },
    getCommentsList() {
      this.commentQueryParams.articleId = this.$route.query.item.articleId;
      listComment(this.commentQueryParams).then(response => {
        this.comments = response.data.rows;
        this.commentTotal = response.data.total;
      });
    },
    getExpertList() {
      this.queryParams.pageSize = 4;
      listExpert(this.queryParams).then(response => {
        this.experts = response.data.rows;
        this.expertTotal = response.data.total;
      });
    }
  }
}
</script>
<style lang="scss">
.forumDetailMain{
  background: rgba(247, 248, 249, 1);
  border-top:1px solid rgba(247, 248, 249, 1);;
}
.forumDetailContent{
  margin: 0 auto;
  margin-top: 20px;
  background-color: white;
  width: 1280px;
  padding: 8px 30px;
}

.forumDetailHeader{
  height: 50px;
  width: 95%;
  margin: 20px;
  color: rgba(0, 83, 147, 1);
  font-size: 24px;
  text-align: left;
  border-bottom: 1px dashed rgba(187, 187, 187, 1);
  display: flex;
  align-items: center;
  padding-bottom: 8px;

  &:before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 24px;
    background-color: #005393;
    margin-right: 10px;
  }
}
.forumDetailBody{
  margin-top: 20px;
  padding: 20px 30px;
}

.forumDetailExperts{
  margin-top: 20px;
  padding: 10px 10px;
  background-color: white;
  padding-bottom: 40px;
}

.forum-textarea textarea {
  min-height: 120px !important;
  background-color: #F7F8F9;
}

.forumDetailExpertsHeader{
  height: 50px;
  width: 100%;
  color: rgba(0, 83, 147, 1);
  font-size: 24px;
  text-align: left;
  font-family: SourceHanSansSC-bold;
  border-bottom: 1px dashed rgba(187, 187, 187, 1);
}

.forumDetailExpertsBody{
  margin-top: 20px;
  padding: 20px 30px;
}


.forumDetailTitle{
  color: rgba(16, 16, 16, 1);
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.item-header-left img{
  height: 3rem;
}

.item-header-right-img img{
  width: 24px;
  height: 24px;
}

.forum-experts-img{
  margin: 0 0;
  height: 325px;
  width: 233px;
  background-repeat: no-repeat;
  background-position: center center;
  background-origin: border-box;
  background-size: contain;
  z-index: 0;
}

.forum-experts-name{
  height: 40px;
  margin-top: -60px;
  padding-top: 16px;
  width: 100%;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
  background-color: rgba(0, 83, 147, 0.8);
  position:absolute;
  z-index: 2;
}
</style>
