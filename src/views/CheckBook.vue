<template>
   <div class="check-comments">
    <input type="text" placeholder="Address of a store">
  </div>
  <button>Check</button>
  <div class="store-content">
  {{storeComments}}
  </div>
</template>
<script>
export default{
  name: "CheckBook",
  computed:{
    storeComments () {
      return "info"
    }
  }
}
</script>
<style scoped>
input{
  font-size: 1.5rem;
  margin:1rem;
  background-color: #CCCCFF;
  width: 580px;
  height: 50px;
}
input::placeholder{
  color: gray;
}
button{
  font-size:2rem;
  width:140px;
  height:70px;
  margin-top:1rem;
  background-color: #CCCCFF;
}
button:hover{
  cursor:pointer;
  background-color:#9999FF;
}
.store-content{
  margin:30px;
  font-size:2rem;
}
</style>
