<template>
  <div class="forum-detail-wrap">
    <div class="forumDetailMain">

      <div class="forumDetailContent">
        <div class="detail-content-head">
          <div class="detail-head-image"><img class="detail-head-image" src="@/assets/images/logo-1.png"/></div>
          <div class="detail-head-content">
            <div class="detail-head-name">
              <span>{{ detail.author }}</span>
              <img class="detail-item-icon" src="../../assets/images/rebang.png" alt="">
            </div>
            <div class="detail-head-time"><span>{{detail.createdTime}}</span></div>
          </div>
          <div class="detail-head-right">
            <img class="detail-head-right-img" src="@/assets/images/viewing.png"/>
            <div class="detail-head-right-text">{{detail.lookedNum}}</div>
            <img class="detail-head-right-img" src="@/assets/images/comment.png"/>
            <div class="detail-head-right-text">{{detail.commentNum}}</div>
          </div>
        </div>
        <div class="detail-content-title">
          {{detail.title}}
          <img class="detail-item-icon" src="../../assets/images/rebang.png" alt="">
        </div>
        <div class="detail-content-text" v-html="content"></div>
        <div class="detail-time-wrap">
          2023-03-12  10:23
          <span class="open-answer" @click="getCommentsList">展开回复</span>
        </div>
        <div class="detail-answer-wrap">
          <div class="detail-answer-item" v-for="item in comments" :key="item.id">
            <img class="answer-item-image" src="@/assets/images/logo-1.png" alt="">
            <div class="answer-item-right">
              <div class="answer-item-right-content">
                <div class="answer-item-name">
                  <span class="name-color">{{ item.userName }}</span>
                  回复
                  <span class="name-color">{{ item.userName }}：</span>
                </div>
                <div class="answer-item-content">{{item.content}}</div>
              </div>
              <div class="answer-item-time">
                {{item.createdTime}}
                <span class="answer-item-answer">回复</span>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-my-answer">
          <el-input
            v-model="form.content"
            placeholder="发表留言"
            type="textarea"
            class="forum-textarea"
          />
          <div class="my-answer-btn-wrap">
            <el-button round type="primary" size="small" @click="addCommentForm">发表</el-button>
          </div>
        </div>
      </div>

      <div class="forumDetailExperts firstDiv">
        <div class="forumDetailHeader">专家列表</div>
        <people-carousel :data="experts" />
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
.forumDetailContent{
  width: 100%;
  border-radius: 12px;
  background: rgba(247, 248, 249, 1);
  padding: 24px;
  box-sizing: border-box;
}

.forumDetailHeader{
  margin-bottom: 15px;
  height: 27px;
  font-size:18px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 27px;
  color: rgba(0, 0, 0, 1);
  text-align: left;
}
.forumDetailBody{
  margin-top: 20px;
  padding: 20px 30px;
}

.forumDetailExperts{
  margin-top: 12px;
  width: 100%;
  opacity: 1;
  border-radius: 12px;
  background: rgba(247, 248, 249, 1);
  padding: 24px 30px 0;
  margin-bottom: 40px;
  box-sizing: border-box;
}

.forum-textarea textarea {
  min-height: 104px !important;
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
  .forum-detail-wrap {
    padding: 0 18%;
    background-color: #FFF;
  }
.detail-content-head {
  position: relative;
  display: flex;
}
.detail-head-content {
  margin-left: 18px;
}
.detail-head-name {
  display: flex;
  align-items: center;
  height: 24px;
  font-size: 18px;
  font-family: AppleSystemUIFont;
  color: #000000;
  line-height: 24px;
}
.detail-head-time {
  margin-top: 3px;
  height: 20px;
  font-size: 14px;
  font-family: AppleSystemUIFont;
  color: #999999;
  line-height: 20px;
}
.detail-head-image {
  width: 48px;
  height:48px;
}
.detail-head-right {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
}
.detail-head-right-img {
  width: 18px;
  height: 16px;
  margin-left: 22px;
}
.detail-head-right-text {
  height: 20px;
  font-size: 14px;
  font-family: AppleSystemUIFont;
  color: #000000;
  line-height: 20px;
  margin-left: 4px;
}
.detail-content-title {
  margin: 26px 0 11px;
  height: 22px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  color: #000000;
  line-height: 22px;
  font-weight:bold;
}
.detail-content-text {
  width: 100%;
  font-size: 15px;
  font-family: AppleSystemUIFont;
  color: #666666;
  line-height: 18px;
}
.detail-item-icon {
  width:18px;
  height:18px;
  margin-left: 2px;
}
  .detail-time-wrap {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
    color: rgba(102, 102, 102, 1);
    text-align: right;
  }
  .detail-time-wrap .open-answer {
    cursor: pointer;
    margin-left: 12px;
    color: rgba(0, 94, 255, 1);
  }
  .detail-answer-wrap {
    padding: 18px 28px 20px 23px;
    margin: 20px 0 12px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
  }
  .detail-answer-item {
    display: flex;
    margin-bottom: 18px;
  }
  .detail-answer-item:last-child {
    margin-bottom: 0;
  }
  .answer-item-image {
    width: 36px;
    height: 36px;
  }
  .answer-item-right {
    margin-left: 18px;
    flex: 1;
  }
  .answer-item-right-content {
    display: flex;
  }
  .answer-item-name {
    height: 25px;
    font-size: 18px;
    font-family: AppleSystemUIFont;
    color: rgba(17, 17, 26, 1);
    line-height: 25px;
  }
  .answer-item-name .name-color {
    color: #005EFF;
  }
  .answer-item-content {
    text-align: left;
    margin-left: 4px;
    flex: 1;
    font-size: 18px;
    font-family: AppleSystemUIFont;
    color: #101018;
    line-height: 25px;
  }
  .answer-item-time {
    margin-top: 5px;
    text-align: right;
  }
  .answer-item-time .answer-item-answer {
    color: rgba(0, 94, 255, 1)
  }
  .detail-my-answer {
    width: 100%;
    height: 154px;
    opacity: 1;
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
  }
  .my-answer-btn-wrap {
    text-align: right;
    margin-top: 10px;
  }
</style>
