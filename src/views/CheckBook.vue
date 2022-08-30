<template>
  <div class="check-comments">
    <select v-model="address" @change="showReviews" class="stores">
      <option v-for="store in allStores" :key="store">{{store}}</option>
    </select>
  </div>
  <div class="store-content">
    <div v-if="address === null">
      Choose an address to check store's comments!
    </div>
    <div v-else-if="comments.length === 0">
      No comments at the moment!
    </div>
    <div v-else>
      <transition-group name="comments">
        <div v-for="(comment,index) in comments" :key="comment">
          <div class="comment-container">
              {{index + 1}}.
              <strong>{{comment.login}}</strong>: <br>
              {{comment.content.length > 50? comment.content.slice(0,50)+"...":comment.content}} <br>
              {{comment.rating}}<span style="color:goldenrod;background-color:#CCCCFF">&#9733;</span>
              {{comment.likes}}<i class="fa fa-thumbs-o-up" style="color:green;background-color:#CCCCFF"></i>   {{comment.dislikes}}<i class="fa fa-thumbs-o-down" style="color:red;background-color:#CCCCFF"></i>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import ContractPromise from '@/web3Contract' 
import w3 from '@/web3Connect'
export default{
  name: "CheckBook",
  async mounted () {
    this.contract = await ContractPromise
    this.web3 = w3()
    this.contract.methods
    .getAllStores()
    .call()
    .then(value => this.allStores = value)
    this.address = localStorage.getItem('storeAdr')?localStorage.getItem('storeAdr'):null
    if(this.address !== null){
      await this.contract.methods
      .checkStoreComments(this.address)
      .call()
      .then(value => this.comments = value)
    }
  },
  data () {
    return {
      contract: null,
      address: null,
      web3: null,
      comments: [],
      allStores: null
    }
  },
  methods:{
    async showReviews(event){
      this.address = event.target.value
      await this.contract.methods.checkStoreComments(this.address)
      .call()
      .then(value => this.comments = value)
      localStorage.setItem('storeAdr',this.address)
    }
  }
}
</script>
<style scoped>
.stores{
  background-color: #CCCCFF;
  font-size:2rem;
}
.store-content{
  margin:30px;
  font-size:2rem;
}
.comment-container{
  border: 2px solid;
  margin: 20px;
  background-color: #cfcfff;
  width:1000px;
  max-width: 1000px;
  display:inline-block;
  vertical-align: top;
}
.comments-enter-active,
.comments-leave-active {
  transition: all 0.3s;
}
.comments-enter-from,
.comments-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
