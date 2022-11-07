<template>
  <div class="profile-content">
    <div> 
      Hello, <span style="font-weight: bold;">{{greetingMessage}}</span> 
    </div>
    Your role is: 
    <div style="font-weight:bold; display:inline" :style="{color:account.role === '0'?'darkred':account.role ==='1'?'darkgreen':account.role === '2'?'blue':account.role === '3'?'brown':'gray'}">{{roles.get(account.role)}}</div>
    <br>
    <AdminView v-if="account.role === '0'" :account="account"></AdminView>
    <BuyerView v-if="account.role === '1'" :account="account"></BuyerView>
    <SellerView v-if="account.role === '2'" :account="account"></SellerView>
    <ProviderView v-if="account.role === '3'" :account="account"></ProviderView>
    <StoreView v-if="account.role === '4'" :account="account"></StoreView>
    <BankView v-if="account.role === '5'" :account="account"></BankView>
  </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import AdminView from './AdminView/AdminView.vue';
import BuyerView from './BuyerView/BuyerView.vue';
import SellerView from './SellerView/SellerView.vue';
import ProviderView from './ProviderView/ProviderView.vue';
import StoreView from './StoreView/StoreView.vue';
import BankView from './BankView/BankView.vue';
export default {
  props: {
    address: {
      type: String,
    },
    account:{
      type: Object,
      required: true
    }
  },
  async mounted () {
    this.roles.set('0','Admin')
    this.roles.set('1','Buyer')
    this.roles.set('2','Seller')
    this.roles.set('3','Provider')
    this.roles.set('4','Store')
    this.roles.set('5','Bank')
    this.contract = await ContractPromise
    this.web3 = w3()
  },
  data () {
    return {
      contract: null,
      web3: null,
      roles: new Map()
    }
  },
  computed:{
    greetingMessage(){
      if (this.account.login) return this.account.login
      else if(this.account.name) return this.account.name
      else return this.account[3]
    }
  },
  components: { AdminView, BuyerView, SellerView, ProviderView, StoreView, BankView }
}
</script>

<style scoped>
.profile-content{
  font-size: 2rem;
}
</style>