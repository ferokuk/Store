<template>
  <div>
    <div style="margin-top:30px; font-weight: bold">Add new admin</div>
    <input type="text" placeholder="Address" v-model="newAdminAddress" @change="addressChangeHandler"><br>
    <button style="font-weight: bold" @click="addNewAdmin" :disabled="!newAdminAddress">Add</button>
  </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert'
export default {
  data() {
    return {
        newAdminAddress: null,
      }
  },
  async mounted() {
      this.contract = await ContractPromise;
      this.web3 = w3();
  },
  methods: {
    addressChangeHandler(event) {
      this.newAdminAddress = event.target.value;
    },
    async addNewAdmin() {
      if (!this.web3.utils.isAddress(this.newAdminAddress) || this.newAdminAddress === this.adr) 
      {
        swal("", "Invalid address", "warning", { buttons: false, timer: 1200 })
        return
      }
      await this.web3.eth.personal.unlockAccount(this.adr,"")
      try 
      {
        await this.contract.methods
        .addAdmin(this.newAdminAddress)
        .send({ from: this.adr })
        .then()
        swal("", "New admin added!", "success", { buttons: false, timer: 1200 })
      }
      catch (error) 
      {
        swal("", "This address doesn't exist or already an admin", "error", { buttons: false, timer: 1000 })
        return
      }
      this.newAdminAddress = null
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
input{
  font-size: 1.5rem;
  width: 640px;
  height: 60px;
}
button{
  width: 140px;
  height: 70px;
  font-size: 1.3rem;
  background-color: #CCCCFF;
  margin: 10px;
}
button:hover{
  background-color: #9999FF;
  cursor: pointer;
}
</style>