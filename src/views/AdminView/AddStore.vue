<template>
  <div>
    <div class="popup" >
      <div class="popup-content">
        <br>
        <input type="text" placeholder="Name" v-model="storeName" @change="storeNameChangeHandler">
        <br>
        <button @click="generateNewAddress" class="generate-btn">Generate</button>
        <input type="text" placeholder="Address" disabled v-model="storeAddress">
        <br>
        <input type="password" placeholder="Password" v-model="storePassword" @change="storePasswordChangeHandler">
        <br>
        <button @click="addStore" :disabled="isProcessing || !storeName || !storeAddress || !storePassword">Add</button>
      </div>
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
        isProcessing: false,
        storeName: null,
        storeAddress: null,
        storePassword: null
      }
    },
    async mounted(){
      this.contract = await ContractPromise
      this.web3 = w3()
      await this.web3.eth.personal.unlockAccount(this.adr,"")
    },
    methods:{
      storeNameChangeHandler(event) {
        this.storeName = event.target.value;
      },
      storePasswordChangeHandler(event) {
        this.storePassword = event.target.value;
      },
      async generateNewAddress(){
        await this.web3.eth.personal
        .newAccount("")
        .then(value => this.storeAddress = value)
        swal("","Address created successfully!","success",{buttons: false,timer: 1000})
      },
      async addStore() {
        if (!this.web3.utils.isAddress(this.storeAddress)) {
          swal("", "Invalid address", "error", { buttons: false, timer: 1000 });
          return;
        }
        this.isProcessing = true;
        
        try {
          await this.contract.methods
          .addStore(this.storeAddress, this.storeName, this.storePassword)
          .send({ from: this.adr })
          .then();
          swal("", "Store successfully added", "success", { buttons: false, timer: 1000 });
        }
        catch (error) {
          console.log(error)
          swal("", "Something went wrong", "error", { buttons: false, timer: 1000 });
          this.isProcessing = false;
          return;
        }
        let accs = await this.web3.eth.getAccounts()
        this.isProcessing = false;
        await this.web3.eth.personal.unlockAccount(accs[1],"")
        await this.web3.eth.sendTransaction({from: accs[1], to: this.storeAddress,value: this.web3.utils.toWei('1000', 'ether')})
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
.popup-content{
  font-size: 1.4rem;
  margin: auto;
  padding: 25px;
  border:10px;
  background-color: honeydew;
  width: 700px; 
}
.popup{
  display: block;
  justify-content: center;
  align-items: center;
}
button{
  width: 140px;
  height:70px;
  font-size: 1.6rem;
  background-color:#CCCCFF;
  margin: 10px;
}
button:hover{
  cursor:pointer;
  background-color:#9999FF;
}
input{
  font-size: 1.4rem;
  width: 580px;
  height: 50px;
  margin: 30px;
}
.generate-btn{
  width: 80px;
  height: 40px;
  font-size: 1rem;
  margin: 0;
}
</style>