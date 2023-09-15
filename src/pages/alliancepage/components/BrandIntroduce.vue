<template>
  <div class="content-class">
    <div class="item-class">
      <div style="text-align: center;">中地全过程咨询论坛</div>
      <div class="consultation-forum">
        <div v-for="(item,index) in 6" :key="index" class="list">
          <div class="title">水务咨询</div>
          <div class="content">
            阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰
          </div>
          <div class="time">2023-09-09</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>

.consultation-forum {
  margin-top: 20px;
}

.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.list:first-child{
  border-radius: 20px 20px 0 0;
}
.list:nth-child(odd){
  background: #0bbdbe;
  color: #fff;
}
.list:nth-child(even){
  background: #fff;
  color: #0bbdbe;
}
.list:last-child{
  border-radius: 0 0 20px 20px;
}

.list>.title {
  width: 15%;

}

.list>.content {
  width: 65%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.list>time {
  width: 25%;
}
.content-class{
  display: flex;
  justify-content: center;
  background: #f1f1f1;
  height: 100vh;
}
.item-class{
  width: 1300px;
  min-width: 1300px;
  min-width: 800px;
}
</style>
