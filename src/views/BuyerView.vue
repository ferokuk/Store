<template>
    <div>
        
    </div>
</template>

<script>
import w3 from '@/web3Connect'
import ContractPromise from '@/web3Contract' 
export default { 
  data () {
    return {
      contract: null,
      web3: null
    }
  },
  async mounted () {
    this.contract = await ContractPromise
    this.web3 = w3()
  },
  props:{
    account: {
        type: Object,
        required: true
    }
  }
}
</script>

<style scoped>

</style>