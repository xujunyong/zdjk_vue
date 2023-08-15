<template>
  <el-container>
    <el-footer class="el-footer">
      <div class="footer">
        <el-row class="sm_blow">
          <el-col :span="4">
            <div class="blow_right" style="text-align: center;">
              <span class="blow-top">微信公众号.</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="blow_right">
              <span class="blow-top">其他</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="blow_right">
              <span class="blow-top">国家认证</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="blow_right">
              <span class="blow-top">公司信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="sm_blow" style="margin-top: 20px;">
          <el-col :span="4">
            <div class="blow_right" style="text-align: center;">
              <img :src="webSetData.qrCode" />
            </div>
          </el-col>
          <el-col :span="4">
            <div class="blow_left">
              <span class="blow-top">网站地图<br />隐私声明<br />联系我们</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="blow_left">
              <span class="blow-top">中国政府网<br />内蒙古自治区人民政府<br />内蒙古发改委<br />内蒙古能源局<br />内蒙古自然资源厅</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="blow_left">
              <span class="blow-top">主办单位：{{ webSetData.sponsor }}<br />
              联系方式：{{
                webSetData.contactInformation
              }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：{{ webSetData.address
              }}<br />
              版权所有：{{ webSetData.copyright }}<br />
              政府网站标识码：{{
                webSetData.identificationCode
              }}
              &nbsp;&nbsp;&nbsp;{{ webSetData.recordNo }}<br /></span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { getWebset } from "@/api/webset";

export default {
  name: "MainFooter",
  data() {
    return {
      webSetData: {},
    };
  },
  mounted() {
    this.getWebset();
  },
  methods: {
    iconClick() {
      this.activeIndex = "0";
      this.$router.push("/website");
    },
    getWebset() {
      getWebset("1").then((response) => {
        this.webSetData = response.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-footer {
  min-height: 300px !important;
  background: rgba(29, 38, 58, 1);
  position: relative;
  padding: 40px 0;
}

.footer {
  width: 1280px;
  margin: 0 auto;

  .link-container {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    margin-bottom: 34px;

    .el-link.is-underline:hover:after {
      display: none;
    }

    .link {
      width: 245px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      flex-shrink: 0;
      border-radius: 4px;
      background-color: rgba(0, 104, 184, 1);
      color: #ffffff;
      &:hover {
        background-color: rgba(0, 104, 184, 0.4);
        color: #bfcbd9;
      }
    }
  }
}
.sm_blow {
  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: SourcesHanSansSC-regular;
}
.blow_center {
  text-align: left;
  display: flex;
  border-color: rgba(187, 187, 187, 1);
  line-height: 34px;
}
.blow_left {
  text-align: left;
  line-height: 30px;
}
.blow_right {
  text-align: left;
  .blow-top {
    display: inline;
    font-size: 18px;
    font-weight: 400;
    color: rgba(5, 193, 211, 1);
    
  }
  img {
    width: 113px;
    height: 113px;
    display: block;
    margin: 0 auto;
    margin-bottom: 14px;
  }
}
</style>
