<template>
    <div style="margin-top:20px">
        Sellers:
        <div v-for="(seller,idx) in staff" :key="seller">
        <div class="seller-container">
            <div style="display:flex; font-size:3rem; font-weight:bold; margin-left:20px;">{{idx + 1}}.</div>
            <div style="font-size:1.5rem">{{seller[0]}}</div> <!--login-->
            <div style="font-size:2.5rem; font-weight: bold">{{seller[3]}}</div> <!--fio-->
            <div style="font-size: 1.2rem">{{seller[1]}}</div> <!--address-->
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
  width: 700px;
  height: 250px;
  display: inline-block;
}
</style>