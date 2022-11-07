<template>
  <div v-if="isSignedIn === false">
    <form @submit.prevent class="loginForm">
      <strong>Sign in to get access to your {{signInAsStore?"store":"account"}}</strong>
      <br>
      <input type="text" class="loginField" placeholder="Address" v-model="address" @input="addressChangeHandler">
      <br>
      <input type="password" class="loginField" placeholder="Password" v-model="password" @input="passwordChangeHandler" autocomplete="off">
      <br>
      <button id="signInBtn" @click="signIn" :disabled="isProcessing">Sign in</button>
      <br>
      <button @click="signInAsStore = !signInAsStore" :disabled="isProcessing" class="change-signIn-format">Sign in as a {{signInAsStore?"person":"store"}}</button>
    </form>
    <RegistrationForm v-if="!signInAsStore" :isProcessing="isProcessing"></RegistrationForm>
  </div>
  <div v-else>
    <button @click="signOut" id="signOutBtn">Sign out</button>
    <ProfileView :account="account" ></ProfileView>
  </div>
</template>
<script>
import ProfileView from '@/views/ProfileView.vue'
import RegistrationForm from '@/views/RegistrationForm.vue'
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert'
export default {
  name: 'HomePage',
  async mounted(){
    this.web3 = w3()
    this.contract = await ContractPromise
    this.isSignedIn = localStorage.getItem("signIn")?localStorage.getItem("signIn"):false
    this.account = JSON.parse( localStorage.getItem("account") )?JSON.parse( localStorage.getItem("account") ):null
    if(this.account === null) return
    //if user is not a store account
    if(this.account[4] !== "4"){
      this.account.login = this.account[0]
      this.account.adr = this.account[1]
      this.account.password = null
      this.account.fio = this.account[3]
      this.account.role = this.account[4]
      this.account.store = this.account[5]
      this.account.comments = this.account[6]
      return
    }
    this.account.name = this.account[0]
    this.account.adr = this.account[1]
    this.account.password = null
    this.account.rating = this.account[3]
    this.account.role = this.account[4]
    this.account.products = this.account[5]
    this.account.staff = this.account[6]
    this.account.comments = this.account[7]
    this.account.answers = this.account[8]
  },
  data (){
    return{
      web3: null,
      contract: null,
      address: null,
      account: null,
      password: null,
      isSignedIn: false,
      signInAsStore: false,
      isProcessing: false
    }
  },
  methods: {
    passwordChangeHandler (event) {
      this.password = event.target.value
    },
    addressChangeHandler (event) {
      this.address = event.target.value
    },
    async signIn() {
      if(this.address === null || this.password === null)
      {
        swal("","Please fill in all fields", "error")
        return
      }
      if(!this.web3.utils.isAddress(this.address))
      {
        swal("","Please check your address", "error")
        return
      }
      this.isProcessing = true
      await this.web3.eth.personal.unlockAccount(this.address,"")
      if(!this.signInAsStore)
      {
        try
        {
          await this.contract
          .methods
          .login(this.address, this.password)
          .send({from: this.address,gas: 3000000})
          .then(value => this.account = value.events.Login.returnValues.user)
        }
        catch(error)
        {
          swal("Please, check your address and password!")
          this.isProcessing = false
          return
        }
      }
      else
      {
        try
        {
          await this.contract
          .methods.loginInStore(this.address, this.password)
          .send({from: this.address,gas: 3000000})
          .then(value => this.account = value.events.LoginInStore.returnValues.store)
        }
        catch(error)
        {
          swal("","Please, check your address and password!","error")
          this.isProcessing = false
          return
        }
      }
      swal(`Welcome back, ${this.account.login?this.account.login:this.account.name}`, {buttons: false,timer: 1200})
      this.isProcessing = false
      this.isSignedIn = true
      localStorage.setItem("signIn",this.isSignedIn)
      localStorage.setItem("account",JSON.stringify(this.account))
    },
    signOut() {
      this.web3.eth.personal
      .lockAccount(this.account.adr)
      .then(swal("Goodbye!", {buttons: false,timer: 800}))
      this.isSignedIn = false
      this.account = {}
      localStorage.removeItem("signIn")
      localStorage.removeItem("account")
    }
  },
  components: { ProfileView, RegistrationForm }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
button{
  font-weight: bold;
}
.swal-text{
  font-size: 2.3rem;
  font-family: Montserrat;
}
.swal-button {
  background-color: #CCCCFF;
  font-size:1.3rem;
  font-weight: 100;
  color:black;
}
body{
  background-color: honeydew;
}
.loginForm{
  font-size: 2rem;
  color:black;
}
.loginField{
  font-size: 1.5rem;
  margin:1rem;
  background-color: #CCCCFF;
  width: 580px;
  height: 50px;
}
input::placeholder{
  color: gray;
}
#signInBtn{
  font-size:2rem;
  width:140px;
  height:70px;
  margin-top:1rem;
  background-color: #CCCCFF;
}
#signUpBtn{
  font-size:1.3rem;
  margin-left:460px;
  width:120px;
  height:60px;
  background-color: #CCCCFF;
}
#signUpBtnTextAbove{
  font-size:1.3rem;
  margin-left:470px;
}
#signUpBtn:hover{
   background-color: #9999FF;
   cursor: pointer;
}
#signInBtn:hover{
   background-color: #9999FF;
   cursor: pointer;
}
#signOutBtn{
  font-size:1.3rem;
  width:120px;
  height:60px;
  background-color: #CCCCFF;
}
#signOutBtn:hover{
   background-color:#9999FF;
   cursor: pointer;
}
.change-signIn-format{
  position: flex;
  font-size:1.5rem;
  width:140px;
  height:65px;
  background-color: #CCCCFF;
}
.change-signIn-format:hover{
  background-color:#9999FF;
  cursor: pointer;
}
</style>
