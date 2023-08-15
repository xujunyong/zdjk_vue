<template>
  <el-container>
    <div class="box">
      <div id="box1"></div>
      <div id="box2">
        <div id="father">
          <div id="son">

          </div>
        </div>
      </div>
      <div id="box3"></div>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'IntroducePage'
}
</script>

<style scoped>
.img-box img {
  width: 100%;
}
.el-main p {
  line-height: 1.5;
  font-size: 1rem;
}
.box{
  width: 1000px;
  height: 1000px;
  background: aqua;
}
 div{
   width: 200px;
   height: 200px;
 }
 #box1{
   background: red;
 }
 #box2{
  width: 500px;
   height: 500px;
   background: green;
 }
 #box3{
   background: blue;
 }
#father{
  background: #ffcc00;
  width: 300px;
  height: 300px;
  position: absolute;
}
#son{
  background: antiquewhite;
  width: 100px;
  height: 100px;
  position: absolute;
  top:10px;
  left:10px;
}
</style>
