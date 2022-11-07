<template>
    <div>Your balance: {{balance}} ether</div>
    <div class="content">
      <button @click="displayManager('seller')">{{changeRole?"Close":"Become seller"}}</button>
      <button @click="displayManager('comment')">{{comment?"Close":"See comments"}}</button>
      <button @click="displayManager('buy')" class="change-view">{{buy?'Close':'Buy products'}}</button>
      <SendRequest v-if="changeRole" :adr="account.adr"></SendRequest>
      <CommentsView v-if="comment" :adr="account.adr"></CommentsView>
      <ProductsView v-if="buy" :adr="account.adr"></ProductsView>
    </div>
    
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import SendRequest from './SendRequest.vue'
import CommentsView from './CommentsView.vue'
import ProductsView from './ProductsView.vue'
export default {
  data() {
    return {
      contract: null,
      web3: null,
      balance: null,
      buy: false,
      comment: false,
      changeRole: false
    };
  },
  async mounted() {
    this.contract = await ContractPromise;
    this.web3 = w3();
    await this.web3.eth
    .getBalance(this.account.adr)
    .then(value => this.balance = this.web3.utils.fromWei(value));
  },
  methods: {
    displayManager(toShow){
      if(toShow === "buy") 
      {
      this.buy = !this.buy
      this.comment = this.changeRole = false
      }
      if(toShow === "comment") 
      {
      this.comment = !this.comment
      this.buy = this.changeRole = false
      } 
      if(toShow === "seller") 
      {
      this.changeRole = !this.changeRole
      this.comment = this.buy = false
      } 
      this.web3.eth
      .getBalance(this.account.adr)
      .then(value => this.balance = this.web3.utils.fromWei(value));  
    }  
  },
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  components: { SendRequest, CommentsView, ProductsView }
}
</script>

<style scoped>
button{
  width: 160px;
  height: 75px;
  margin: 10px;
  background-color: #CCCCFF;
  font-size: 1.5rem;
}
button:hover{
  cursor: pointer;
  background-color: #9999FF;
}
.content{
  display: block; 
  justify-content: center; 
  align-items: center;
}
</style>