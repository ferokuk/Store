<template>
  <div class="allStores">
    <div v-for="(store,index) in allStores" :key="store" class="store">
      <div style="font-weight: bold"> #{{index+1}}</div> 
      <div>
        {{store}} 
        <button class="delete-btn" :disabled="isProcessing" @click="deleteStore(store)">&#10006;</button>
      </div>
    </div>
  </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert'
export default {
  data() {
    return {
      contract: null,
      web3: null,
      allStores: [],
      isProcessing: false
    }
  },
  async mounted() {
    this.contract = await ContractPromise
    this.web3 = w3()
    await this.getAllStores()
  },
  methods: {
    async deleteStore(store) {
      let answ
      await swal("", "Are you sure?\n(This can't be undone)", "info", { dangerMode: true, buttons: true })
      .then(value => answ = value);
    
      if (answ !== true)
      return

      await this.web3.eth.personal.unlockAccount(this.adr,"")
      try 
      {
        await this.contract.methods
        .deleteStore(store)
        .send({from: this.adr})
        .then()
        swal("", "Successfully deleted!", "success", { buttons: false, timer: 1000 })
        await this.getAllStores()
        this.isProcessing = false
      }
      catch (error) 
      {
        swal("", "Something went wrong...", "error", { buttons: false, timer: 1000 })
        console.log(error)
        this.isProcessing = false
        return
      }
    },
    async getAllStores() {
      await this.contract.methods
      .getAllStores()
      .call()
     .then(value => this.allStores = value)
    }
  },
    props:{
      adr:{
        type: String,
        required: true
      }
    }
}
</script>

<style scoped>
.delete-btn{
  margin: 10px;
  width: 40px; 
  height:40px; 
  color: red;
  background-color: #CCCCFF;
}
.delete-btn:hover{
  background-color: #9999FF;
  cursor: pointer;
}
.store{
  border: 3px solid;
  font-size: 1.2rem;
  width: 600px;
  margin: 10px;
  display: inline-block;
}
.allStores{
  display: inline-block;
  justify-content: center;
  align-items: center;
}
</style>