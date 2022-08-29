<template>
  <button @click="becomeBuyer" class="become-buyer-btn">Become buyer</button>
  <div>  
    <button @click="displayManager('checkRoles')">{{checkRoles?"Close":"Check roles"}}</button>
    <button @click="displayManager('checkSellers')">{{checkSellers?"Close":"Check sellers"}}</button>
    <button @click="displayManager('delStore')">{{deleteStore?"Close":"Delete store"}}</button>
    <button @click="displayManager('addStore')" >{{addingStore?"Close":"Add store"}}</button>
    <button @click="displayManager('addAdmin')">{{addAdmin?"Close":"Add admin"}}</button>
    <CheckRoles v-if="checkRoles" :adr="account.adr"></CheckRoles>
    <CheckSellers v-if="checkSellers"></CheckSellers>
    <AddStore v-if="addingStore" :adr="account.adr"></AddStore>
    <DeleteStore v-if="deleteStore" :adr="account.adr"> </DeleteStore>
    <AddAdmin v-if="addAdmin" :adr="account.adr"></AddAdmin>    
  </div>
    
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert'
import CheckRoles from './CheckRoles.vue'
import CheckSellers from './CheckSellers.vue'
import AddStore from './AddStore.vue'
import DeleteStore from './DeleteStore.vue'
import AddAdmin from './AddAdmin.vue'
export default {
  data() {
    return {
      contract: null,
      web3: null,
      isProcessing: false,
      checkSellers: false,
      checkRoles: false,
      addingStore: false,
      deleteStore: false,
      addAdmin: false,
    }
  },
  async mounted() {
    this.contract = await ContractPromise;
    this.web3 = w3();
  },
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  methods: {
    displayManager(toShow){
      if(toShow === "checkSellers") 
      {
      this.checkSellers = !this.checkSellers
      this.addingStore = this.deleteStore = this.addAdmin = this.checkRoles = false
      }
      if(toShow === "addStore") 
      {
      this.addingStore = !this.addingStore
      this.checkSellers = this.deleteStore = this.addAdmin = this.checkRoles = false
      } 
      if(toShow === "delStore") 
      {
      this.deleteStore = !this.deleteStore
      this.addingStore = this.checkSellers = this.addAdmin = this.checkRoles = false
      } 
      if(toShow === "addAdmin") 
      {
      this.addAdmin = !this.addAdmin
      this.deleteStore = this.addingStore = this.checkSellers = this.checkRoles = false
      } 
      if(toShow === "checkRoles") 
      {
      this.checkRoles = !this.checkRoles
      this.addingStore = this.deleteStore = this.checkSellers = this.addAdmin = false
      }  
    },
    async becomeBuyer() {
      let answ;
      await swal("", "Are you sure? \n You will need to sign in again", "info", {dangerMode: true,buttons: true,})
      .then(value => answ = value);

      if (answ !== true) return;

      await this.web3.eth.personal.unlockAccount(this.account.adr, "");
      await this.contract.methods
      .AdminToBuyer()
      .send({ from: this.account.adr })
      .then();
      localStorage.removeItem("account")
      this.$router.reload()
      swal("", "Your role now is buyer", "success", { buttons: false, timer: 1000 });
    }
  },
  components: { CheckRoles, AddStore, DeleteStore, AddAdmin, CheckSellers }
}
</script>

<style scoped>
.popup-content{
  font-size: 1.4rem;
  margin: auto;
  padding: 25px;
  border:10px;
  background-color: honeydew;
}
.popup{
  top:0;
  bottom:0;
  right:0;
  left:0;
  min-height: 310px;
  min-width: 600px;
  padding: 25px;
  display: block;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
  position: fixed;
}
button{
  width: 140px;
  height:70px;
  font-size: 1.3rem;
  background-color:#CCCCFF;
  margin: 10px;
}
button:hover{
  cursor:pointer;
  background-color:#9999FF;
}
</style>