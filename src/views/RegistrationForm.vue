<template>
  <button id="signUpBtn" @click="this.openForm = !this.openForm">Sign up</button>
  <transition name="modal">
    <div v-if="openForm" class="form">
      <div class="form-content">
        <button id="generateNewAddressBtn" @click="generateNewAddress">Generate new address</button>
          <button id="closeFormBtn" @click="this.openForm = !this.openForm">Close</button>
          <form @submit.prevent>
            <br>
            <input type="text" placeholder="Your name" required v-model="name" @change="nameChangeHandler">
            <br>
            <input type="text" placeholder="Your address" required v-model="address" @change="addressChangeHandler">
            <br>
            <input type="password" placeholder="Your password" required v-model="password" autocomplete="off" @change="passwordChangeHandler">
            <br>
            <input type="text" placeholder="Your FIO" required v-model="FIO" @change="FIOChangeHandler">
            <br>
            <input type="text" placeholder="Your city" required v-model="city" @change="cityChangeHandler">
            <br>
            <button id="createUserBtn" @click="signUp">Sign Up</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "RegistrationForm",
  data() {
    return {
      address: null,
      password: null,
      name: null,
      FIO: null,
      city: null,
      openForm: false,
      web3: null,
      contract: null
    }
  },
  methods: {
    addressChangeHandler(event) {
      this.address = event.target.value;
    },
    passwordChangeHandler(event) {
      this.password = event.target.value;
    },
    nameChangeHandler(event) {
      this.name = event.target.value;
    },
    FIOChangeHandler(event) {
      this.FIO = event.target.value;
    },
    cityChangeHandler(event) {
      this.city = event.target.value;
    },
    async signUp() {
      if (this.name === null || this.address === null || this.password === null || this.FIO === null || this.city === null) {
          return;
      }
      this.address = this.password = this.name = this.FIO = this.city = null;
      this.openForm = !this.openForm;
    },
    async generateNewAddress() {
    }
  },
  components: {  }
}
</script>

<style scoped>
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
  width:120px;
  height:60px;
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
  font-size:1.3rem;
  width:130px;
  height:65px;
  background-color: #CCCCFF;
  display:flex;
  padding:4px;
  position:fixed;
  margin-left:454px;
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
  background-color: #CCCCFF;
  width: 600px;
  height: 50px;
  margin: auto;
  display: block;
  font-style: Montserrat;
}
input::placeholder{
  color: gray;
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
