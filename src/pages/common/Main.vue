<template>
  <el-container :class="className">
    <el-row style="width: 100%;">
      <el-col :span="6">
        <h3 class="side-menu-title">
          {{title}}
        </h3>
        <el-menu
          @select="handleSelect"
          active-text-color="#005393"
          :default-active= this.activeIndex.toString()
          class="side-menu"
          >
          <el-menu-item style="text-align: center; margin: 10px 0; font-size: 20px; color: #101010; background-color: rgba(249, 249, 249, 1);width: 262px; height: 80px; line-height: 80px;" v-for="(menu, index) in menus" :key="menu.id" :index="index.toString()">
              <span class="side-menu-lebel">{{menu.label}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <div class="box-card">
          <div slot="header" >
            <strong class="content-title">{{contentTitle}}</strong>
          </div>
          <div class="jq-content">
            <slot name="content"></slot>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { listConsultation } from "@/api/consultation";
export default {
  name: 'CommonMain',
  props: {
    title: {
      type: String,
      required: true
    },
    menus: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  mounted (){
    this.init();
  },
  created () {
    this.init();
  },
  methods: {
    init(){
      this.activeIndex = this.$route.query.activeIndex;
    },
    handleSelect (val) {
      this.activeIndex = val.toString()
      this.$emit('clickSideMenu', this.menus[val].key)
    },
    getList(){
      listConsultation().then(response => {
        this.news = response.data.rows;
        this.total = response.data.total;
      });
    },
  },
  computed: {
    contentTitle () {
      let index = this.activeIndex;
      let label = this.menus[index].label
      return label;
    },
    className () {
      return this.$ISMOBILE ? 'mobile-container' : ''
    }
  }
}
</script>

<style scoped>
.content-title{
  color: rgba(0, 83, 147, 1);
  font-size: 28px;
  text-align: left;
  font-family: SourceHanSansSC-medium;
  border-bottom: 1px solid #eeeeee;
  display: block;
  padding-bottom: 20px;
}
.side-menu li {
  border-bottom: 1px solid #fff;
}
.side-menu-title {
  width: 262px;
  height: 100px;
  line-height: 100px;
  color: rgba(255, 255, 255, 1);
  font-size: 28px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
  background-color: rgba(0, 83, 147, 1);
  margin: 0;
}
.side-menu{
  line-height: 20px;
  /*color: rgba(0, 83, 147, 1);*/
  font-size: 20px;
  /*text-align: center;*/
  font-family: SourceHanSansSC-regular;
  width: 262px;
  margin: 0;
}
.side-menu-lebel{
  font-size: 18px;
  font-family: SourceHanSansSC-regular;
  /*max-width: 100%;*/
  /*display: inline-block;*/
  /*text-overflow: ellipsis;*/
  /*overflow: hidden;*/
}
.side-menu-title>i {
  font-size: 1.5rem;
}
.el-menu {
  border: none;
}
.el-menu-item>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card__header {
  padding: 1.7rem 2rem;
}
.box-card strong {
  color: rgba(0, 83, 147, 1);
  font-size: 28px;
  text-align: left;
  font-family: SourceHanSansSC-medium;
}
.jq-content {
  padding: 20px 0;
  font-size: 18px;
  color: #101010;
}
</style>
