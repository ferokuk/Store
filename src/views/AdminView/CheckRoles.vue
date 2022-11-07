<template>
  <div>
    <div v-if="requests.length === 0" class="content">
      No requests at the moment
    </div>
    <div v-else v-for="(request,index) in requests" :key="index" class="content">
      <div style="font-weight:bold;">#{{index+1}} </div>
      <div> Who: {{request.who}} </div>
      <div> Store: {{request.store}}</div>
      <div> Old role: <span :style="{color:this.roles.get(request.oldRole) === 'Buyer'?'darkgreen':'blue'}">{{this.roles.get(request.oldRole)}}</span></div>
      <div> New role: <span :style="{color:this.roles.get(request.newRole) === 'Buyer'?'darkgreen':'blue'}">{{this.roles.get(request.newRole)}}</span></div>
      <button @click="approveChangeRole(index)" :disabled="isProcessing" class="role-change-btn-green">&#10003;</button>
      <button @click="refuseChangeRole(index)" :disabled="isProcessing" class="role-change-btn-red">&#10006;</button>
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
      requests: [],
      roles: new Map(),
      isProcessing: false,
    }
  },
  async mounted() {
    this.contract = await ContractPromise
    this.web3 = w3()
    this.roles.set("0", "Admin")
    this.roles.set("1", "Buyer")
    this.roles.set("2", "Seller")
    this.roles.set("3", "Provider")
    this.roles.set("4", "Store")
    await this.checkChangeRoles()
  },
  methods: {
    async checkChangeRoles() {
      await this.contract.methods
      .checkChangeRoles()
      .call()
      .then(value => this.requests = value)
    },
    async approveChangeRole(index) {
      this.isProcessing = true
      await this.web3.eth.personal.unlockAccount(this.adr, "")
      await this.contract.methods
      .approveChangeRole(index)
      .send({ from: this.adr })
      .then(value => value.events.NewRoleApproved.returnValues.approved ?
      swal("", "Successfully approved", "success", {
        buttons: false,
        timer: 1000,
      }) :
      swal("", "Something went wrong...", "error", {
        buttons: false,
        timer: 1000,
      }))
      await this.checkChangeRoles()
      this.isProcessing = false
    },
    async refuseChangeRole(index) {
      this.isProcessing = true
      await this.web3.eth.personal.unlockAccount(this.adr, "")
      await this.contract.methods
      .refuseChangeRole(index)
      .send({ from: this.adr })
      .then()
      swal("", "Successfully refused", "success", { buttons: false, timer: 1000 })
      await this.checkChangeRoles()
      this.isProcessing = false
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
content{
  font-size: 1.5rem;
  margin: auto;
  padding: 25px;
  border:10px;
  background-color: honeydew;
  height:400px; 
  width: 800px; 
  display: block; 
  justify-content: center; 
  align-items: center;
}
button{
  width: 140px;
  height:70px;
  font-size: 1.6rem;
  background-color:#CCCCFF;
}
button:hover{
  cursor:pointer;
  background-color:#9999FF;
}
.role-change-btn-green{
  background-color: green;
  font-size: 2rem; 
  margin:10px;
  width: 100px;
  height: 50px;
}
.role-change-btn-green:hover{
  background-color: darkgreen;
}
.role-change-btn-red{
  background-color: red;
  font-size: 2rem; 
  margin:10px;
  width: 100px;
  height: 50px;
}
.role-change-btn-red:hover{
  background-color: darkred;
}
.close-btn{
  font-size:2rem; 
  top:174px; 
  margin-left: 450px;
  display: flex; 
  justify-content: center; 
  align-items: center;
}

</style>