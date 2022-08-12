<template>
  <div id="login" v-if="isSignedIn===false">
    <form @submit.prevent id="loginForm">
      Sign in to get acces to your account
      <br>
      <input type="text" class="loginField" placeholder="Address" v-model="address" @input="addressChangeHandler">
      <br>
      <input type="password" class="loginField" placeholder="Password" v-model="password" @input="passwordChangeHandler" autocomplete="off">
      <br>
      <button id="signInBtn" @click="signIn">Sign in</button>
    </form>
  </div>
  <div v-else>
    <button @click="signOut" id="signOutBtn">Sign out</button>
    <ProfileView></ProfileView>
  </div>
</template>
<script>
import ProfileView from '@/views/ProfileView.vue'
export default {
  name: 'HomePage',
  mounted() {
     this.isSignedIn = JSON.parse(localStorage.getItem("signedIn"))
  },
  data () {
    return {
      address: null,
      password: null,
      name: null,
      status: null,
      isSignedIn: false
    }
  },
  methods: {
    addressChangeHandler (event) {
      this.address = event.target.value
    },
    passwordChangeHandler (event) {
      this.password = event.target.value
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
  components: {ProfileView}
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
#loginForm{
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
  background-color: beige;
}
#signOutBtn:hover{
   background-color:blanchedalmond;
   cursor: pointer;
}
</style>
