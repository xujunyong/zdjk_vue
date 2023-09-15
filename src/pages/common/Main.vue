<template>
  <el-container :class="className">
    <el-row style="width: 100%;">
      <el-col :span="6" style="margin-right: 30px;">
        <el-menu
          @select="handleSelect"
          active-text-color="#005393"
          :default-active= activeIndex.toString()
          class="side-menu"
          >
          <el-menu-item v-for="(menu, index) in menus" :key="menu.id" :index="index.toString()">
            <img v-if="activeIndex == index" class="side-menu-img" src="../../assets/images/aqypgy.png" />
            <img v-else class="side-menu-img" src="../../assets/images/aqypgn.png" />
            <div class="side-menu-lebel">{{menu.label}}</div>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="17">
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
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      activeIndex: 0,
      contentTitle: ""
    }
  },
  mounted (){
    this.init();
  },
  created () {
    // this.init();
  },
  methods: {
    init(){
      this.activeIndex = 0;
      this.contentTitle = this.$route.query.contentName;
    },
    handleSelect (val) {
      this.activeIndex = val.toString()
      console.log(this.menus[val])
      this.contentTitle = this.menus[val].label;
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
      console.log('menus', this.menus)
      const index = this.activeIndex;
      const dict = this.menus[index] || {}
      const { label = ''} = dict
      return label;
    },
    className () {
      return this.$ISMOBILE ? 'mobile-container' : ''
    }
  }
}
</script>

<style scoped>
.side-menu >>> li {
  display: flex;
  height: 57px !important;
  align-items: center;
  padding: 0 !important;
  margin: 0 !important;
  line-height: 57px !important;
  text-align: left !important;
  border-radius: 10px !important;
  /* background: #ffffff; */
}
.side-menu >>> .is-active {
  background: rgba(5, 193, 211, 1);
  color: #fff !important;
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
  font-size: 20px;
  font-family: SourceHanSansSC-regular;
  width: 262px;
  margin: 0;
}
.side-menu-img {
  display: flex;
  margin-left: 15px;
  margin-right: 14px;
  height: 24px;
  width: 24px;
}
.side-menu-lebel{
  display: flex;
  /* font-size: 18px; */
  font-family: SourceHanSansSC-regular;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 20px;
  font-size: 16px;
  font-family: AppleSystemUIFont;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
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
.box-card {
  font-size: 18px;
  background: rgba(249, 250, 251, 1);
  border-radius: 10px;
  padding: 19px 41px 31px 49px;
}
.content-title {
  height: 22px;
  font-size: 18px;
  font-family: AppleSystemUIFont;
  color: #000000;
  line-height: 22px;
}
.jq-content {
  color: #333333;
  font-size: 16px;
}
</style>
