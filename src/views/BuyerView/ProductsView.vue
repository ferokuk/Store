<template>
  <br>
  <select v-model="storeAddress" @change="addressChangeHandler" class="stores">
    <option v-for="store in allStores" :key="store">{{store}}</option>
  </select>
  <div v-if="storeAddress === null">
    Choose a store
  </div>
  <div v-else-if="products.length === 0">
    <div>
      No products at the moment
    </div>
  </div>
  <div v-else v-for="(product,index) in products" :key="product" class="comment-container" style="width: 500px">
    <div>
      <div>{{index + 1}}. </div>
      <div >Name: <span style="font-weight: bold">{{product.name}} </span></div>
      <div>Amount: {{product.amount}} </div>
      <div>Exp. date: {{product.expirationDate}} </div>
      <div>Price for one {{product.kg?"kg":"piece"}}: {{web3.utils.fromWei(product.basePrice)}} ether</div>
      <input type="text" placeholder="Amount" v-model="amount" @change="amountChangeHandler" style="font-size: 1.4rem; width: 100px;">
      <div v-if="amount <= Number(product.amount)" style="font-size: 1.2rem;">This will be: {{web3.utils.fromWei(product.basePrice) * amount}} ether</div>
      <div v-if="amount * web3.utils.fromWei(product.basePrice) > balance" style="font-size: 1.2rem; color: red">Seems like you don't have enough money<br>(You have {{balance}}, need {{ web3.utils.fromWei(product.basePrice)* amount}})</div>
      <div v-if="amount > Number(product.amount)" style="font-size: 1.2rem; color: red">Sorry, we don't have that much {{product.name}}</div>
      <button :disabled="amount > Number(product.amount) || amount * web3.utils.fromWei(product.basePrice) > balance || isProcessing" @click="buyProduct(index,amount,product.basePrice)" class="change-view" style="width: 120px; height: 60px; font-size: 1.5rem">Buy</button>
    </div>
  </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert'
  export default {
    data(){
      return{
        contract: null,
        web3: null,
        allStores: [],
        products: [],
        storeAddress: null,
        balance: null,
        amount: null,
        isProcessing: false
      }
    },
    async mounted() {
      this.contract = await ContractPromise;
      this.web3 = w3();
      this.getAllStores();
      this.getBalance()
      this.storeAddress = localStorage.getItem("storeAdr")?localStorage.getItem("storeAdr"):null
      if(this.storeAddress) {this.getProducts()}
    },
    methods: {
      addressChangeHandler(event){
        this.storeAddress = event.target.value
        this.getProducts()
        localStorage.setItem("storeAdr",this.storeAddress)
      },
      amountChangeHandler(event){
        this.amount = event.target.value
      },
      getBalance(){
        this.web3.eth
        .getBalance(this.adr)
        .then(value => this.balance = value);
      },
      getAllStores() {
        this.contract.methods
        .getAllStores()
        .call()
        .then(value => this.allStores = value);
      },
      getProducts(){
        this.contract.methods
        .showProducts(this.storeAddress)
        .call()
        .then(value => this.products = value);
      },
      async buyProduct(index, amount, price) {
        await this.web3.eth.personal.unlockAccount(this.adr, "");
        this.isProcessing = true;
        this.getBalance()
        if(price * amount > this.balance) {
          swal("", "Not enough money", "warning", { buttons: false, timer: 1000 });
          this.isProcessing = false;
          return;
        }
        try {
          await this.contract.methods
          .buyProduct(this.storeAddress, index, amount)
          .send({ from: this.adr, value: amount * price })
          .then(value => value.events.ProductBought.returnValues.bought ? swal("", "Product bought successfully!", "success", { buttons: false, timer: 1000 }) : swal("", "Something went wrong", "error", { buttons: false, timer: 1000 }));
        }
        catch (error) {
          this.isProcessing = false;
          return;
        }
        this.getProducts()
        this.getBalance()
        this.isProcessing = false;
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
.stores{
  background-color: #CCCCFF;
  font-size:2rem;
}
.comment-container{
  border: 2px solid;
  margin: 20px;
  background-color: #cfcfff;
  width:1000px;
  max-width: 1000px;
  display:inline-block;
  vertical-align: top;
}
.change-view{
  width: 150px;
  height: 75px;
  font-size: 1.5rem;
  margin: 20px;
  background-color: #CCCCFF;
}
.change-view:hover{
  background-color: #9999FF;
  cursor: pointer;
}
</style>