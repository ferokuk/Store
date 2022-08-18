<template>
    <div class="profile-content">
        <div> Hello, <strong>{{account.login}}</strong></div>
        Your role is: 
        <div style="font-weight:bold; display:inline" :style="{color:role === '0'?'darkred':role ==='1'?'darkgreen':role === '2'?'blue':role === '3'?'brown':'gray'}">{{roles.get(role)}}</div>
        <div style="margin:30px; ">You can:</div>
        <AdminView v-if="role === '0'" :account="account"></AdminView>
        <BuyerView v-if="role === '1'" :account="account"></BuyerView>
        <SellerView v-if="role === '2'" :account="account"></SellerView>
        <ProviderView v-if="role === '3'" :account="account"></ProviderView>
        <StoreView v-if="role === '4'" :account="account"></StoreView>
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
export default {
  props: {
    address: {
      type: String,
    },
    role: {
      type: String
    },
    account:{
      type: Object,
      required: true
    },
    role:{
      type: String,
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
  },
  data () {
    return {
      contract: null,
      web3: null,
      roles: new Map()
    }
  },
  components: { AdminView, BuyerView, SellerView, ProviderView, StoreView }
}
</script>

<style scoped>
.profile-content{
  font-size: 2rem;
}
</style>