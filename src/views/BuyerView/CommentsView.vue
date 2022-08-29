<template>
  <br>
  <select v-model="address" @change="addressChangeHandler" class="stores">
    <option v-for="store in allStores" :key="store">{{store}}</option>
  </select>
  <div v-if="address !== null">
    <textarea type="text" placeholder="Write your comment here (50 characters max)" maxlength="50" v-model="commentContent" @change="contentChangeHandler"></textarea>
    <div>
      Choose a rating: 
    </div>
    <div v-for="rateValue in 10" :key="rateValue" style="display:inline-block;">
      <input type="radio" :value="rateValue" name="rating" @change="ratingChangeHandler" v-model.number="commentRating" style="width:1rem; height: 1rem;">{{rateValue}}<span style="color:goldenrod">&#9733;</span>
    </div>
    <div>
      <button @click="newComment" :disabled="commentRating === null || isProcessing" class="change-view" style="width: 120px; height: 60px">Send</button>
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
        comments: [],
        answers: [],
        store: null,
        address: null,
        commentContent: "",
        commentRating: null,
        isProcessing: false
      }
    },
    async mounted() {
      this.contract = await ContractPromise;
      this.web3 = w3();
      this.getAllStores();
      this.address = localStorage.getItem("storeAdr")?localStorage.getItem("storeAdr"):null
      if(this.address) this.getComments()
    },
    methods: {
      addressChangeHandler(event){
        this.address = event.target.value
        this.getComments(this.address)
        localStorage.setItem("storeAdr",this.address)
      },
      ratingChangeHandler(event) {
        this.commentRating = event.target.value;
      },
      contentChangeHandler(event) {
        this.commentContent = event.target.value;
      },
      getAllStores() {
        this.contract.methods
        .getAllStores()
        .call()
        .then(value => this.allStores = value);
      },
      getComments() {
        this.contract.methods
        .checkStoreComments(this.address)
        .call()
        .then(value => this.comments = value);
        this.contract.methods
        .checkStoreAnswers(this.address)
        .call()
        .then(value => this.answers = value);
      },
      async like(index, isAnswer) {
        try {
          await this.contract.methods
          .buyerLikeComment(index, this.address, isAnswer)
          .send({ from: this.adr })
          .then();
        }
        catch (error) {
          swal("", "You already liked this comment", "warning", { buttons: false, timer: 800 });
          return;
        }
        this.getComments();
      },
      async dislike(index, isAnswer) {
        try {
          await this.contract.methods
          .buyerDislikeComment(index, this.address, isAnswer)
          .send({ from: this.adr })
          .then();
        }
        catch (error) {
          swal("", "You already disliked this comment", "warning", { buttons: false, timer: 800 });
          return;
        }
        this.getComments();
      },
      async newComment() {
        this.isProcessing = true;
        try {
          await this.contract.methods
          .buyerComment(this.commentContent, this.address, this.commentRating)
          .send({ from: this.adr })
          .then();
        }
        catch (error) {
          swal("", "Something went wrong", "error", { buttons: false, timer: 800 });
          this.isProcessing = false;
          return;
        }
        this.getComments();
        swal("", "Comment sent!", "success", { buttons: false, timer: 800 });
        this.isProcessing = false;
        this.isCommenting = false;
        this.commentContent = "";
        this.commentRating = null;
      },
    },
    props:{
      adr:{
        type: String,
        required: true
      }
    }
}
</script>

<style scoped>
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
textarea{
  font-size: 1.5rem;
  width: 500px;
  resize: none;
  margin: 10px;
  background: #CCCCFF;
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
.stores{
  background-color: #CCCCFF;
  font-size:2rem;
}
</style>