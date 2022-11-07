<template>
    <div class="profile-content">
        <div > 
          Hello, <span v-if="account.role === '1' || account.role === '2'" style="font-weight: bold;">{{account.FIO}}</span> 
          <span v-else style="font-weight: bold;"> {{account.login?account.login:account.name}}</span>
        </div>
        Your role is: 
        <div style="font-weight:bold; display:inline" :style="{color:account.role === '0'?'darkred':account.role ==='1'?'darkgreen':account.role === '2'?'blue':account.role === '3'?'brown':'gray'}">{{this.roles.get(account.role)}}</div>
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
import AdminView from './AdminView.vue';
import BuyerView from './BuyerView.vue';
import SellerView from './SellerView.vue';
import ProviderView from './ProviderView.vue';
import StoreView from './StoreView.vue';
import BankView from './BankView.vue';
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
    this.contract = await ContractPromise
    this.web3 = w3()
    this.roles.set('0','Admin')
    this.roles.set('1','Buyer')
    this.roles.set('2','Seller')
    this.roles.set('3','Provider')
    this.roles.set('4','Store')
    this.roles.set('5','Bank')
  },
  data () {
    return {
      contract: null,
      web3: null,
      roles: new Map()
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