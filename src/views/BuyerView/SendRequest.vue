<template>
  <div class="modal-content">
    Choose a store where u wish to work:
    <br>
    <select v-model="store" class="stores" @change="addressChangeHandler">
      <option v-for="store in allStores" :key="store" >{{store}}</option>
    </select>
    <br>
    <button @click="becomeSeller(store)" :disabled="!store || isProcessing" class="choose-store-btn">Send request</button>
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
        store: null,
        isProcessing: false
      }
    },
    async mounted(){
      this.contract = await ContractPromise;
      this.web3 = w3();
      await this.getAllStores();
    },
    methods:{
      addressChangeHandler(event){
        this.address = event.target.value
      },
      async getAllStores() {
        await this.contract.methods
        .getAllStores()
        .call()
        .then(value => this.allStores = value);
      },
      async becomeSeller() {
        await this.web3.eth.personal.unlockAccount(this.adr,"")
        await this.getAllStores();
        let answ;
        await swal("", "Are you sure?", "warning", { buttons: [true, "Yes"] }).then(value => answ = value);
        if (answ !== true) return;
        this.isProcessing = true
        try {
          await this.contract.methods
          .buyerToSeller(this.address)
          .send({ from: this.adr })
          .then();
          swal("", "Request sent!\nIt may take some time to be accepted.", "success", { buttons: false, timer: 2000 });
          this.isProcessing = false
        }
        catch (error) {
          swal("", "You already requested!", "warning", { buttons: false, timer: 1200 });
          this.isProcessing = false
          return;
        }
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
.choose-store-btn{
  width: 140px;
  height: 70px;
  background-color: #CCCCFF;
  font-size: 2rem;
  margin: 10px;
  font-size: 1.6rem
}
.choose-store-btn:hover{
  cursor: pointer;
  background-color: #9999FF;
}
.stores{
  background-color: #CCCCFF;
  font-size:2rem;
}
</style>