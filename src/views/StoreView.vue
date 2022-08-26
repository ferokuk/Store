<template>
  <div>
    Your rating is: {{rating}}
  </div>
  <div>Your balance is: {{balance/10**18}} ether</div>
  <div>
    Your debt is : {{debt}} ether
    <div v-if="debt > 0">
      <input type="number" min="0.01" :max="debt" step="0.01" v-model.number="money" @change="moneyChangeHandler"> 
      <br>
      <button @click="payDebts" class="debts">Pay debts</button>
    </div>
  </div>
  <button class="debts" @click="showSellers = !showSellers">{{showSellers?"Buy products":"Show sellers"}}</button>
  <div v-if="showSellers">
    <Sellers :staff="account.staff"></Sellers>
  </div>
  <div v-if="!showSellers">
    <input type="text" v-model="name" @change="nameChangeHandler" placeholder="Product's name" class="buy-product">
    <br>
    <input type="number" v-model="amount" min="1" @change="amountChangeHandler" placeholder="Product's amount" class="buy-product">
    <br>
    <button @click="buyProduct" class="debts" :disabled="amount === null || name === null || name === ''">Buy</button>
  </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract'
import Sellers from './Sellers.vue' 
import swal from 'sweetalert'
export default {
  data() {
    return {
      contract: null,
      web3: null,
      debt: null,
      money: null,
      showSellers: null,
      amount: null,
      name: null,
      balance: null,
      rating: 0
    }
  },
  async mounted() {
    this.contract = await ContractPromise
    this.web3 = w3()
    this.checkDebts()
    await this.getBalance()
    await this.updateStoreRating()
  },
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  methods:{
    moneyChangeHandler(event){
      this.money = event.target.value
    },
   nameChangeHandler(event){
    this.name = event.target.value
   },
   amountChangeHandler(event){
    this.amount = event.target.value
   },
   async updateStoreRating(){
    let rating = 0
    let length = this.account.comments.length
    for(let i = 0; i < length; i++)
    {
      rating += ((i + 1) * this.account.comments[i][5])/(this.account.comments[i][5] + this.account.comments[i][6])
    }
    rating *= 1000
    rating = Math.floor(rating/length)
    this.rating = rating
    await this.contract.methods
    .updateStoreRating(rating)
    .send({from: this.account.adr})
    .then()
   },
   async getBalance(){
    await this.web3.eth
    .getBalance(this.account.adr)
    .then(value => this.balance = value)
   },
    checkDebts(){
      this.contract.methods
      .debts(this.account.adr)
      .call()
      .then(value => this.debt = value)
    },
    async payDebts(){
      if(this.money > this.debt) this.money-= this.money - this.debt
      this.getBalance()
      if(this.money > this.balance){
        swal("","Not enough money","warning",{buttons:false,timer:1000})
        return
      }
      await this.contract.methods
      .payDebts()
      .send({from: this.account.adr,value: this.money})
      swal("","Your money has been sent!","success",{buttons:false,timer:1000})
      this.checkDebts()
      if(this.debt === 0)swal("","Congratulations,\n now your debt is zero!","success")
    },
    async buyProduct(){
      await this.web3.eth.personal.unlockAccount(this.account.adr,"")
      await this.updateStoreRating()
      let price, k, info, finalPrice
      if(this.amount <= 100) k = 100
      else if(this.amount > 100 && this.amount < 1000) k = 95
      else k = 90
      try
      {
      await this.contract.methods
      .calculatePriceOfProduct(this.name,Number(this.amount),k)
      .call()
      .then(value => price = value)
      .then()
      }
      catch(error)
      {
        swal("","Seems like this product doesn't exist","warning",{buttons:false,timer:1000})
        return
      }
      await this.contract.methods
      .products(this.name)
      .call()
      .then(value => info = value)
      if(price/10**18 > this.balance/10**18){
        swal("",`The price will be ${this.web3.utils.fromWei(price)} ether, not enough money.`,"warning")
        return
      }
      let answ
      await swal("",`Price: ${this.web3.utils.fromWei(price)} ether, \n Name: ${this.name},
      Expiration date: ${info.expirationDate},\n confirm purchase?`,{buttons:[true,"Confirm"]}).then(value => answ = value)
      if(answ !== true) return
      await this.contract.methods
      .buyAndProvideProduct(this.name,Number(this.amount),k)
      .send({from: this.account.adr, value: price})
      .then(value => finalPrice = value.events.ProductProvided.returnValues.price)

      if(finalPrice === price)
      {
        swal("","Product has been delivered without any issues!","success",{buttons: false,timer:1500})
        return
      }
      swal("",`There were some problems during delivery. Final price is: ${this.web3.utils.fromWei(finalPrice)}`,"warning")
      this.getBalance()
    }
  },
  components: { Sellers }
}
</script>

<style scoped>
.debts{
  width:120px;
  height: 60px;
  background-color: #CCCCFF;
  font-size: 1rem;
}
.debts:hover{
  cursor: pointer;
  background-color:#9999FF;
}
input{
  width: 180px;
  height: 60px;
  font-size: 2rem;
  margin: 15px;
}
.buy-product{
  width: 400px;
}
</style>