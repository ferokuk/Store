<template>
  <div>
    Your debt is : {{debt / 10**18}} ether
    <div v-if="debt > 0">
      <input type="number" min="0.01" :max="debt" step="0.01" v-model.number="money" @change="moneyChangeHandler" placeholder="your ether"> 
      <br>
      <button @click="payDebts" class="debts" :disabled="!money">Pay debts</button>
    </div>
  </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract'
  export default {
    data(){
      return{
        contract: null,
        web3: null,
        debt: 0,
        money: null,
        balance: null
      }
    },
    async mounted(){
      this.contract = await ContractPromise
      this.web3 = w3()
      this.checkDebts()
      this.getBalance()
    },
    methods:{
      moneyChangeHandler(event){
        this.money = event.target.value
      },
      checkDebts(){
        this.contract.methods
        .debts(this.adr)
        .call()
        .then(value => this.debt = value)
      },
      async getBalance(){
        await this.web3.eth
        .getBalance(this.adr)
        .then(value => this.balance = value)
      },
      async payDebts(){
        this.checkDebts()
        this.getBalance()
        await this.web3.eth.personal.unlockAccount(this.adr,"")
        if(this.money/10**18 > this.debt/10**18) this.money -= this.money - this.debt
        if(this.money/10**18 > this.balance){
          swal("","Not enough money","warning",{buttons:false,timer:1000})
          return
        }
        await this.contract.methods
        .payDebts()
        .send({from: this.adr,value: this.web3.utils.toWei(this.money, 'ether')})
        swal("","Your money has been sent!","success",{buttons:false,timer:1000})
        this.checkDebts()
        if(this.debt === 0) swal("","Congratulations,\n now your debt is zero!","success")
        await this.getBalance()
      },  
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
.debts{
  width:120px;
  height: 60px;
  background-color: #CCCCFF;
  font-size: 1rem;
  margin: 20px;
}
.debts:hover{
  cursor: pointer;
  background-color:#9999FF;
}
input{
  width: 200px;
  height: 60px;
  font-size: 1.8rem;
  margin: 15px;
}
</style>