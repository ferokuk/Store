<template>
  <div style="margin-top:20px">
    Sellers:
    <div v-for="(seller,idx) in staff" :key="seller">
    <div class="seller-container">
      <div class="idx">{{idx + 1}}.</div>
      <div style="font-size:1rem">{{seller[0]}}</div> <!--login-->
      <div style="font-size:2rem; font-weight: bold">{{seller[3]}}</div> <!--fio-->
      <div style="font-size: 1rem">{{seller[1]}}</div> <!--address-->
    </div>
    </div>
  </div>
</template>

<script>
export default { 
  props:{
    staff:{
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.seller-container{
  border: 1px solid;
  background-color: #cfcfff;
  width: 500px;
  height: 150px;
  display: inline-block;
  margin: 5px;
}
.idx{
  display:flex; 
  font-size:3rem; 
  font-weight:bold;
  margin-left:20px;
}
</style>