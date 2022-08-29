<template>
  <div>
    <button class="buyer-request-btn" @click="becomeBuyer">Send request to become buyer</button>
  </div>
  <div v-for="(comment,index) in comments" :key="comment" class="comment-container">
    <div>
      <div>{{index + 1}}.</div>
      <div class="bold">{{comment.login}}: </div>
      <div>{{comment.content}}</div>
      {{comment.rating}}<span class="rating">&#9733;</span>
      {{comment.likes}}<i class="fa fa-thumbs-o-up" style="color:green"></i>
      {{comment.dislikes}}<i class="fa fa-thumbs-o-down" style="color:red"></i>
      <div><button @click="getData(comment.from,comment.login)" class="modal-btn">Answer</button></div>
      <div v-for="(answer,answIndex) in answers" :key="answer">
        <div v-if="answer.to === comment.from" class="answers">
        <div>Answers:</div>
        {{answIndex+1}}.
        <div class="bold">{{answer.login}}:</div>
        <div>{{answer.content}}</div>
        {{answer.likes}}<i class="fa fa-thumbs-o-up" style="color:green"></i>
        {{answer.dislikes}}<i class="fa fa-thumbs-o-down" style="color:red"></i>
        </div>
      </div>
      <div v-if="modalAnswer" class="modal">
        <div class="modal-content">
          <div><button @click="modalAnswer = false" class="modal-btn">close</button></div>
          <br>
          <div>To: <span class="bold">{{answerToLogin}}</span></div> 
          <br>
          <div><textarea v-model="content" @change="contentChangeHandler" placeholder="50 characters max" maxlength="50"></textarea></div>
          <br>
          <div class="center"><button @click="sendAnswer" :disabled="!content || isProcessing" class="send-btn">Send</button></div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
export default { 
  data () {
    return {
      contract: null,
      web3: null,
      comments: [],
      answers: [],
      modalAnswer: false,
      content: "",
      answerToAdr: null,
      answerToLogin: null,
      isProcessing: false
    }
  },
  async mounted () {
    this.contract = await ContractPromise
    this.web3 = w3()
    this.getComments()
  },
  props:{
    account: {
      type: Object,
      required: true
    }
  },
  methods:{
    contentChangeHandler(event){
      this.content = event.target.value
    },
    getComments(){
    this.contract.methods
    .checkStoreComments(this.account.store)
    .call()
    .then(value => this.comments = value)

    this.contract.methods
    .checkStoreAnswers(this.account.store)
    .call()
    .then(value => this.answers = value)
    },
    getData(from,login){
      this.modalAnswer = true
      this.answerToAdr = from
      this.answerToLogin = login
    },
    async sendAnswer(){
      this.isProcessing = true
      await this.web3.eth.personal.unlockAccount(this.account.adr,"")
      await this.contract.methods
      .answerOnComment(this.content,this.answerToAdr)
      .send({from: this.account.adr})
      .then()
      swal("","Answer sent!","success",{buttons: false, timer:800})
      this.getComments()
      this.answerToAdr = this.answerToLogin = this.content = null
      this.modalAnswer = false
      this.isProcessing = false
    },
    async becomeBuyer(){
      let answ
      await swal("","Are you sure?","warning",{buttons:[true,"Yes"]}).then(value => answ = value)
      if(answ !== true) return
      try
      {
      await this.web3.eth.personal.unlockAccount(this.account.adr,"")
      await this.contract.methods
      .sellerToBuyer()
      .send({from: this.account.adr})
      .then()
      swal("","Request sent!\nIt may take some time to be accepted.","success",{buttons:false,timer:2000})
      }
      catch(error)
      {
        swal("","You already requested!","warning",{buttons:false,timer:1200})
        return
      }
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
  font-size: 1.8rem;
  width: 600px;
  resize: none;
  background: #CCCCFF;
}
.modal{
  top:0;
  bottom:0;
  right:0;
  left:0;
  display:flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.3);
  position: fixed;
  margin: auto;
  
}
.modal-content{
  margin: auto;
  background: honeydew;
  border-radius: 10px;
  min-height: 310px;
  min-width: 600px;
  padding: 25px;
}
.modal-btn{
  width:100px;
  height: 50px;
  justify-content: center;
  align-items: center;
  display:inline; 
  margin-bottom: 10px
}
.buyer-request-btn{
  font-size: 1.6rem; 
  width:200px; 
  height:100px; 
  font-weight: bold; 
  margin-left: 17px; 
  margin-bottom: 10px;
}
button{
  background-color: #CCCCFF;
}
button:hover{
  cursor: pointer;
  background-color: #9999FF;
}
input{
  background-color: #CCCCFF;
  font-size: 1.5rem;
  width:400px;
}
.rating{
  color:goldenrod;
  background-color:#CCCCFF;
}
.answers{
  border: 1px solid;
  margin:20px;
}
.bold{
  font-weight: bold;
}
.send-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 70px;
  font-size: 2rem;
}
.center{
  display: flex; 
  justify-content:center;
  align-items:center
}
</style>