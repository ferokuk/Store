<template>
  <button id="signUpBtn" @click="this.openForm = !this.openForm">Sign up</button>
  <transition name="modal">
    <div v-if="openForm" class="form">
      <div class="form-content">
        <button id="generateNewAddressBtn" @click="generateNewAddress">Generate new address</button>
          <button id="closeFormBtn" @click="this.openForm = !this.openForm">Close</button>
          <form @submit.prevent>
            <br>
            <input type="text" placeholder="Your login" v-model="login" @change="loginChangeHandler">
            <br>
            <input type="text" placeholder="Your address" v-model="address" @change="addressChangeHandler">
            <br>
            <input type="password" placeholder="Your password" v-model="password" autocomplete="off" @change="passwordChangeHandler">
            <br>
            <input type="text" placeholder="Your FIO" v-model="fio" @change="fioChangeHandler">
            <br>
            <input type="text" placeholder="Your city" v-model="city" @change="cityChangeHandler">
            <br>
            <button id="createUserBtn" @click="signUp">Sign Up</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert';
export default {
  name: "RegistrationForm",
  data() {
    return {
      address: null,
      password: null,
      login: null,
      fio: null,
      city: null,
      openForm: false,
      web3: null,
      contract: null
    }
  },
  async mounted(){
    this.contract = await ContractPromise
    this.web3 = w3()
  },
  methods: {
    addressChangeHandler(event) {
      this.address = event.target.value;
    },
    passwordChangeHandler(event) {
      this.password = event.target.value;
    },
    loginChangeHandler(event) {
      this.login = event.target.value;
    },
    fioChangeHandler(event) {
      this.fio = event.target.value;
    },
    cityChangeHandler(event) {
      this.city = event.target.value;
    },
    async signUp() {
      if(this.login === null || this.address === null || this.password === null || this.FIO === null || this.city === null) {
        swal("","Please fill in all fields","warning",{
          buttons: false,
          timer: 900
        })
        return
      }
      if(!this.web3.utils.isAddress(this.address)){
        swal("","Invalid address","warning",{
          buttons: false,
          timer: 900
        })
        return
      }
      let balance = 0
      await this.web3.eth.getBalance(this.address).then(value => balance = value)
      if(balance <= this.web3.utils.toWei('0.001', 'ether')){
        swal("","Please wait a bit until ether will arrive to your address","warning",{
          buttons: false,
          timer: 1200
        })
        return
      }
      await this.web3.eth.personal.unlockAccount(this.address,"")
      let res = false
      try
      {
      await this.contract.methods
      .registration(this.login, this.password, this.address, this.fio, this.city)
      .send({from: this.address})
      .then(value => res = value.events.Registration.returnValues.result)
      }
      catch(error)
      {
        swal("","This address already exists","error",{
        buttons: false,
        timer: 1000
        })
        return
      }
      if(res){
      swal("","You succesfully signed up!","success",{
        buttons: false,
        timer: 1000
        })
        this.openForm = !this.openForm
        this.address = this.password = this.login = this.fio = this.city = null
      }
    },
    async generateNewAddress() {
      await this.web3.eth.personal
      .newAccount("")
      .then(value => this.address = value)
      swal("","Address created successfully!","success",{
        buttons: false,
        timer: 1000
      })
      let accs = await this.web3.eth.getAccounts()
      await this.web3.eth.personal.unlockAccount(accs[0],"")
      await this.web3.eth
      .sendTransaction({from:accs[0], to: this.address, value: this.web3.utils.toWei('50', 'ether')})
      .then(swal("","Account successfully prefunded with some ether!", "success",{buttons: false, timer: 3000}))
      await this.web3.eth.personal.lockAccount(accs[0])
    }
  }
}
</script>

<style scoped>
*{
  font-weight: bold;
}
#createUserBtn{
  font-size:1.3rem;
  width:120px;
  height:60px;
  background-color: #CCCCFF;
}
#createUserBtn:hover{
   background-color: #9999FF;
   cursor: pointer;
}
#closeFormBtn{
  font-size:1.3rem;
  width:130px;
  height:65px;
  background-color: #CCCCFF;
  top: 0;
  left:0;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: 484px;
}
#closeFormBtn:hover{
  background-color: #9999FF;
  cursor: pointer;
}
#generateNewAddressBtn{
  font-size:1.1rem;
  width:130px;
  height:65px;
  background-color: #CCCCFF;
  display:flex;
  padding:6px;
  position:fixed;
  margin-left:454px;
  margin-top: 9px;
}
#generateNewAddressBtn:hover{
   background-color: #9999FF;
   cursor: pointer;
}
.form{
  top:0;
  bottom:0;
  right:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
  position: fixed;
}
.form-content{
  margin: auto;
  background: honeydew;
  border-radius: 10px;
  min-height: 310px;
  min-width: 600px;
  padding: 25px;
}
input{
  font-size: 1.8rem;
  width: 600px;
  height: 50px;
  margin: auto;
  display: block;
}
.modal-enter-active, .modal-leave-active{
  transition: 0.25s;
}
.modal-leave-to, .modal-enter{
  transform: translateY(-100px);
  background: rgba(0,0,0,0);
  opacity:0;
}
</style>
