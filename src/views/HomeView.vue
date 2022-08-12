<template>
  <div v-if="isSignedIn===false && !signInAsStore">
    <form @submit.prevent class="loginForm">
      Sign in to get access to your account
      <br>
      <input type="text" class="loginField" placeholder="Login" v-model="login" @input="loginChangeHandler">
      <br>
      <input type="password" class="loginField" placeholder="Password" v-model="password" @input="passwordChangeHandler" autocomplete="off">
      <br>
      <button id="signInBtn" @click="signIn">Sign in</button>
      <br>
      <button @click="signInAsStore = !signInAsStore" class="change-signIn-format">Sign in as a store</button>
    </form>
    <RegistrationForm></RegistrationForm>
  </div>
  <div v-else-if="isSignedIn===false && signInAsStore">
    <form @submit.prevent class="loginForm">
      Sign in to get access to your store
      <br>
      <input type="text" class="loginField" placeholder="Address" v-model="address" @input="addressChangeHandler">
      <br>
      <input type="password" class="loginField" placeholder="Password" v-model="password" @input="passwordChangeHandler" autocomplete="off">
      <br>
      <button id="signInBtn" @click="signInAsStore">Sign in</button>
      <br>
      <button @click="signInAsStore = !signInAsStore" class="change-signIn-format">Sign in as a person</button>
    </form>
  </div>
  <div v-else>
    <button @click="signOut" id="signOutBtn">Sign out</button>
    <ProfileView></ProfileView>
  </div>
</template>
<script>
import ProfileView from '@/views/ProfileView.vue'
import RegistrationForm from '@/views/RegistrationForm.vue'
export default {
  name: 'HomePage',
  mounted() {
    this.isSignedIn = JSON.parse(localStorage.getItem("signedIn"))
  },
  data () {
    return {
      login: null,
      address: null,
      password: null,
      status: null,
      isSignedIn: false,
      signInAsStore: false
    }
  },
  methods: {
    loginChangeHandler (event) {
      this.address = event.target.value
    },
    passwordChangeHandler (event) {
      this.password = event.target.value
    },
   addressChangeHandler (event) {
      this.address = event.target.value
    },
    parseUserData (_name,_status) {
      this.name = _name
      this.status = _status
    },
    signIn() {
      this.isSignedIn = true
      localStorage.setItem("signedIn",this.isSignedIn)
    },
    signOut() {
      this.isSignedIn = false
      localStorage.setItem("signedIn",this.isSignedIn)
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
