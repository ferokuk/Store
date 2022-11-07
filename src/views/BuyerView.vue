<template>
    <div>Your balance: {{balance}} ether</div>
    <button @click="changeView" class="change-view">{{isBuying?'Buy products':'See store comments'}}</button> <br>
    <div>
      <select v-model="address" @change="addressChangeHandler" class="stores">
        <option v-for="store in allStores" :key="store">{{store}}</option>
      </select>
      <div v-if="!isBuying">
      <div v-if="address !== null">
        <button class="change-view" @click="isCommenting = !isCommenting">Comment</button>
        <div v-if="isCommenting">
          <div>
            <textarea type="text" placeholder="Write your comment here" maxlength="50" v-model="commentContent" @change="contentChangeHandler"></textarea>
          </div>
          <div style="font-size: 1rem">
            note: 50 characters max
          </div>
          <div>
            <div>
              Choose a rating: 
            </div>
            <div v-for="rateValue in 10" :key="rateValue" style="display:inline-block;">
              <input type="radio" :value="rateValue" name="rating" @change="ratingChangeHandler" v-model.number="commentRating" style="width:1rem; height: 1rem;">{{rateValue}}<span style="color:goldenrod">&#9733;</span>
            </div>
          </div>
          <div>
            <button @click="newComment" :disabled="commentRating === null || isProcessing" class="change-view" style="width: 120px; height: 60px">Send</button>
          </div>
        </div>
      </div>
      <div v-if="address === null">Choose a store</div>
      <div v-else-if="comments.length === 0">
        <div>No comments at the moment</div>
      </div>
      <div v-else v-for="(comment,index) in comments" :key="comment" class="comment-container">
          <div>
          <div>{{index + 1}}.</div>
          <div style="font-weight: bold">{{comment.login}}: </div>
          <div>{{comment.content}}</div>
          {{comment.rating}}<span style="color:goldenrod;background-color:#CCCCFF">&#9733;</span>
          {{comment.likes}}<button  class="rate" @click="like(index,false)"><i class="fa fa-thumbs-o-up" style="color:green"></i></button>
          {{comment.dislikes}}<button class="rate" @click="dislike(index,false)"><i class="fa fa-thumbs-o-down" style="color:red"></i></button>
          <div v-for="(answer,answIndex) in answers" :key="answer">
            <div v-if="answer.to === comment.from" style="border: 1px solid;margin:20px;">
            <div>Answers:</div>
            {{answIndex+1}}.
            <div style="font-weight: bold">{{answer.login}}:</div>
            <div>{{answer.content}}</div>
            {{answer.likes}}<button class="rate" @click="like(answIndex,true)"><i class="fa fa-thumbs-o-up" style="color:green"></i></button>
            {{answer.dislikes}}<button class="rate" @click="dislike(answIndex,true)"><i class="fa fa-thumbs-o-down" style="color:red"></i></button>
            </div>
          </div>
      </div>
      </div>
      </div>
      <div v-else>
        <div v-if="address === null">Choose a store</div>
        <div v-else-if="products.length === 0">
          <div>No products at the moment</div>
        </div>
        <div v-else v-for="(product,index) in products" :key="product" class="comment-container" style="width: 500px">
          <div>
          <div>{{index + 1}}. </div>
          <div >Name: <span style="font-weight: bold">{{product.name}} </span></div>
          <div>Amount: {{product.amount}} </div>
          <div>Exp. date: {{product.expirationDate}} </div>
          <div>Price for one {{product.kg?"kg":"piece"}}: {{web3.utils.fromWei(product.basePrice)}} ether</div>
          <input type="text" placeholder="Amount" v-model="amount" @change="amountChangeHandler" style="font-size: 1.4rem; width: 100px;">
          <div v-if="amount <= Number(product.amount)" style="font-size: 1.2rem;">This will be: {{web3.utils.fromWei(product.basePrice) * amount}} ether</div>
          <div v-if="amount * web3.utils.fromWei(product.basePrice) > balance" style="font-size: 1.2rem; color: red">Seems like you don't have enough money<br>(You have {{balance}}, need {{ web3.utils.fromWei(product.basePrice)* amount}})</div>
          <div v-if="amount > Number(product.amount)" style="font-size: 1.2rem; color: red">Sorry, we don't have that much {{product.name}}</div>
          <button :disabled="amount > Number(product.amount) || amount * web3.utils.fromWei(product.basePrice) > balance || isProcessing" @click="buyProduct(index,amount,product.basePrice)" class="change-view" style="width: 120px; height: 60px; font-size: 1.5rem">Buy</button>
      </div>
      </div>
      </div>
    </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
import swal from 'sweetalert'
export default {
  data() {
    return {
      contract: null,
      web3: null,
      allStores: [],
      products: [],
      comments: [],
      answers: [],
      address: null,
      amount: null,
      balance: null,
      isBuying: false,
      commentRating: null,
      commentContent: '',
      isProcessing: false,
      isCommenting: false
    }
  },
  async mounted() {
    this.contract = await ContractPromise
    this.web3 = w3()
    await this.contract.methods
    .getAllStores()
    .call()
    .then(value => this.allStores = value)
    await this.web3.eth
    .getBalance(this.account.adr)
    .then(value => this.balance = this.web3.utils.fromWei(value))
  },
  methods:{
  async addressChangeHandler(event){

    this.address = event.target.value

    if(this.isBuying){
      this.contract.methods
      .showProducts(this.address)
      .call()
      .then(value => this.products = value)
    }

    this.getComments()
  },
  amountChangeHandler(event){
    this.amount = event.target.value
  },
  ratingChangeHandler(event){
    this.commentRating = event.target.value
  },
  contentChangeHandler(event){
    this.commentContent = event.target.value
  },
  getComments(){
    this.contract.methods
    .checkStoreComments(this.address)
    .call()
    .then(value => this.comments = value)

    this.contract.methods
    .checkStoreAnswers(this.address)
    .call()
    .then(value => this.answers = value)
  },
  async changeView() {
    this.isBuying = !this.isBuying
    if(this.isBuying &&  this.address !== null){
      await this.contract.methods
      .showProducts(this.address)
      .call()
      .then(value => this.products = value)
    }
  },
  async buyProduct(index, amount, price){
    await this.web3.eth.personal.unlockAccount(this.account.adr,"")
    this.isProcessing = true
    if(price * amount > this.web3.eth.getBalance(this.account.adr))
    {
      swal("","Not enough money","warning",{buttons:false,timer:1000})
      this.isProcessing = false
      return
    }
    try
    {
      await this.contract.methods
      .buyProduct(this.address, index, amount)
      .send({from:this.account.adr,value:amount*price})
      .then(value => value.events.ProductBought.returnValues.bought?swal("","Product bought successfully!","success",{buttons:false,timer:1000}):swal("","Something went wrong","error",{buttons:false,timer:1000}))
    }
    catch(error)
    {
      console.log(error)
      this.isProcessing = false
      return
    }
    this.contract.methods
    .showProducts(this.address)
    .call()
    .then(value => this.products = value)
    await this.web3.eth
    .getBalance(this.account.adr)
    .then(value => this.balance = this.web3.utils.fromWei(value))
    this.isProcessing = false
  },
  async like(index,isAnswer){
    try
    {
    await this.contract.methods
    .buyerLikeComment(index,this.address,isAnswer)
    .send({from: this.account.adr})
    .then()
    }
    catch(error)
    {
      swal("","You already liked this comment","warning",{buttons:false,timer:800})
      return
    }
    this.getComments()
  },
  async dislike(index,isAnswer){
    try
    {
    await this.contract.methods
    .buyerDislikeComment(index,this.address,isAnswer)
    .send({from: this.account.adr})
    .then()
    }
    catch(error)
    {
      swal("","You already disliked this comment","warning",{buttons:false,timer:800})
      return
    }
    this.getComments()
  },
  async newComment(){
    this.isProcessing = true
    try
    {
    await this.contract.methods
    .buyerComment(this.commentContent,this.address,this.commentRating)
    .send({from: this.account.adr})
    .then()
    }
    catch(error)
    {
      swal("","Something went wrong","error",{buttons: false, timer:800})
      this.isProcessing = false
      return
    }
    this.getComments()
    swal("","Comment sent!","success",{buttons: false, timer:800})
    this.isProcessing = false
    this.isCommenting = false
    this.commentContent = ""
    this.commentRating = null
  }
  },
  props: {
    account: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.stores{
  background-color: #CCCCFF;
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
.rate{
  font-size:2rem;
  background-color: inherit;
  border: 0;
}
.rate:hover{
  cursor:pointer;
}
.change-view{
  width: 150px;
  height: 75px;
  font-size: 1.5rem;
  margin: 20px;
  background-color: #CCCCFF;
}
.change-view:hover{
  background-color: #9999FF;
  cursor: pointer;
}
textarea{
  font-size: 1.5rem;
  width: 500px;
  resize: none;
  background: #CCCCFF;
  
}
</style>