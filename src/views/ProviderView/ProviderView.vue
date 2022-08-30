<template>
  <div>
    Add new product:
    <div><input type="text" placeholder="Name of product" v-model="name" @change="nameChangeHandler"></div>
    <div><input type="number" min="0.001" step="0.001" placeholder="Price in ETH for 1 kg or piece" v-model="price" @change="priceChangeHandler"></div>
    <div><input type="text" placeholder="Expiration date" onfocus="(this.type='date')" v-model="date" @change="dateChangeHandler"></div>
    <div><input type="number" placeholder="Min temperature" v-model="minTemp" @change="minTempChangeHandler"></div>
    <div><input type="number" placeholder="Max temperature" v-model="maxTemp" @change="maxTempChangeHandler"></div>
    <select v-model="kg" @change="kgChangeHandler">
      <option disabled>Choose KG or piece</option>
      <option :value="true">KG</option>
      <option :value="false">Piece</option>
    </select>
    <div><button @click="addProduct" :disabled="!name || !date || !price || !minTemp || !maxTemp || !kg || isProcessing">Add</button></div>
  </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert'
export default { 
  data () {
    return {
      contract: null,
      web3: null,
      name: null,
      price: null,
      date: '',
      minTemp: null,
      maxTemp: null,
      kg: false,
      isProcessing: false
    }
  },
  async mounted () {
    this.contract = await ContractPromise
    this.web3 = w3()
  },
  methods:{
    nameChangeHandler(event){
      this.name = event.target.value
    },
    priceChangeHandler(event){
      this.price = event.target.value
    },
    kgChangeHandler(event){
      this.kg = event.target.value
    },
    minTempChangeHandler(event){
      this.minTemp = event.target.value
    },
    maxTempChangeHandler(event){
      this.maxTemp = event.target.value
    },
    dateChangeHandler(event){
      this.date = event.target.value
    },
    async addProduct(){
      this.isProcessing = true
      await this.web3.eth.personal.unlockAccount(this.account.adr,"")
      try
      {
        await this.contract.methods
        .createProduct(this.name, this.date, this.minTemp, this.maxTemp,this.web3.utils.toWei(String(this.price)), this.kg)
        .send({from: this.account.adr})
        .then()
        swal("","Product added","success",{buttons: false,timer:1000})
        this.isProcessing = false
      }
      catch(error)
      {
        console.log(error)
        swal("","Something went wrong","error",{buttons: false,timer:1000})
        this.isProcessing = false
        return
      }
    }
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
input{
  width: 500px;
  height: 50px;
  font-size: 1.5rem;
  margin: 15px;
}
.state-picker{
  display: grid;
}
select{
  background-color: #CCCCFF;
  font-size:2rem;
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
</style>