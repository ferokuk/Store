<template>
  <div>
    <select v-model="address" @change="addressChangeHandler" class="stores">
      <option v-for="store in allStores" :key="store">{{store}}</option>
    </select>
  </div>
  <div v-if="address === null">
    Choose a store
  </div>
  <div v-else>
    <div class="content">Debt: {{debt}} ether</div>
  </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
export default { 
  data () {
    return {
      contract: null,
      web3: null,
      allStores: [],
      address: null,
      debt: null
    }
  },
  async mounted () {
    this.contract = await ContractPromise
    this.web3 = w3()
    this.getAllStores()
    this.address = localStorage.getItem("storeAdr")?localStorage.getItem("storeAdr"):null
    if(this.address) this.checkDebts()
  },
  methods:{
    addressChangeHandler(event){
      this.address = event.target.value
      this.checkDebts()
      localStorage.setItem("storeAdr",this.address)
    },
    checkDebts(){
      this.contract.methods.debts(this.address).call().then(value => this.debt = this.web3.utils.fromWei(value))
    },
    getAllStores() {
      this.contract.methods
      .getAllStores()
      .call()
      .then(value => this.allStores = value);
    },
  },
  props:{
    account: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.stores{
  background-color: #CCCCFF;
  font-size:2rem;
}
.content{
  font-size: 3rem;
  margin: 20px;
}
</style>