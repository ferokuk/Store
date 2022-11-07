<template>
  <div v-if="allSellers.length === 0" class="content-empty">
      No sellers at the moment
  </div>
  <div v-else>
    <div v-for="(seller,index) in allSellers" :key="seller" class="content">
      <div style="font-weight:bold;">#{{index+1}}</div>
      <div>{{seller}}</div>
    </div>
  </div>
</template>

<script>
import ContractPromise from '@/web3Contract'
export default {
  data() {
    return {
      contract: null,
      allSellers: []
    };
  },
  async mounted() {
    this.contract = await ContractPromise
    this.checkAllSellers()
  },
  methods: {
    async checkAllSellers() {
      this.contract.methods
      .adminPersonalData()
      .call()
      .then(value => this.allSellers = value.allsellers)
    }
  }
}
</script>

<style scoped>
.content{
  display: inline-block;
  justify-content: center;
  align-items: center; 
  border: 2px solid;
  margin: 10px;
  font-size: 1.2rem;
  width: 600px;
}
.content-empty{
  font-size: 2rem;
  background-color: honeydew;
  display: flex; 
  justify-content: center; 
  align-items: center;
}
</style>