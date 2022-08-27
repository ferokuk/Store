<template>
    <div>
      <div>
        <button style="font-size: 1.6rem; width:200px; height:100px; font-weight: bold; margin-left: 17px; margin-bottom: 10px;" @click="becomeBuyer">Become buyer</button>
      </div>
      <div>
        <button @click="isCheckingRoles = !isCheckingRoles" style="font-size: 1.3rem; width:200px; height:100px; font-weight: bold; margin-left: 17px">Check and approve role change requests</button>
      </div>
      <div v-if="isCheckingRoles" class="popup" style="display:flex;justify-content:center;align-items:center">
      <button @click="isCheckingRoles = !isCheckingRoles" style="font-size:2rem; position: fixed; top:250px; left:540px">Close</button>
        <div v-if="requests.length === 0" style="font-size:4rem; height:400px; width: 800px; display: flex; justify-content: center; align-items:center" class="popup-content">
          No requests at the moment
        </div>
        <div v-else v-for="(request,index) in requests" :key="index" class="popup-content">
          <div style="font-weight:bold;">#{{index+1}} </div>
          <div> Who: {{request.who}} </div>
          <div> Store: {{request.store}}</div>
          <div> Old role: <span :style="{color:this.roles.get(request.oldRole) === 'Buyer'?'darkgreen':'blue'}">{{this.roles.get(request.oldRole)}}</span></div>
          <div> New role: <span :style="{color:this.roles.get(request.newRole) === 'Buyer'?'darkgreen':'blue'}">{{this.roles.get(request.newRole)}}</span></div>
          <button @click="approveChangeRole(index)" :disabled="isProcessing" class="role-change-btn" style="background-color: green">&#10003;</button>
          <button @click="refuseChangeRole(index)" :disabled="isProcessing" class="role-change-btn"  style="background-color: red">&#10006;</button>
        </div>
      </div>
      <div>
        <button style="width: 200px; height: 100px; font-size: 2rem; margin: 10px; margin-left: 26px" @click="checkAllSellers">Check all sellers</button>
        <div >
          <div v-if="isCheckingSellers" class="popup">
            <button @click="isCheckingSellers = !isCheckingSellers" >Close</button>
            <div v-for="(seller,index) in allSellers" :key="seller" class="popup-content" style="width: 700px;justify-content: center; align-items: center; ">
              <div style="font-weight:bold;">#{{index+1}}</div>
              <div>{{seller}}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button @click="isAddingStore = !isAddingStore" style="margin: 20px; width: 200px; height: 100px; font-size: 2rem;">Add store</button>
        <div v-if="isAddingStore" class="popup" style="display: flex; justify-content: center; align-items: center">
          <div class="popup-content" style="width: 700px; justify-content: center; align-items: center;">
            <button @click="isAddingStore = !isAddingStore" :disabled="isProcessing">Close</button>
            <br>
            <input type="text" placeholder="Name" v-model="storeName" @change="storeNameChangeHandler">
            <br>
            <input type="text" placeholder="Address" v-model="storeAddress" @change="storeAddressChangeHandler">
            <br>
            <input type="password" placeholder="Password" v-model="storePassword" @change="storePasswordChangeHandler">
            <br>
            <button @click="addStore" :disabled="isProcessing || !storeName || !storeAddress || !storePassword">Add</button>
          </div>
        </div>
      <div style="display:inline">
        <button @click="isDeletingStore = !isDeletingStore" style="width:200px; height: 100px; font-size:2rem;" >Delete store</button>
        <div v-if="isDeletingStore" class="popup">
          <button @click="isDeletingStore = !isDeletingStore" :disabled="isProcessing">Close</button>
          <div v-for="(store,index) in allStores" :key="store" class="popup-content" style="width: 900px;">
            <div style="font-weight: bold"> #{{index+1}}</div> 
            <div>
            {{store}} 
            <button style="width: 40px; height:40px; color: red;" :disabled="isProcessing" @click="deleteStore(store)">&#10006;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div>
      <div style="margin-top:30px; font-weight: bold">Add new admin</div>
      <input type="text" placeholder="Address" v-model="address" @change="addressChangeHandler"><br>
      <button style="font-weight: bold" @click="addNewAdmin" :disabled="!address">Add</button>
    </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert';
export default { 
  data () {
    return {
      contract: null,
      web3: null,
      requests: [],
      allStores: [],
      allSellers: [],
      roles: new Map(),
      address: null,
      storeAddress: null,
      storePassword: null,
      storeName: null,
      isCheckingRoles: false,
      isAddingStore: false,
      isDeletingStore: false,
      isCheckingSellers: false,
      isProcessing: false
    }
  },
  async mounted () {
    this.contract = await ContractPromise
    this.web3 = w3()
    this.roles.set('0','Admin')
    this.roles.set('1','Buyer')
    this.roles.set('2','Seller')
    this.roles.set('3','Provider')
    this.roles.set('4','Store')
    await this.checkChangeRoles()
    await this.getAllStores()
  },
  props:{
    account: {
      type: Object,
      required: true
    }
  },
  methods:{
    addressChangeHandler(event){
      this.address = event.target.value
    },
    storeAddressChangeHandler(event){
      this.storeAddress = event.target.value
    },
    storeNameChangeHandler(event){
      this.storeName = event.target.value
    },
    storePasswordChangeHandler(event){
      this.storePassword = event.target.value
    },
    async becomeBuyer() {
      let answ
      await swal("","Are you sure? \n You will need to sign in again","info", {
      dangerMode: true,
      buttons: true,
      }).then(value => answ = value)

      if(answ !== true) return
      await this.web3.eth.personal.unlockAccount(this.account.adr,"")
      await this.contract.methods
      .AdminToBuyer()
      .send({from: this.account.adr})
      .then()
      swal("","Your role now is buyer","success",{buttons: false,timer:1000})
      this.$router.go()
    },
    async approveChangeRole(index) {
      this.isProcessing = true
      await this.web3.eth.personal.unlockAccount(this.account.adr,"")
      await this.contract.methods
      .approveChangeRole(index)
      .send({from: this.account.adr})
      .then(value => value.events.NewRoleApproved.returnValues.approved?
        swal("","Successfully approved","success", {
          buttons: false,
          timer: 1000,
        }):
        swal("","Something went wrong...","error", {
          buttons: false,
          timer: 1000,
        }))
      await this.checkChangeRoles()
      this.isProcessing = false
    },
    async refuseChangeRole(index){
      this.isProcessing = true
      await this.web3.eth.personal.unlockAccount(this.account.adr,"")
      await this.contract.methods
      .approveChangeRole(index)
      .send({from: this.account.adr})
      .then()
      swal("","Successfully refused","success", {buttons: false,timer: 1000})
      await this.checkChangeRoles()
      this.isProcessing = false
    },
    async checkChangeRoles(){
      await this.contract.methods
      .checkChangeRoles()
      .call()
      .then(value => this.requests = value)
    },
    async addNewAdmin() {
      if(!this.web3.utils.isAddress(this.address) || this.address === this.account.adr){
        swal("","Invalid address","warning",{buttons: false,timer:1200})
        return
      }
      try
      {
      await this.contract.methods
      .addAdmin(this.address)
      .send({from: this.account.adr})
      .then()
      swal("","New admin added!","success",{buttons: false,timer:1200})
      }
      catch(error)
      {
        swal("","This address doesn't exist or already an admin","error",{buttons: false,timer:1000})
        return
      }
      this.address = null
    },
    async addStore(){
      if(!this.web3.utils.isAddress(this.storeAddress)){
        swal("","Invalid address","error",{buttons:false,timer:1000})
        return
      }
      this.isProcessing = true
      try
      {
      await this.contract.methods
      .addStore(this.storeAddress,this.storeName,this.storePassword)
      .send({from:this.account.adr})
      .then()
      swal("","Store successfully added","success",{buttons:false,timer:1000})
      }
      catch(error)
      {
        swal("","This store already exists","error",{buttons:false,timer:1000})
        this.isProcessing = false
        return
      }
      this.isProcessing = false
      this.isAddingStore = !this.isAddingStore
      await this.getAllStores()
    },
    async deleteStore(store){
      let answ
      await swal("","Are you sure?\n(This can't be undone)","info", {
      dangerMode: true,
      buttons: true,
      }).then(value => answ = value)

      if(answ !== true) return
      this.isProcessing = true
      try{
      await this.contract.methods
      .deleteStore(store)
      .send({from:this.account.adr})
      .then()
      swal("","Successfully deleted!","success",{buttons: false, timer: 1000})
      await this.getAllStores()
      this.isProcessing = false
      }
      catch(error)
      {
        swal("","Something went wrong...","error",{buttons: false, timer: 1000})
        this.isProcessing = false
        return
      }
    },
    async checkAllSellers(){
      await this.contract.methods
      .adminPersonalData()
      .call()
      .then(value => this.allSellers = value.allsellers)
      this.isCheckingSellers = !this.isCheckingSellers
    },
    async getAllStores(){
      await this.contract.methods
      .getAllStores()
      .call()
      .then(value => this.allStores = value)
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
  font-size: 1.6rem;
  background-color:#CCCCFF;
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
.role-change-btn{
  font-size: 2rem; 
  margin:10px;
  width: 100px;
  height: 50px;
}
</style>