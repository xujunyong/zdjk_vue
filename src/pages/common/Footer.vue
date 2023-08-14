<template>
  <el-container>
    <el-footer class="el-footer">
      <div class="footer">
        <el-row class="link-container">
          <el-link class="link">中国政府网</el-link>
          <el-link class="link">内蒙古自治区人民政府</el-link>
          <el-link class="link">内蒙古发改委</el-link>
          <el-link class="link">内蒙古能源局</el-link>
          <el-link class="link">内蒙古自然资源厅</el-link>
          <!--<el-link class="link">信息链接</el-link>-->
        </el-row>
        <el-row class="sm_blow" >
          <el-col :span="5">
            <div class="blow_left" >网站地图<br/>隐私声明<br/>联系我们</div>
          </el-col>
          <el-col :span="14">
            <div class="blow_center">主办单位：{{ webSetData.sponsor }}<br/>
            联系方式：{{webSetData.contactInformation}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：{{webSetData.address}}<br/>
            版权所有：{{webSetData.copyright}}<br/>
            政府网站标识码：{{webSetData.identificationCode}} &nbsp;&nbsp;&nbsp;{{webSetData.recordNo}}<br/>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="blow_right">
              <img :src=webSetData.qrCode>
              <span>微信公众号</span>
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
  name: 'MainFooter',
  data() {
    return {
      webSetData: {}
    }
  },
  mounted (){
    this.getWebset()
  },
  methods:{
    iconClick() {
      this.activeIndex = '0';
      this.$router.push('/website');
    },
    getWebset(){
      getWebset("1").then(response => {
        this.webSetData = response.data.data;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-footer{
    min-height: 300px !important;
    background-color: rgba(0, 83, 147, 1);
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
  .sm_blow{
    display:flex;
    justify-content:center;/*主轴上居中*/
    align-items:center;/*侧轴上居中*/
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    /*text-align: left;*/
    font-family: SourcesHanSansSC-regular;
  }
  .blow_center{
    /*padding-left: 40px;*/
    /*padding-right: 40px;*/
    text-align: left;
    display:flex;
    justify-content:center;
    align-items:center;
    border-right:1px solid;
    border-left:1px solid;
    border-color:  rgba(187, 187, 187, 1);
    line-height: 34px;
  }
  .blow_left{
    text-align: center;
    line-height: 30px;
    /*margin-right: 40px;*/
    /*margin-top: 10px;*/
  }
  .blow_right{
    text-align: center;

    img{
      width: 113px;
      height: 113px;
      display: block;
      margin: 0 auto;
      margin-bottom: 14px;
    }
  }

</style>
