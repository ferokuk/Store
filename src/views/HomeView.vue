<template>
  <div v-if="isSignedIn===false">
    <form @submit.prevent class="loginForm">
      <strong>Sign in to get access to your {{signInAsStore?"store":"account"}}</strong>
      <br>
      <input type="text" class="loginField" placeholder="Address" v-model="address" @input="addressChangeHandler">
      <br>
      <input type="password" class="loginField" placeholder="Password" v-model="password" @input="passwordChangeHandler" autocomplete="off">
      <br>
      <button id="signInBtn" @click="signIn">Sign in</button>
      <br>
      <button @click="signInAsStore = !signInAsStore" class="change-signIn-format">Sign in as a {{signInAsStore?"person":"store"}}</button>
    </form>
    <RegistrationForm v-if="!signInAsStore"></RegistrationForm>
  </div>
  <div v-else>
    <button @click="signOut" id="signOutBtn">Sign out</button>
    <ProfileView :account="account" :role="account.role"></ProfileView>
  </div>
</template>
<script>
import ProfileView from '@/views/ProfileView.vue'
import RegistrationForm from '@/views/RegistrationForm.vue'
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert';
export default {
  name: 'HomePage',
  async mounted() {
    this.web3 = w3()
    this.contract = await ContractPromise
  },
  data () {
    return {
      web3: null,
      contract: null,
      address: null,
      account: null,
      password: null,
      isSignedIn: false,
      signInAsStore: false
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
      if(this.address === null || this.password === null){
        swal("","Please fill in all fields", "error")
        return
      }
      if(!this.web3.utils.isAddress(this.address)){
        swal("","Please check your address", "error")
        return
      }
      await this.web3.eth.personal.unlockAccount(this.address,"")
      let accs = await this.web3.eth.getAccounts()
      await this.web3.eth.personal.unlockAccount(accs[0],"")
      await this.web3.eth
      .sendTransaction(
        {from:accs[0], 
        to: this.address, 
        value: this.web3.utils.toWei('0.00001', 'ether')})
      .then()
      await this.web3.eth.personal.lockAccount(accs[0])

      if(!this.signInAsStore)
      {
        try
        {
          await this.contract
          .methods.login(this.address, this.password)
          .send({from: this.address,gas: 3000000})
          .then(value => this.account = value.events.Login.returnValues.user)
        }
        catch(error)
        {
          swal("Please, check your address and password!")
          return
        }
        swal(`Welcome, ${this.account.login}!`)
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
          return
        }
      }
      swal(`Welcome back, ${this.account.login}`, {
        buttons: false,
        timer: 1200,
      });
      this.isSignedIn = true
    },
    async signOut() {
      this.isSignedIn = false
      this.account = null
      await this.web3.eth.personal.lockAccount(this.address).then(swal("Goodbye!", {buttons: false,timer: 800,}))
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
